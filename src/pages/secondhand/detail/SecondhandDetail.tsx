import { getProductById } from '@/mocks/secondhand'
import { PaymentModal } from '@/components/base/PaymentModal'
import { useToast } from '@/components/base/Toast'
import { Breadcrumb } from '@/components/base/Breadcrumb'

export function SecondhandDetail() {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const { showToast } = useToast()

  const product = getProductById(id || '')

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-background-200 rounded-2xl">
            <i className="ri-emotion-sad-line text-3xl text-secondary-400"></i>
          </div>
          <p className="text-foreground-500 font-medium">商品不存在或已被删除</p>
          <Link to="/secondhand" className="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600 mt-3 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all duration-200">
            <i className="ri-arrow-left-s-line"></i>
            返回列表
          </Link>
        </div>
      </div>
    )
  }

  const isSold = product.status === 'sold'
  const savedAmount = product.originalPrice - product.price

  // 模拟多图（当前用同图）
  const images = [product.image, product.image, product.image, product.image]

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/secondhand/${product.id}`)
      showToast('链接已复制到剪贴板', 'success')
    } catch {
      showToast('复制失败', 'error')
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 面包屑 */}
        <Breadcrumb items={[
          { label: '二手交易', to: '/secondhand' },
          { label: product.title.slice(0, 20) + (product.title.length > 20 ? '...' : '') },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧图片区 */}
          <div>
            <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-background-100">
              <img
                src={images[activeImage]}
                alt={product.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* 左上角校区/分类标签 */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-2.5 py-1 text-xs bg-background-50/70 backdrop-blur-sm text-foreground-700 rounded-lg font-medium">
                  {product.campus}
                </span>
                <span className="px-2.5 py-1 text-xs bg-primary-500 text-white rounded-lg font-medium">
                  {product.category}
                </span>
              </div>
              {/* 已售遮罩 */}
              {isSold && (
                <div className="absolute inset-0 bg-foreground-950/50 flex items-center justify-center">
                  <span className="px-5 py-2.5 bg-foreground-800 text-foreground-100 rounded-xl font-medium">已售出</span>
                </div>
              )}
            </div>
            {/* 缩略图条 */}
            <div className="flex gap-2 mt-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                    activeImage === i
                      ? 'ring-2 ring-primary-500 ring-offset-2'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`缩略图${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* 右侧信息区 */}
          <div>
            <h1 className="text-xl font-semibold text-foreground-800 mb-4">{product.title}</h1>

            {/* 价格 */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-accent-600">¥{product.price}</span>
              <span className="text-lg text-foreground-400 line-through">¥{product.originalPrice}</span>
              {savedAmount > 0 && (
                <span className="text-sm px-2 py-1 bg-accent-100 text-accent-600 rounded-lg font-medium">省¥{savedAmount}</span>
              )}
            </div>

            {/* 卖家信息卡 */}
            <div className="flex items-center gap-4 p-4 bg-background-100 rounded-xl mb-4">
              <img src={product.seller.avatar} alt={product.seller.name} loading="lazy" className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-foreground-800">{product.seller.name}</span>
                  {product.seller.isVerified && <i className="ri-verified-badge-fill text-primary-500 text-sm"></i>}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground-500 mt-0.5">
                  <i className="ri-star-fill text-warning text-xs"></i>
                  <span>{product.seller.rating} 分</span>
                  <span>·</span>
                  <span>{product.seller.campus}</span>
                </div>
              </div>
              <Link
                to={`/chat/${product.seller.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
              >
                <i className="ri-chat-3-line"></i>
                私聊卖家
              </Link>
            </div>

            {/* 商品信息 */}
            <div className="flex items-center gap-4 text-sm text-foreground-500 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-background-100 rounded-lg">
                <i className="ri-eye-line text-xs"></i> {product.views} 浏览
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-background-100 rounded-lg">
                <i className="ri-calendar-line text-xs"></i> {product.postedAt}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-background-100 rounded-lg">
                <i className="ri-map-pin-line text-xs"></i> {product.campus}
              </span>
            </div>

            {/* 商品描述 */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-foreground-700 mb-2">商品描述</h3>
              <p className="text-sm text-foreground-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* 标签行 */}
            <div className="flex gap-2 mb-6">
              <span className="text-xs px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg font-medium">面交优先</span>
              <span className="text-xs px-3 py-1.5 bg-secondary-100 text-secondary-600 rounded-lg font-medium">支持验货</span>
              <span className="text-xs px-3 py-1.5 bg-secondary-100 text-secondary-600 rounded-lg font-medium">校内交易</span>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-6">
              <button
                disabled={isSold}
                className={`flex-1 py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                  isSold
                    ? 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
                    : 'bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98]'
                }`}
                onClick={() => setShowPaymentModal(true)}
              >
                立即支付
              </button>
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                  isLiked ? 'bg-accent-50 text-accent-500' : 'bg-background-100 text-foreground-500 hover:bg-accent-50 hover:text-accent-500'
                }`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <i className={`${isLiked ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-background-100 text-foreground-500 hover:bg-primary-50 hover:text-primary-500 transition-all duration-200 cursor-pointer"
                onClick={handleShare}
              >
                <i className="ri-share-line text-xl"></i>
              </button>
            </div>

            {/* 安全提示 */}
            <div className="bg-warning/10 rounded-xl p-4">
              <p className="text-sm text-foreground-600 flex items-center gap-2">
                <i className="ri-shield-check-line text-warning"></i>
                平台仅提供信息展示，建议面交验货后再付款，注意交易安全
              </p>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={product.price}
        title={product.title}
        recipient={product.seller.name}
      />
    </div>
  )
}