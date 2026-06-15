import { userProfile, myProducts, myFavorites, tradeRecords, myGroupBuys, reviews } from '@/mocks/profile'
import type { Product } from '@/mocks/types'

export function Profile() {
  const [activeTab, setActiveTab] = useState('published')
  const [favorites, setFavorites] = useState(myFavorites)

  const tabs = [
    { key: 'published', label: '我的发布', icon: 'ri-file-list-3-line' },
    { key: 'favorites', label: '我的收藏', icon: 'ri-heart-line' },
    { key: 'trades', label: '交易记录', icon: 'ri-exchange-line' },
    { key: 'groupbuys', label: '我的拼团', icon: 'ri-group-line' },
    { key: 'reviews', label: '评价', icon: 'ri-star-line' },
  ]

  const handleRemoveFavorite = (id: string) => {
    setFavorites(favorites.filter(f => f.id !== id))
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* 用户信息栏 */}
        <div className="bg-background-100 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={userProfile.avatar} alt={userProfile.name} loading="lazy"
              className="w-24 h-24 rounded-2xl" />
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-xl font-semibold text-foreground-800">{userProfile.name}</h1>
                <span className="text-xs px-2.5 py-1 bg-primary-100 text-primary-600 rounded-lg font-medium">{userProfile.campus}</span>
              </div>
              <p className="text-sm text-foreground-500 mb-3">{userProfile.department} · {userProfile.grade}</p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{userProfile.tradeCount}</span><span className="text-foreground-400">完成交易</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{userProfile.publishCount}</span><span className="text-foreground-400">发布商品</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-foreground-800">{userProfile.groupBuyCount}</span><span className="text-foreground-400">参与拼团</span></span>
                <span className="text-center"><span className="block text-lg font-semibold text-accent-500">{userProfile.rating}</span><span className="text-foreground-400">评分</span></span>
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
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 whitespace-nowrap font-medium ${
                  activeTab === tab.key ? 'bg-primary-500 text-white' : 'text-foreground-500 hover:bg-background-200 hover:text-foreground-700'
                }`}>
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 内容 */}
        {activeTab === 'published' && (
          <div className="flex flex-col gap-3">
            {myProducts.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-background-100 rounded-xl hover:bg-background-200 transition-colors">
                <img src={item.image} alt={item.title} loading="lazy" className="w-20 h-20 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground-800 truncate">{item.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-foreground-400">
                    <span className={`px-2 py-0.5 rounded-lg font-medium ${item.status === 'available' ? 'bg-primary-100 text-primary-600' : 'bg-secondary-200 text-foreground-400'}`}>
                      {item.status === 'available' ? '在售' : '已售'}
                    </span>
                    <span className="text-accent-600 font-semibold">¥{item.price}</span>
                    <span>{item.views} 浏览</span>
                    <span>{item.postedAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer">
                    <i className="ri-edit-line"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-accent-50 hover:text-accent-500 transition-all duration-200 cursor-pointer">
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((item) => (
              <div key={item.id} className="bg-background-100 rounded-xl overflow-hidden group hover:bg-background-200 transition-colors">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img src={item.image} alt={item.title} loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <button
                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-background-50/80 rounded-lg text-accent-500 hover:bg-accent-50 transition-all duration-200 cursor-pointer"
                    onClick={() => handleRemoveFavorite(item.id)}>
                    <i className="ri-heart-fill"></i>
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-foreground-800 truncate">{item.title}</h3>
                  <p className="text-sm text-accent-600 font-semibold mt-1">¥{item.price}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-foreground-400">
                    <img src={item.seller.avatar} alt={item.seller.name} loading="lazy" className="w-4 h-4 rounded-full" />
                    <span>{item.seller.name}</span>
                    <span>{item.postedAt}</span>
                  </div>
                </div>
              </div>
            ))}
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

        {activeTab === 'trades' && (
          <div className="flex flex-col gap-3">
            {tradeRecords.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-background-100 rounded-xl hover:bg-background-200 transition-colors">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                  item.type === 'sell' ? 'bg-primary-100' : 'bg-accent-100'
                }`}>
                  <i className={`${item.type === 'sell' ? 'ri-arrow-up-line text-primary-500' : 'ri-arrow-down-line text-accent-500'} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground-800 truncate">{item.productName}</h3>
                  <p className="text-xs text-foreground-400 mt-0.5">{item.date} · {item.counterparty.name}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-semibold ${item.type === 'sell' ? 'text-primary-600' : 'text-accent-600'}`}>
                    {item.type === 'sell' ? '+' : '-'}¥{item.price}
                  </span>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <i key={i} className={`ri-star-${i < item.rating ? 'fill' : 'line'} text-xs ${i < item.rating ? 'text-warning' : 'text-foreground-300'}`}></i>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groupbuys' && (
          <div className="flex flex-col gap-3">
            {myGroupBuys.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-background-100 rounded-xl hover:bg-background-200 transition-colors">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${
                  item.role === 'leader' ? 'bg-primary-100' : 'bg-secondary-100'
                }`}>
                  <i className={`${item.role === 'leader' ? 'ri-vip-crown-line text-primary-500' : 'ri-user-line text-secondary-500'} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground-800 truncate">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-foreground-400">
                    <span className={`px-2 py-0.5 rounded-lg font-medium ${
                      item.status === 'ongoing' ? 'bg-primary-100 text-primary-600' : item.status === 'completed' ? 'bg-accent-100 text-accent-600' : 'bg-secondary-200 text-foreground-400'
                    }`}>
                      {item.role === 'leader' ? '团长' : '团员'}
                    </span>
                    <span>{item.status === 'ongoing' ? '进行中' : item.status === 'completed' ? '已成团' : '已结束'}</span>
                    <span>¥{item.price}</span>
                    <span>{item.joinedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-4">
            {reviews.map((item) => (
              <div key={item.id} className="p-4 bg-background-100 rounded-xl hover:bg-background-200 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <img src={item.reviewer.avatar} alt={item.reviewer.name} loading="lazy" className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground-800">{item.reviewer.name}</span>
                    <span className="text-xs text-foreground-400 ml-2">{item.date}</span>
                  </div>
                  <span className="text-xs text-foreground-400">{item.productName}</span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={`ri-star-${i < item.rating ? 'fill' : 'line'} text-sm ${i < item.rating ? 'text-warning' : 'text-foreground-300'}`}></i>
                  ))}
                </div>
                <p className="text-sm text-foreground-600">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}