import { postApi, commentApi, likeApi } from '@/api'
import type { PostInfo, CommentInfo } from '@/api/types'
import { Breadcrumb } from '@/components/base/Breadcrumb'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'
import { PublishPostModal } from '../components/PublishPostModal'

export function ForumDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { showToast } = useToast()

  const [post, setPost] = useState<PostInfo | null>(null)
  const [comments, setComments] = useState<CommentInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentText, setCommentText] = useState('')
  const [commentLikes, setCommentLikes] = useState<Set<number>>(new Set())
  const [replyTo, setReplyTo] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    const postId = Number(id)
    ;(async () => {
      try {
        const [postData, commentData] = await Promise.all([
          postApi.detail(postId),
          commentApi.listByPost(postId, 1, 50),
        ])
        if (cancelled) return
        setPost(postData)
        setLikeCount(postData.likes)
        setComments(commentData?.records ?? [])
        setLoading(false)
      } catch (e: unknown) {
        if (cancelled) return
        setPost(null)
        showToast(e instanceof Error ? e.message : '加载失败', 'error')
        setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [id, showToast])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
            <i className="ri-emotion-sad-line text-3xl text-secondary-400"></i>
          </div>
          <p className="text-foreground-500 font-medium">帖子不存在或已被删除</p>
          <Link to="/forum" className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 mt-3 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <i className="ri-arrow-left-s-line"></i>返回列表
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === post.userId

  const handleLike = async () => {
    try {
      if (isLiked) {
        await likeApi.unlike('post', post.id)
        setLikeCount(likeCount - 1)
        showToast('已取消点赞', 'info')
      } else {
        await likeApi.like('post', post.id)
        setLikeCount(likeCount + 1)
        showToast('已点赞', 'success')
      }
      setIsLiked(!isLiked)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '操作失败', 'error')
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/forum/${post.id}`)
      showToast('链接已复制到剪贴板', 'success')
    } catch {
      showToast('复制失败', 'error')
    }
  }

  const handleCommentLike = async (commentId: number) => {
    try {
      if (commentLikes.has(commentId)) {
        await likeApi.unlike('comment', commentId)
      } else {
        await likeApi.like('comment', commentId)
      }
      setCommentLikes((prev) => {
        const next = new Set(prev)
        if (next.has(commentId)) next.delete(commentId)
        else next.add(commentId)
        return next
      })
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '操作失败', 'error')
    }
  }

  const handleComment = async () => {
    if (!commentText.trim()) return
    try {
      const newComment = await commentApi.publish({
        postId: post.id,
        content: replyTo ? `@${replyTo} ${commentText}` : commentText,
      })
      setComments([...comments, newComment])
      setCommentText('')
      setReplyTo(null)
      showToast('评论已发布', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '发布失败', 'error')
    }
  }

  const handleDeletePost = async () => {
    try {
      await postApi.remove(post.id)
      showToast('帖子已删除', 'success')
      window.REACT_APP_NAVIGATE('/forum')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '删除失败', 'error')
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await commentApi.remove(commentId)
      setComments(comments.filter((c) => c.id !== commentId))
      showToast('评论已删除', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '删除失败', 'error')
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Breadcrumb items={[
          { label: '校园论坛', to: '/forum' },
          { label: post.title },
        ]} />

        {/* 标签行 */}
        <div className="flex items-center gap-2 mb-4">
          {post.isPinned && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 bg-accent-100 text-accent-600 rounded-lg font-medium">
              <i className="ri-pushpin-line"></i>置顶
            </span>
          )}
          {post.board && (
            <span className="text-xs px-2.5 py-1.5 bg-secondary-100 text-secondary-600 rounded-lg font-medium">{post.board}</span>
          )}
        </div>

        {/* 标题 */}
        <h1 className="text-xl font-semibold text-foreground-800 mb-4">{post.title}</h1>

        {/* 作者信息行 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={post.author?.avatarUrl || ''} alt={post.author?.nickname || ''} loading="lazy" className="w-10 h-10 rounded-full" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground-800">{post.author?.nickname || post.author?.username}</span>
                {post.author?.studentVerified && <i className="ri-verified-badge-fill text-primary-500 text-sm"></i>}
              </div>
              <span className="text-xs text-foreground-400">{post.createdAt}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-foreground-400 px-2.5 py-1.5 bg-background-100 rounded-lg">
              <i className="ri-eye-line"></i>{post.views}
            </span>
            <button
              className={`inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-all duration-200 font-medium cursor-pointer ${
                isLiked ? 'text-accent-500 bg-accent-50' : 'text-foreground-400 bg-background-100 hover:bg-accent-50 hover:text-accent-500'
              }`}
              onClick={handleLike}>
              <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>{likeCount}
            </button>
            <button
              className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-background-100 text-foreground-400 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 font-medium cursor-pointer"
              onClick={handleShare}>
              <i className="ri-share-line"></i>分享
            </button>
            {isOwner && (
              <>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-background-100 text-foreground-400 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 font-medium cursor-pointer">
                  <i className="ri-edit-line"></i>编辑
                </button>
                <button
                  onClick={handleDeletePost}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-background-100 text-foreground-400 hover:bg-error/10 hover:text-error transition-all duration-200 font-medium cursor-pointer">
                  <i className="ri-delete-bin-line"></i>删除
                </button>
              </>
            )}
          </div>
        </div>

        {/* 正文 */}
        <div className="text-sm text-foreground-700 leading-relaxed whitespace-pre-line mb-6 p-5 bg-background-100 rounded-xl">
          {post.content}
        </div>

        {/* 评论区 */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-foreground-800 mb-4">评论 ({comments.length})</h3>

          <div className="flex flex-col gap-3 mb-6">
            {comments.map((comment) => {
              const isCommentOwner = user?.id === comment.userId
              return (
                <div key={comment.id} className="flex gap-3 p-3 bg-background-50 rounded-xl hover:bg-background-100 transition-colors">
                  <img src={comment.author?.avatarUrl || ''} alt={comment.author?.nickname || ''} loading="lazy" className="w-8 h-8 rounded-full shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground-800">{comment.author?.nickname || comment.author?.username}</span>
                      <span className="text-xs text-foreground-400">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-foreground-600">{comment.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-foreground-400">
                      <button
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${
                          commentLikes.has(comment.id) ? 'text-accent-500 bg-accent-50' : 'hover:bg-accent-50 hover:text-accent-500'
                        }`}
                        onClick={() => handleCommentLike(comment.id)}>
                        <i className={`${commentLikes.has(comment.id) ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
                        {comment.likes + (commentLikes.has(comment.id) ? 1 : 0)}
                      </button>
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer"
                        onClick={() => setReplyTo(comment.author?.nickname || '')}>
                        <i className="ri-reply-line"></i>回复
                      </button>
                      {isCommentOwner && (
                        <button
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-error/10 hover:text-error transition-all duration-200 cursor-pointer"
                          onClick={() => handleDeleteComment(comment.id)}>
                          <i className="ri-delete-bin-line"></i>删除
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 评论输入区 */}
          <div className="flex gap-3">
            <img src={user?.avatarUrl || ''} alt="我的头像" loading="lazy" className="w-8 h-8 rounded-full shrink-0" />
            <div className="flex-1">
              {replyTo && (
                <div className="inline-flex items-center gap-1 text-xs text-primary-500 bg-primary-50 px-2 py-1 rounded-lg mb-2 font-medium">
                  回复 @{replyTo}
                  <button className="hover:text-accent-500 transition-colors cursor-pointer" onClick={() => setReplyTo(null)}>
                    <i className="ri-close-line"></i>
                  </button>
                </div>
              )}
              <textarea maxLength={500} value={commentText} onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm resize-none transition-all duration-200"
                placeholder={replyTo ? `回复 @${replyTo}...` : "写下你的评论..."} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-foreground-400">{commentText.length}/500</span>
                <button
                  disabled={!commentText.trim()}
                  className={`px-4 py-2 rounded-xl text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                    commentText.trim()
                      ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                      : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
                  }`}
                  onClick={handleComment}>
                  发布评论
                </button>
              </div>
            </div>
          </div>
        </div>

        <PublishPostModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          editPost={post}
          onSuccess={async () => {
            try {
              const postData = await postApi.detail(post.id)
              setPost(postData)
            } catch (e: unknown) {
              showToast(e instanceof Error ? e.message : '刷新失败', 'error')
            }
            setShowEditModal(false)
          }}
        />
      </div>
    </div>
  )
}
