import { itemApi } from '@/api'
import type { ItemInfo } from '@/api/types'
import { ProductCard } from '@/components/base/ProductCard'
import { PublishProductModal } from './components/PublishProductModal'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'

export function Secondhand() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCampus, setSelectedCampus] = useState('')
  const [sortBy, setSortBy] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showMyOnly, setShowMyOnly] = useState(false)

  // 分页 + 数据
  const [items, setItems] = useState<ItemInfo[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const pageSize = 12

  // 收藏状态
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set())

  // 拉取数据
  const fetchItems = async (p: number = page) => {
    setLoading(true)
    try {
      const keywords = searchQuery.trim() ? [searchQuery.trim()] : undefined
      const result = await itemApi.page(p, pageSize, {
        category: selectedCategory || undefined,
        campus: selectedCampus || undefined,
        keywords,
        sortBy: sortBy || undefined,
        sortOrder: sortBy === 'price-asc' ? 0 : 1,
      })
      setItems(Array.isArray(result?.records) ? result.records.filter(Boolean) : [])
      setTotal(result?.total ?? 0)
      setPage(p)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '加载失败'
      showToast(msg, 'error')
      setItems([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems(1) }, [selectedCategory, selectedCampus, sortBy])

  // 搜索防抖
  useEffect(() => {
    const timer = setTimeout(() => fetchItems(1), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const totalPages = Math.ceil(total / pageSize)

  // 收藏切换
  const handleLikeToggle = (itemId: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) next.delete(itemId)
      else next.add(itemId)
      return next
    })
  }

  // "我的"筛选：前端过滤（后端无 userId 筛选参数）
  const displayItems = showMyOnly
    ? items.filter((item) => item.userId === user?.id)
    : items

  const categories = ['全部', '数码', '书籍', '服饰', '生活', '运动', '美妆', '其他']
  const campuses = ['全部校区', '主校区', '东校区', '西校区', '南校区', '北校区']

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground-800">二手交易</h1>
            <p className="text-sm text-foreground-500 mt-1">校园闲置物品流转，让闲置变现金</p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium cursor-pointer"
            onClick={() => setShowPublishModal(true)}
          >
            <i className="ri-add-line"></i>
            发布商品
          </button>
        </div>

        {/* 搜索栏 */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400"></i>
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"
            />
          </div>
          <button
            className={`inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 cursor-pointer ${
              showFilters
                ? 'bg-primary-500 text-white'
                : 'bg-background-100 text-foreground-500 border border-secondary-200 hover:bg-background-200 hover:text-primary-500'
            }`}
            onClick={() => setShowFilters(!showFilters)}
            title="筛选"
          >
            <i className="ri-filter-3-line"></i>
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 text-sm text-foreground-600 focus:outline-none focus:border-primary-500 transition-all duration-200 cursor-pointer"
          >
            <option value="">最新发布</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
            <option value="views">最多浏览</option>
          </select>
        </div>

        {/* 分类标签栏 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === '全部' ? '' : category)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                (category === '全部' ? !selectedCategory : selectedCategory === category)
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-100 text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
              }`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setShowMyOnly(!showMyOnly)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
              showMyOnly
                ? 'bg-accent-500 text-white'
                : 'bg-background-100 text-foreground-500 hover:bg-accent-50 hover:text-accent-500'
            }`}
          >
            我的
          </button>
        </div>

        {/* 校区筛选 */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-background-100 rounded-xl">
            <span className="text-sm text-foreground-500 font-medium mr-1">校区：</span>
            {campuses.map((campus) => (
              <button
                key={campus}
                onClick={() => setSelectedCampus(campus === '全部校区' ? '' : campus)}
                className={`px-3.5 py-1.5 rounded-lg text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  (campus === '全部校区' ? !selectedCampus : selectedCampus === campus)
                    ? 'bg-primary-500 text-white'
                    : 'bg-background-50 text-foreground-500 hover:bg-background-200 hover:text-foreground-700 border border-secondary-200'
                }`}
              >
                {campus}
              </button>
            ))}
          </div>
        )}

        {/* 商品网格 */}
        {loading ? (
          <div className="flex justify-center py-20">
            <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
          </div>
        ) : displayItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayItems.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  liked={likedIds.has(item.id)}
                  onLikeToggle={handleLikeToggle}
                />
              ))}
            </div>
            {/* 分页 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => fetchItems(page - 1)}
                  disabled={page <= 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                <span className="text-sm text-foreground-500">{page} / {totalPages}</span>
                <button
                  onClick={() => fetchItems(page + 1)}
                  disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
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
            <p className="text-foreground-500 font-medium">没有找到相关商品</p>
            <p className="text-sm text-foreground-400 mt-1">试试调整筛选条件</p>
          </div>
        )}
      </div>

      {/* 发布弹窗 */}
      <PublishProductModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onSuccess={() => fetchItems(1)}
      />
    </div>
  )
}
