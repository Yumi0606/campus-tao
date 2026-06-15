import { ProductCard } from '@/components/base/ProductCard'
import { GroupBuyCard } from '@/components/base/GroupBuyCard'
import { PostCard } from '@/components/base/PostCard'
import { secondhandProducts } from '@/mocks/secondhand'
import { getHotGroupBuys } from '@/mocks/groupbuy'
import { getHotPosts } from '@/mocks/forum'

export function Home() {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())

  const hotProducts = secondhandProducts.filter(p => p.status === 'available').slice(0, 4)
  const hotGroupBuys = getHotGroupBuys(3)
  const hotPosts = getHotPosts(3)

  const handleLikeToggle = (productId: string) => {
    setLikedProducts((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) next.delete(productId)
      else next.add(productId)
      return next
    })
  }

  return (
    <div className="min-h-screen">
      {/* ========== Hero ========== */}
      {/* 全宽背景图（校园航拍/黄昏氛围），上覆黑色半透明渐变 */}
      <section className="relative h-[420px] md:h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&h=600&fit=crop"
          alt="校园风景"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* 黑色半透明渐变，从上到下加深 */}
        <div className="absolute inset-0 bg-linear-to-b from-foreground-950/20 via-foreground-950/40 to-foreground-950/75"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            校园淘 · 让校园生活更便捷
          </h1>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl">
            校园专属信息撮合平台，二手交易、拼团团购、校园论坛，一站式解决你的校园生活需求
          </p>
          <div className="flex gap-4">
            <Link
              to="/secondhand"
              className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
            >
              逛二手
            </Link>
            <Link
              to="/groupbuy"
              className="px-8 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
            >
              看拼团
            </Link>
          </div>
        </div>
      </section>

      {/* ========== Feature Cards ========== */}
      {/* 三张导航卡片，z-10 上浮到 Hero 底部重叠区 */}
      <section className="relative z-10 -mt-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/secondhand"
              className="group bg-background-50 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-primary-50"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-primary-100 rounded-xl mb-4 group-hover:bg-primary-200 transition-colors">
                <i className="ri-swap-box-line text-2xl text-primary-500"></i>
              </div>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">二手交易</h3>
              <p className="text-sm text-foreground-500 mb-3">
                校园闲置物品流转，让闲置变现金，省钱又环保
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-primary-500 font-medium px-3 py-1.5 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                浏览商品
                <i className="ri-arrow-right-s-line transition-transform group-hover:translate-x-0.5"></i>
              </span>
            </Link>

            <Link
              to="/groupbuy"
              className="group bg-background-50 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-accent-50"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-accent-100 rounded-xl mb-4 group-hover:bg-accent-200 transition-colors">
                <i className="ri-group-line text-2xl text-accent-500"></i>
              </div>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">拼团团购</h3>
              <p className="text-sm text-foreground-500 mb-3">
                组织拼团更优惠，一起买更便宜，省钱购物新方式
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-accent-500 font-medium px-3 py-1.5 bg-accent-100 rounded-lg group-hover:bg-accent-200 transition-colors">
                查看拼团
                <i className="ri-arrow-right-s-line transition-transform group-hover:translate-x-0.5"></i>
              </span>
            </Link>

            <Link
              to="/forum"
              className="group bg-background-50 rounded-xl p-6 transition-all duration-200 hover:-translate-y-1 hover:bg-secondary-50"
            >
              <div className="w-14 h-14 flex items-center justify-center bg-secondary-100 rounded-xl mb-4 group-hover:bg-secondary-200 transition-colors">
                <i className="ri-chat-smile-2-line text-2xl text-secondary-500"></i>
              </div>
              <h3 className="text-base font-semibold text-foreground-800 mb-2">校园论坛</h3>
              <p className="text-sm text-foreground-500 mb-3">
                选课攻略、活动通知、学习交流，校园信息一站式
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-secondary-500 font-medium px-3 py-1.5 bg-secondary-100 rounded-lg group-hover:bg-secondary-200 transition-colors">
                进入论坛
                <i className="ri-arrow-right-s-line transition-transform group-hover:translate-x-0.5"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== 热门二手 ========== */}
      <section className="py-12 px-4 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-accent-100 rounded-lg">
                <i className="ri-fire-line text-lg text-accent-500"></i>
              </div>
              <h2 className="text-xl font-semibold text-foreground-800">热门二手</h2>
            </div>
            <Link
              to="/secondhand"
              className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap font-medium"
            >
              查看全部
              <i className="ri-arrow-right-s-line"></i>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                liked={likedProducts.has(product.id)}
                onLikeToggle={handleLikeToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 进行中的拼团 ========== */}
      <section className="py-12 px-4 bg-background-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-primary-100 rounded-lg">
                <i className="ri-group-line text-lg text-primary-500"></i>
              </div>
              <h2 className="text-xl font-semibold text-foreground-800">进行中的拼团</h2>
            </div>
            <Link
              to="/groupbuy"
              className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap font-medium"
            >
              查看全部
              <i className="ri-arrow-right-s-line"></i>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {hotGroupBuys.map((groupBuy) => (
              <GroupBuyCard key={groupBuy.id} groupBuy={groupBuy} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== 热门讨论 ========== */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-secondary-100 rounded-lg">
                <i className="ri-chat-smile-2-line text-lg text-secondary-500"></i>
              </div>
              <h2 className="text-xl font-semibold text-foreground-800">热门讨论</h2>
            </div>
            <Link
              to="/forum"
              className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200 whitespace-nowrap font-medium"
            >
              查看全部
              <i className="ri-arrow-right-s-line"></i>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {hotPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA 区 ========== */}
      {/* 号召发布闲置/发起拼团 */}
      <section className="py-16 px-4 bg-background-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-primary-100 rounded-2xl">
            <i className="ri-hand-heart-line text-3xl text-primary-500"></i>
          </div>
          <h2 className="text-xl font-semibold text-foreground-800 mb-3">
            让闲置流动起来
          </h2>
          <p className="text-sm text-foreground-500 mb-8 max-w-md mx-auto">
            发布你的闲置物品，或者发起一个拼团，和同学们一起让校园生活更便捷
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/secondhand"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
            >
              <i className="ri-add-line"></i>
              发布闲置
            </Link>
            <Link
              to="/groupbuy"
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-500 text-white rounded-xl hover:bg-accent-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
            >
              <i className="ri-group-line"></i>
              发起拼团
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}