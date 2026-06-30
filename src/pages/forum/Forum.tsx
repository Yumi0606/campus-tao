import { postApi } from '@/api'
import type { PostInfo } from '@/api/types'
import { PostCard } from '@/components/base/PostCard'
import { PublishPostModal } from './components/PublishPostModal'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'
import { FORUM_BOARDS } from '@/constants'

export function Forum() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBoard, setSelectedBoard] = useState('')
  const [sortMode, setSortMode] = useState<'hot' | 'latest'>('hot')
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showMyOnly, setShowMyOnly] = useState(false)

  const [posts, setPosts] = useState<PostInfo[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const pageSize = 10

  const fetchPosts = async (p: number = page) => {
    setLoading(true)
    try {
      const keywords = searchQuery.trim() ? [searchQuery.trim()] : undefined
      const result = await postApi.page(p, pageSize, {
        board: selectedBoard || undefined,
        keywords,
        sortMode,
      })
      setPosts(result?.list ?? [])
      setTotal(result?.total ?? 0)
      setPage(p)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts(1) }, [selectedBoard, sortMode])
  useEffect(() => {
    const timer = setTimeout(() => fetchPosts(1), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const totalPages = Math.ceil(total / pageSize)
  const displayPosts = showMyOnly
    ? posts.filter((p) => p.authorId === user?.userId)
    : posts

  const boards = ['全部', ...FORUM_BOARDS]

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground-800">校园论坛</h1>
            <p className="text-sm text-foreground-500 mt-1">选课攻略、活动通知、学习交流</p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium cursor-pointer"
            onClick={() => setShowPublishModal(true)}
          >
            <i className="ri-edit-line"></i>
            发帖
          </button>
        </div>

        {/* 搜索栏 */}
        <div className="mb-6">
          <div className="relative">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400"></i>
            <input type="text" placeholder="搜索帖子..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200" />
          </div>
        </div>

        {/* 分类标签栏 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {boards.map((board) => (
            <button key={board} onClick={() => setSelectedBoard(board === '全部' ? '' : board)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                (board === '全部' ? !selectedBoard : selectedBoard === board)
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-100 text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
              }`}>
              {board}
            </button>
          ))}
          <button onClick={() => setShowMyOnly(!showMyOnly)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
              showMyOnly ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-500 hover:bg-accent-50 hover:text-accent-500'
            }`}>
            我的
          </button>
        </div>

        {/* 热门/最新切换 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-background-100 rounded-full p-1">
            <button onClick={() => setSortMode('hot')}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                sortMode === 'hot' ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:text-foreground-700'
              }`}>
              热门
            </button>
            <button onClick={() => setSortMode('latest')}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                sortMode === 'latest' ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:text-foreground-700'
              }`}>
              最新
            </button>
          </div>
        </div>

        {/* 帖子列表 */}
        {loading ? (
          <div className="flex justify-center py-20">
            <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
          </div>
        ) : displayPosts.length > 0 ? (
          <>
            <div className="flex flex-col gap-4">
              {displayPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => fetchPosts(page - 1)} disabled={page <= 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  上一页
                </button>
                <span className="text-sm text-foreground-500">{page} / {totalPages}</span>
                <button onClick={() => fetchPosts(page + 1)} disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  下一页
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
              <i className="ri-inbox-line text-3xl text-secondary-400"></i>
            </div>
            <p className="text-foreground-500 font-medium">没有找到相关帖子</p>
            <p className="text-sm text-foreground-400 mt-1">试试调整筛选条件</p>
          </div>
        )}
      </div>

      <PublishPostModal isOpen={showPublishModal} onClose={() => setShowPublishModal(false)} onSuccess={() => fetchPosts(1)} />
    </div>
  )
}
