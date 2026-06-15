import type { GroupBuy } from '@/mocks/types'

interface GroupBuyCardProps {
  groupBuy: GroupBuy
}

export function GroupBuyCard({ groupBuy }: GroupBuyCardProps) {
  const progress = (groupBuy.currentMembers / groupBuy.minMembers) * 100
  const savedAmount = groupBuy.originalPrice - groupBuy.groupPrice
  const isCompleted = groupBuy.status === 'completed'

  const statusConfig = {
    ongoing: { label: '进行中', color: 'bg-primary-500', textColor: 'text-primary-500', bgColor: 'bg-primary-50' },
    completed: { label: '已成团', color: 'bg-accent-500', textColor: 'text-accent-500', bgColor: 'bg-accent-50' },
    ended: { label: '已结束', color: 'bg-foreground-400', textColor: 'text-foreground-400', bgColor: 'bg-background-200' },
  }

  const currentStatus = statusConfig[groupBuy.status]

  return (
    <Link
      to={`/groupbuy/${groupBuy.id}`}
      data-product-shop
      className="group flex gap-4 p-4 bg-background-50 rounded-xl transition-all duration-200 hover:bg-primary-50/50 hover:-translate-y-0.5"
    >
      {/* 图片 — 左侧 sm:w-48 */}
      <div className="w-full sm:w-48 shrink-0">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg">
          <img
            src={groupBuy.image}
            alt={groupBuy.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* 状态标签 */}
          <span className={`absolute top-2 left-2 px-2.5 py-1 text-xs text-white rounded-lg font-medium ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex flex-col">
        {/* 标题 */}
        <h3 className="text-sm font-medium text-foreground-800 line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors">
          {groupBuy.title}
        </h3>

        {/* 价格 + 省¥xx标签 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-semibold text-accent-600">¥{groupBuy.groupPrice}</span>
          <span className="text-xs text-foreground-400 line-through">¥{groupBuy.originalPrice}</span>
          {savedAmount > 0 && (
            <span className="text-xs px-1.5 py-0.5 bg-accent-100 text-accent-600 rounded font-medium">
              省¥{savedAmount}
            </span>
          )}
        </div>

        {/* 进度条 — 进行中=primary色，已成团=accent色 */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-medium ${currentStatus.textColor}`}>
              {groupBuy.currentMembers}/{groupBuy.minMembers}人
            </span>
            <span className="text-foreground-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-accent-500' : 'bg-primary-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* 底部：团长头像+名称、取货地点、截止时间 */}
        <div className="mt-auto flex items-center justify-between text-xs text-foreground-400">
          <div className="flex items-center gap-2">
            <img
              src={groupBuy.initiator.avatar}
              alt={groupBuy.initiator.name}
              loading="lazy"
              className="w-5 h-5 rounded-full"
            />
            <span>{groupBuy.initiator.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <i className="ri-map-pin-line"></i>
              {groupBuy.pickupLocation.slice(0, 6)}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line"></i>
              {groupBuy.deadline}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}