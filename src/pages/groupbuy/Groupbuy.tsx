import { groupBuyApi } from '@/api'
import type { GroupBuyInfo } from '@/api/types'
import { GroupBuyCard } from '@/components/base/GroupBuyCard'
import { PublishGroupBuyModal } from './components/PublishGroupBuyModal'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'

export function Groupbuy() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [showMyOnly, setShowMyOnly] = useState(false)

  const [groupBuys, setGroupBuys] = useState<GroupBuyInfo[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const pageSize = 10

  const fetchGroupBuys = async (p: number = page) => {
    setLoading(true)
    try {
      const keywords = searchQuery.trim() ? [searchQuery.trim()] : undefined
      const result = await groupBuyApi.page(p, pageSize, {
        status: selectedStatus ?? undefined,
        keywords,
      })
      setGroupBuys(result.records)
      setTotal(result.total)
      setPage(p)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '加载失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchGroupBuys(1) }, [selectedStatus])
  useEffect(() => {
    const timer = setTimeout(() => fetchGroupBuys(1), 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const totalPages = Math.ceil(total / pageSize)
  const displayItems = showMyOnly
    ? groupBuys.filter((gb) => gb.userId === user?.id)
    : groupBuys

  const statusFilters = [
    { label: '全部', value: null },
    { label: '进行中', value: 0 },
    { label: '已成团', value: 1 },
    { label: '已结束', value: 2 },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 标题栏 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground-800">拼团团购</h1>
            <p className="text-sm text-foreground-500 mt-1">一起买更便宜，省钱购物新方式</p>
          </div>
          <button
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium cursor-pointer"
            onClick={() => setShowPublishModal(true)}
          >
            <i className="ri-add-line"></i>
            发起拼团
          </button>
        </div>

        {/* 搜索栏 */}
        <div className="mb-6">
          <div className="relative">
            <i className="ri-search-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400"></i>
            <input
              type="text" placeholder="搜索拼团..."
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"
            />
          </div>
        </div>

        {/* 状态筛选标签 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {statusFilters.map((s) => (
            <button key={s.label} onClick={() => setSelectedStatus(s.value)}
              className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                selectedStatus === s.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-background-100 text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
              }`}>
              {s.label}
            </button>
          ))}
          <button onClick={() => setShowMyOnly(!showMyOnly)}
            className={`px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
              showMyOnly ? 'bg-accent-500 text-white' : 'bg-background-100 text-foreground-500 hover:bg-accent-50 hover:text-accent-500'
            }`}>
            我的
          </button>
        </div>

        {/* 拼团列表 */}
        {loading ? (
          <div className="flex justify-center py-20">
            <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
          </div>
        ) : displayItems.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 mb-12">
              {displayItems.map((gb) => (
                <GroupBuyCard key={gb.id} groupBuy={gb} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-8">
                <button onClick={() => fetchGroupBuys(page - 1)} disabled={page <= 1}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  上一页
                </button>
                <span className="text-sm text-foreground-500">{page} / {totalPages}</span>
                <button onClick={() => fetchGroupBuys(page + 1)} disabled={page >= totalPages}
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-background-100 text-foreground-600 hover:bg-background-200 disabled:opacity-40 disabled:cursor-not-allowed">
                  下一页
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 mb-12">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
              <i className="ri-inbox-line text-3xl text-secondary-400"></i>
            </div>
            <p className="text-foreground-500 font-medium">没有找到相关拼团</p>
            <p className="text-sm text-foreground-400 mt-1">试试调整筛选条件</p>
          </div>
        )}

        {/* 拼团流程说明 */}
        <div className="bg-background-100 rounded-xl p-6">
          <h3 className="text-base font-semibold text-foreground-800 mb-6">拼团流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'ri-add-circle-line', title: '发起拼团', desc: '设置价格和人数' },
              { icon: 'ri-user-add-line', title: '等待成团', desc: '邀请好友加入' },
              { icon: 'ri-shopping-cart-line', title: '统一购买', desc: '团长负责采购' },
              { icon: 'ri-hand-heart-line', title: '线下取货', desc: '约定地点分发' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-100 rounded-xl mb-3">
                  <i className={`${step.icon} text-xl text-primary-500`}></i>
                </div>
                <span className="text-sm font-medium text-foreground-800">{step.title}</span>
                <span className="text-xs text-foreground-500 mt-1">{step.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PublishGroupBuyModal isOpen={showPublishModal} onClose={() => setShowPublishModal(false)} onSuccess={() => fetchGroupBuys(1)} />
    </div>
  )
}
