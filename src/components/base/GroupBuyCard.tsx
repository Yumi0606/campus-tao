import type { GroupBuyInfo } from '@/api/types'

interface GroupBuyCardProps {
  groupBuy: GroupBuyInfo
}

export function GroupBuyCard({ groupBuy }: GroupBuyCardProps) {
  const progress = (groupBuy.currentPeople / groupBuy.minPeople) * 100
  const savedAmount = groupBuy.originalPrice - groupBuy.discountPrice

  const statusConfig: Record<number, { label: string; color: string; textColor: string; bgColor: string }> = {
    0: { label: '进行中', color: 'bg-primary-500', textColor: 'text-primary-500', bgColor: 'bg-primary-50' },
    1: { label: '已成团', color: 'bg-accent-500', textColor: 'text-accent-500', bgColor: 'bg-accent-50' },
    2: { label: '已结束', color: 'bg-foreground-400', textColor: 'text-foreground-400', bgColor: 'bg-background-200' },
    3: { label: '已取消', color: 'bg-foreground-400', textColor: 'text-foreground-400', bgColor: 'bg-background-200' },
  }

  const currentStatus = statusConfig[groupBuy.status] || statusConfig[2]

  return (
    <Link
      to={`/groupbuy/${groupBuy.id}`}
      className="group flex gap-4 p-4 bg-background-50 rounded-xl transition-all duration-200 hover:bg-primary-50/50 hover:-translate-y-0.5"
    >
      {/* 图片 */}
      <div className="w-full sm:w-48 shrink-0">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg">
          <img
            src={groupBuy.images?.[0] || ''}
            alt={groupBuy.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`absolute top-2 left-2 px-2.5 py-1 text-xs text-white rounded-lg font-medium ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm font-medium text-foreground-800 line-clamp-2 mb-2 group-hover:text-primary-700 transition-colors">
          {groupBuy.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-semibold text-accent-600">¥{groupBuy.discountPrice}</span>
          <span className="text-xs text-foreground-400 line-through">¥{groupBuy.originalPrice}</span>
          {savedAmount > 0 && (
            <span className="text-xs px-1.5 py-0.5 bg-accent-100 text-accent-600 rounded font-medium">
              省¥{savedAmount}
            </span>
          )}
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-medium ${currentStatus.textColor}`}>
              {groupBuy.currentPeople}/{groupBuy.minPeople}人
            </span>
            <span className="text-foreground-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2.5 bg-background-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                groupBuy.status === 1 ? 'bg-accent-500' : 'bg-primary-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between text-xs text-foreground-400">
          <div className="flex items-center gap-2">
            <img
              src={groupBuy.initiator?.avatarUrl || ''}
              alt={groupBuy.initiator?.nickname || ''}
              loading="lazy"
              className="w-5 h-5 rounded-full"
            />
            <span>{groupBuy.initiator?.nickname || groupBuy.initiator?.username}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <i className="ri-time-line"></i>
              {groupBuy.endTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
