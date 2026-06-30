/**
 * 图片/头像缺失时的 Fallback 组件
 * 当 src 为空或加载失败时，显示占位图标 + 文字
 */

/** 商品图片缺失时的占位组件 */
export function FallbackImage({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-background-200 text-secondary-400 ${className}`}>
      <i className="ri-image-line text-3xl"></i>
      <span className="text-xs mt-1">暂无图片</span>
    </div>
  )
}

/** 头像缺失时的占位组件 */
export function FallbackAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-background-200 text-secondary-400 ${className}`}>
      <i className="ri-user-line"></i>
    </div>
  )
}

/**
 * 带自动 fallback 的图片组件
 * src 为空时直接显示 FallbackImage，加载失败时也切换为 FallbackImage
 */
export function SafeImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
}: {
  src?: string
  alt?: string
  className?: string
  /** fallback 占位容器的额外 class */
  fallbackClassName?: string
}) {
  const [error, setError] = useState(false)

  // src 为空或加载失败时显示 fallback
  if (!src || error) {
    return <FallbackImage className={fallbackClassName || className} />
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      className={className}
      onError={() => setError(true)}
    />
  )
}

/**
 * 带自动 fallback 的头像组件
 * src 为空时直接显示 FallbackAvatar，加载失败时也切换为 FallbackAvatar
 */
export function SafeAvatar({
  src,
  alt,
  className = '',
  fallbackClassName = '',
}: {
  src?: string
  alt?: string
  className?: string
  /** fallback 占位容器的额外 class */
  fallbackClassName?: string
}) {
  const [error, setError] = useState(false)

  // src 为空或加载失败时显示 fallback
  if (!src || error) {
    return <FallbackAvatar className={fallbackClassName || className} />
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      loading="lazy"
      className={className}
      onError={() => setError(true)}
    />
  )
}
