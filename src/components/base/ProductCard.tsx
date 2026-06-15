import type { Product } from '@/mocks/types'
import { useToast } from '@/components/base/Toast'

interface ProductCardProps {
  product: Product
  liked?: boolean
  onLikeToggle?: (productId: string) => void
}

export function ProductCard({ product, liked = false, onLikeToggle }: ProductCardProps) {
  const { showToast } = useToast()
  const isSold = product.status === 'sold'
  const savedAmount = product.originalPrice - product.price

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onLikeToggle?.(product.id)
    showToast(liked ? '已取消收藏' : '已收藏', liked ? 'info' : 'success')
  }

  return (
    <Link
      to={`/secondhand/${product.id}`}
      data-product-shop
      className="block bg-background-100 rounded-xl overflow-hidden transition-colors hover:bg-background-200"
    >
      {/* 图片区 - 4:3 比例，hover 放大效果 */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* 左上角校区标签 */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs bg-background-50/70 backdrop-blur-sm text-foreground-700 rounded-full font-medium">
          {product.campus}
        </span>

        {/* 右上角收藏心形按钮 */}
        <button
          className="absolute top-3 right-3 p-1.5 bg-background-50/80 rounded-full transition-all duration-200 hover:bg-background-100 hover:scale-110 cursor-pointer"
          onClick={handleLikeClick}
          aria-label={liked ? '取消收藏' : '收藏'}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <i className={`${liked ? 'ri-heart-fill text-accent-500' : 'ri-heart-line text-foreground-600'}`}></i>
          </div>
        </button>

        {/* 已售商品半透明遮罩 + "已售出"标签 */}
        {isSold && (
          <div className="absolute inset-0 bg-foreground-950/50 flex items-center justify-center">
            <span className="px-4 py-2 bg-foreground-800 text-foreground-100 rounded-lg text-sm font-medium">
              已售出
            </span>
          </div>
        )}
      </div>

      {/* 信息区 */}
      <div className="p-3">
        {/* 标题 - 2行截断，14px */}
        <h3 className="text-sm font-medium text-foreground-800 line-clamp-2 mb-2 leading-snug">
          {product.title}
        </h3>

        {/* 价格 - accent-600 大号 + 原价划线 + 省¥xx标签 */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-semibold text-accent-600">¥{product.price}</span>
          <span className="text-xs text-foreground-400 line-through">¥{product.originalPrice}</span>
          {savedAmount > 0 && (
            <span className="text-xs px-1.5 py-0.5 bg-accent-100 text-accent-600 rounded">
              省¥{savedAmount}
            </span>
          )}
        </div>

        {/* 卖家头像+名称+评分 */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={product.seller.avatar}
            alt={product.seller.name}
            loading="lazy"
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs text-foreground-600">{product.seller.name}</span>
          <span className="text-xs text-foreground-400 flex items-center gap-0.5">
            <div className="w-3 h-3 flex items-center justify-center">
              <i className="ri-star-fill text-warning text-xs"></i>
            </div>
            {product.seller.rating}
          </span>
        </div>

        {/* 浏览数 + 收藏数 + 时间 - 辅助文字 12px */}
        <div className="flex items-center justify-between text-xs text-foreground-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-eye-line text-xs"></i>
              </div>
              {product.views}
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 flex items-center justify-center">
                <i className="ri-heart-line text-xs"></i>
              </div>
              {product.likes}
            </span>
          </div>
          <span>{product.postedAt}</span>
        </div>
      </div>
    </Link>
  )
}