import { groupBuyApi } from '@/api'
import type { GroupBuyInfo } from '@/api/types'
import { PaymentModal } from '@/components/base/PaymentModal'
import { Breadcrumb } from '@/components/base/Breadcrumb'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'
import { SafeImage, SafeAvatar } from '@/components/base/FallbackImage'
import { PublishGroupBuyModal } from '../components/PublishGroupBuyModal'

export function GroupbuyDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const { showToast } = useToast()
  const [groupBuy, setGroupBuy] = useState<GroupBuyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [isJoined, setIsJoined] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    groupBuyApi.detail(Number(id))
      .then((data) => setGroupBuy(data))
      .catch((e: unknown) => {
        setGroupBuy(null)
        showToast(e instanceof Error ? e.message : '加载失败', 'error')
      })
      .finally(() => setLoading(false))
  }, [id, showToast])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
      </div>
    )
  }

  if (!groupBuy) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
            <i className="ri-emotion-sad-line text-3xl text-secondary-400"></i>
          </div>
          <p className="text-foreground-500 font-medium">拼团不存在或已被删除</p>
          <Link to="/groupbuy" className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 mt-3 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <i className="ri-arrow-left-s-line"></i>返回列表
          </Link>
        </div>
      </div>
    )
  }

  const isCompleted = groupBuy.status === 1
  const isEnded = groupBuy.status === 2 || groupBuy.status === 3
  const isOngoing = groupBuy.status === 0
  const isOwner = user?.userId === groupBuy.initiatorId
  const progress = (groupBuy.currentPeople / groupBuy.minPeople) * 100
  const savedAmount = groupBuy.originalPrice - groupBuy.discountPrice

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/groupbuy/${groupBuy.id}`)
      showToast('链接已复制到剪贴板', 'success')
    } catch {
      showToast('复制失败', 'error')
    }
  }

  const handleJoin = async () => {
    try {
      if (isJoined) {
        await groupBuyApi.cancelJoin(groupBuy.id)
        showToast('已取消参团', 'info')
      } else {
        await groupBuyApi.join(groupBuy.id)
        showToast('已报名参团', 'success')
      }
      // 重新拉取详情
      const data = await groupBuyApi.detail(groupBuy.id)
      setGroupBuy(data)
      setIsJoined(!isJoined)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '操作失败', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await groupBuyApi.remove(groupBuy.id)
      showToast('已删除拼团', 'success')
      window.REACT_APP_NAVIGATE('/groupbuy')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '删除失败', 'error')
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: '拼团团购', to: '/groupbuy' },
          { label: groupBuy.name },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧图片 */}
          <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-background-100">
            <SafeImage src={groupBuy.images?.[0]} alt={groupBuy.name} className="w-full h-full object-cover" />
          </div>

          {/* 右侧信息区 */}
          <div>
            {/* 标题 + 状态 */}
            <div className="flex items-start gap-3 mb-4">
              <h1 className="text-xl font-semibold text-foreground-800 flex-1">{groupBuy.name}</h1>
              <span className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap ${
                isOngoing ? 'bg-primary-100 text-primary-700' : isCompleted ? 'bg-accent-100 text-accent-600' : 'bg-secondary-100 text-foreground-400'
              }`}>
                {isOngoing ? '进行中' : isCompleted ? '已成团' : '已结束'}
              </span>
            </div>

            {/* 价格 */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-accent-600">¥{groupBuy.discountPrice}</span>
              <span className="text-lg text-foreground-400 line-through">¥{groupBuy.originalPrice}</span>
              {savedAmount > 0 && (
                <span className="text-sm px-2 py-1 bg-accent-100 text-accent-600 rounded-lg font-medium">省¥{savedAmount}</span>
              )}
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-primary-600 font-medium">已参团 {groupBuy.currentPeople} 人</span>
                <span className="text-foreground-400">成团需 {groupBuy.minPeople} 人，{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-background-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-accent-500' : 'bg-primary-500'}`}
                  style={{ width: `${Math.min(progress, 100)}%` }} />
              </div>
              {isOngoing && groupBuy.currentPeople < groupBuy.minPeople && (
                <p className="text-xs text-foreground-400 mt-1.5">还差 {groupBuy.minPeople - groupBuy.currentPeople} 人成团</p>
              )}
            </div>

            {/* 团长信息 */}
            <div className="flex items-center gap-4 p-4 bg-background-100 rounded-xl mb-4">
              <SafeAvatar src={''} alt="团长" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-foreground-800">团长 #{groupBuy.initiatorId}</span>
                  <span className="text-xs px-2 py-0.5 bg-primary-100 text-primary-600 rounded-lg font-medium">团长</span>
                </div>
              </div>
              <Link to={`/chat/${groupBuy.initiatorId}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium">
                <i className="ri-chat-3-line"></i>私聊团长
              </Link>
            </div>

            {/* 截止时间 */}
            <div className="flex gap-4 mb-4">
              <span className="inline-flex items-center gap-1.5 text-sm text-foreground-500 px-2.5 py-1 bg-background-100 rounded-lg">
                <i className="ri-time-line text-xs"></i>截止 {groupBuy.endTime}
              </span>
            </div>

            {/* 团购说明 */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground-700 mb-2">团购说明</h3>
              <p className="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">{groupBuy.description}</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-6">
              {isOwner ? (
                <>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 py-3 rounded-xl bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98] transition-all duration-200 whitespace-nowrap font-medium cursor-pointer"
                  >
                    编辑拼团
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 py-3 rounded-xl bg-secondary-200 text-foreground-600 hover:bg-error/10 hover:text-error transition-all duration-200 whitespace-nowrap font-medium cursor-pointer"
                  >
                    删除拼团
                  </button>
                </>
              ) : (
                <button
                  disabled={isCompleted || isEnded}
                  className={`flex-1 py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                    isCompleted || isEnded
                      ? 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
                      : 'bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98]'
                  }`}
                  onClick={() => setShowPaymentModal(true)}
                >
                  {isCompleted ? '已成团' : isEnded ? '已结束' : '立即支付'}
                </button>
              )}
              {!isOwner && (
                <button
                  onClick={handleJoin}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                    isJoined ? 'bg-primary-50 text-primary-500 ring-2 ring-primary-200' : 'bg-background-100 text-foreground-500 hover:bg-primary-50 hover:text-primary-500'
                  }`}
                >
                  <i className={`${isJoined ? 'ri-user-follow-fill' : 'ri-user-add-line'} text-xl`}></i>
                </button>
              )}
              <button
                onClick={handleShare}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-background-100 text-foreground-500 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer"
              >
                <i className="ri-share-line text-xl"></i>
              </button>
            </div>

            {/* 安全提示 */}
            <div className="bg-warning/10 rounded-xl p-4">
              <p className="text-sm text-foreground-600 flex items-center gap-2">
                <i className="ri-shield-check-line text-warning"></i>
                平台仅提供信息展示，付款请确认团长身份，注意交易安全
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal isOpen={showPaymentModal} onClose={() => setShowPaymentModal(false)}
        amount={groupBuy.discountPrice} title={groupBuy.name} recipient={`团长 #${groupBuy.initiatorId}`} />

      <PublishGroupBuyModal isOpen={showEditModal} onClose={() => setShowEditModal(false)}
        editGroupBuy={groupBuy}
        onSuccess={async () => {
          try {
            const data = await groupBuyApi.detail(groupBuy.id)
            setGroupBuy(data)
            setShowEditModal(false)
          } catch (e: unknown) {
            showToast(e instanceof Error ? e.message : '刷新失败', 'error')
          }
        }} />
    </div>
  )
}
