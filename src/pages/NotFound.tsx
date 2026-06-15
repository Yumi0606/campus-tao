export function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 flex items-center justify-center bg-background-200 rounded-2xl mb-4">
        <i className="ri-emotion-sad-line text-4xl text-secondary-400"></i>
      </div>
      <h1 className="text-2xl font-semibold text-foreground-800 mb-2">页面未找到</h1>
      <p className="text-foreground-500 mb-6">您访问的页面不存在或已被移除</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 whitespace-nowrap font-medium"
      >
        <i className="ri-home-line"></i>
        返回首页
      </Link>
    </div>
  )
}