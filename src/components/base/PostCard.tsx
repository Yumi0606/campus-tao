import type { Post } from '@/mocks/types'
import { useToast } from '@/components/base/Toast'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { showToast } = useToast()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const newLiked = !isLiked
    setIsLiked(newLiked)
    setLikeCount(newLiked ? likeCount + 1 : likeCount - 1)
    showToast(newLiked ? '已点赞' : '已取消点赞', newLiked ? 'success' : 'info')
  }

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/forum/${post.id}`)
      showToast('链接已复制到剪贴板', 'success')
    } catch {
      showToast('复制失败，请手动复制', 'error')
    }
  }

  return (
    <Link
      to={`/forum/${post.id}`}
      className="group block p-4 bg-background-50 rounded-xl transition-all duration-200 hover:bg-primary-50/50 hover:-translate-y-0.5"
    >
      {/* 作者头像 + 标题 */}
      <div className="flex items-start gap-3 mb-3">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          loading="lazy"
          className="w-10 h-10 rounded-full shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-foreground-800">{post.author.name}</span>
            {post.author.isVerified && (
              <i className="ri-verified-badge-fill text-primary-500 text-sm"></i>
            )}
          </div>
          <h3 className="text-base font-medium text-foreground-900 line-clamp-1 group-hover:text-primary-700 transition-colors">
            {post.title}
          </h3>
        </div>
      </div>

      {/* 正文 — 2行截断 */}
      <p className="text-sm text-foreground-600 line-clamp-2 mb-3">
        {post.content}
      </p>

      {/* 标签行 — 置顶(accent色) + 分类 + #tag */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {post.isPinned && (
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-accent-100 text-accent-600 rounded-full font-medium">
            <i className="ri-pushpin-line"></i>
            置顶
          </span>
        )}
        <span className="text-xs px-2 py-1 bg-secondary-100 text-secondary-600 rounded-full">
          {post.category}
        </span>
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs text-foreground-400 hover:text-primary-500 transition-colors">
            #{tag}
          </span>
        ))}
      </div>

      {/* 底部信息栏 — 点赞/评论/分享 图标按钮，带 hover 背景 */}
      <div className="flex items-center justify-between text-xs text-foreground-400">
        <div className="flex items-center gap-1">
          <button
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
              isLiked
                ? 'text-accent-500 bg-accent-50'
                : 'hover:bg-accent-50 hover:text-accent-500'
            }`}
            onClick={handleLike}
          >
            <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}`}></i>
            {likeCount}
          </button>
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-primary-50 hover:text-primary-500 transition-all duration-200">
            <i className="ri-chat-3-line"></i>
            {post.comments}
          </span>
          <button
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer"
            onClick={handleShare}
          >
            <i className="ri-share-line"></i>
            分享
          </button>
        </div>
        <span className="text-foreground-300">{post.postedAt}</span>
      </div>
    </Link>
  )
}