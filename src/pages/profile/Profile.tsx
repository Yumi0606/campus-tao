import { itemApi, favoriteApi } from '@/api'
import type { ItemInfo, FavoriteInfo } from '@/api/types'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'
import { SafeImage, SafeAvatar } from '@/components/base/FallbackImage'

export function Profile() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [activeTab, setActiveTab] = useState('published')
  const [myItems, setMyItems] = useState<ItemInfo[]>([])
  const [favorites, setFavorites] = useState<FavoriteInfo[]>([])

  const tabs = [
    { key: 'published', label: '我的发布', icon: 'ri-file-list-3-line' },
    { key: 'favorites', label: '我的收藏', icon: 'ri-heart-line' },
  ]

  // 加载"我的发布"
  useEffect(() => {
    if (activeTab !== 'published' || !user) return
    itemApi.page(1, 50)
      .then((result) => {
        const records = result?.list ?? []
        setMyItems(records.filter((item) => item.sellerId === user.userId))
      })
      .catch((e: unknown) => showToast(e instanceof Error ? e.message : '加载失败', 'error'))
  }, [activeTab, user?.userId])

  // 加载"我的收藏"
  useEffect(() => {
    if (activeTab !== 'favorites') return
    favoriteApi.myFavorites(1, 50)
      .then((result) => setFavorites(result?.list ?? []))
      .catch((e: unknown) => showToast(e instanceof Error ? e.message : '加载失败', 'error'))
  }, [activeTab])

  const handleRemoveFavorite = async (targetId: number, targetType: string) => {
    try {
      await favoriteApi.cancel(targetType as 'ITEM' | 'GROUP_BUY' | 'POST', targetId)
      setFavorites(favorites.filter((f) => f.targetId !== targetId))
      showToast('已取消收藏', 'info')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '操作失败', 'error')
    }
  }

  const handleDeleteItem = async (itemId: number) => {
    try {
      await itemApi.remove(itemId)
      setMyItems(myItems.filter((item) => item.id !== itemId))
      showToast('已删除', 'success')
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '删除失败', 'error')
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 用户信息栏 */}
        <div className="bg-background-100 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <SafeAvatar src={user.avatarUrl || 'https://i.pravatar.cc/100?img=1'} alt={user.nickname}
              className="w-24 h-24 rounded-2xl" />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-xl font-semibold text-foreground-800">{user.nickname || user.username}</h1>
                {user.campus && (
                  <span className="text-xs px-2.5 py-1 bg-primary-100 text-primary-600 rounded-lg font-medium">{user.campus}</span>
                )}
                {user.isVerified === 1 && (
                  <i className="ri-verified-badge-fill text-primary-500"></i>
                )}
              </div>
              <p className="text-sm text-foreground-500 mb-3">{user.contactInfo || '暂无联系方式'}</p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{user.completedTransactions ?? 0}</span><span className="text-foreground-400">完成交易</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{user.publishedItems ?? 0}</span><span className="text-foreground-400">发布商品</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{user.joinedGroupBuys ?? 0}</span><span className="text-foreground-400">参与拼团</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-accent-500">-</span><span className="text-foreground-400">评分</span></span>
              </div>
            </div>
            <Link to="/profile/edit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium">
              <i className="ri-edit-line"></i>
              编辑资料
            </Link>
          </div>
        </div>

        {/* Tab 栏 sticky */}
        <div className="sticky top-16 z-30 bg-background-50/95 backdrop-blur-md -mx-4 px-4 mb-6">
          <div className="flex gap-1 p-1 bg-background-100 rounded-xl overflow-x-auto">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                  activeTab === tab.key ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
                }`}>
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 我的发布 */}
        {activeTab === 'published' && (
          <div className="flex flex-col gap-3">
            {myItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-background-100 rounded-xl hover:bg-background-200 transition-colors">
                <SafeImage src={item.images?.[0]} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground-800 truncate">{item.name}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-foreground-400">
                    <span className={`px-2 py-0.5 rounded-lg font-medium ${
                      item.status === 0 ? 'bg-primary-100 text-primary-600' :
                      item.status === 1 ? 'bg-secondary-200 text-foreground-400' :
                      'bg-accent-100 text-accent-600'
                    }`}>
                      {item.status === 0 ? '在售' : item.status === 1 ? '已下架' : '已售出'}
                    </span>
                    <span className="text-accent-600 font-semibold">¥{item.price}</span>
                    <span>{item.viewCount} 浏览</span>
                    <span>{item.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-accent-50 hover:text-accent-500 transition-all duration-200 cursor-pointer">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
            {myItems.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
                  <i className="ri-file-list-3-line text-3xl text-secondary-400"></i>
                </div>
                <p className="text-foreground-500 font-medium">暂无发布</p>
              </div>
            )}
          </div>
        )}

        {/* 我的收藏 */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => {
              const target = fav.target as unknown
              const t = target as Record<string, unknown>
              const img = (t.images as string[] | undefined)?.[0] || (t.image as string | undefined) || ''
              const name = (t.name as string | undefined) || (t.title as string | undefined) || ''
              const price = t.price as number | undefined
              const discountPrice = t.discountPrice as number | undefined
              return (
                <div key={fav.id} className="bg-background-100 rounded-xl overflow-hidden group hover:bg-background-200 transition-colors">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <img
                      src={img}
                      alt={name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-background-50/80 rounded-lg text-accent-500 hover:bg-accent-50 transition-all duration-200 cursor-pointer"
                      onClick={() => handleRemoveFavorite(fav.targetId, fav.targetType)}>
                      <i className="ri-heart-fill"></i>
                    </button>
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium text-foreground-800 truncate">{name}</h3>
                    {price != null && (
                      <p className="text-sm text-accent-600 font-semibold mt-1">¥{price}</p>
                    )}
                    {discountPrice != null && (
                      <p className="text-sm text-accent-600 font-semibold mt-1">¥{discountPrice}</p>
                    )}
                    <p className="text-xs text-foreground-400 mt-1">{fav.createdAt}</p>
                  </div>
                </div>
              )
            })}
            {favorites.length === 0 && (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
                  <i className="ri-heart-line text-3xl text-secondary-400"></i>
                </div>
                <p className="text-foreground-500 font-medium">暂无收藏</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
