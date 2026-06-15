import { PostCard } from '@/components/base/PostCard'
import { PublishPostModal } from './components/PublishPostModal'
import { forumPosts, forumCategories } from '@/mocks/forum'

export function Forum() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [activeTab, setActiveTab] = useState<'hot' | 'latest'>('hot')
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showMyOnly, setShowMyOnly] = useState(false)

  const currentUserName = '课代表小明'

  let filteredPosts = forumPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === '全部' || post.category === selectedCategory
    const matchesMy = !showMyOnly || post.author.name === currentUserName
    return matchesSearch && matchesCategory && matchesMy
  })

  filteredPosts = [...filteredPosts].sort((a, b) => {
    if (activeTab === 'hot') return b.likes - a.likes
    return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  })

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
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
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
          {forumCategories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-100 text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
              }`}>
              {category}
            </button>
          ))}
          <button onClick={() => setShowMyOnly(!showMyOnly)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium ${
              showMyOnly ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-500 hover:bg-accent-50 hover:text-accent-500'
            }`}>
            我的
          </button>
        </div>

        {/* 热门/最新切换 — rounded-full pill 风格 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex bg-background-100 rounded-full p-1">
            <button onClick={() => setActiveTab('hot')}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                activeTab === 'hot' ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:text-foreground-700'
              }`}>
              热门
            </button>
            <button onClick={() => setActiveTab('latest')}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                activeTab === 'latest' ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:text-foreground-700'
              }`}>
              最新
            </button>
          </div>
        </div>

        {/* 帖子列表 */}
        {filteredPosts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
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

      <PublishPostModal isOpen={showPublishModal} onClose={() => setShowPublishModal(false)} />
    </div>
  )
}