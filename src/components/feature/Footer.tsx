export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    quickNav: [
      { label: '二手交易', path: '/secondhand', icon: 'ri-swap-box-line' },
      { label: '拼团团购', path: '/groupbuy', icon: 'ri-group-line' },
      { label: '校园论坛', path: '/forum', icon: 'ri-chat-smile-2-line' },
    ],
    help: [
      { label: '使用指南', path: '#', icon: 'ri-book-line' },
      { label: '交易安全', path: '#', icon: 'ri-shield-check-line' },
      { label: '举报反馈', path: '#', icon: 'ri-flag-line' },
    ],
    about: [
      { label: '关于我们', path: '#', icon: 'ri-team-line' },
      { label: '用户协议', path: '#', icon: 'ri-file-text-line' },
      { label: '隐私政策', path: '#', icon: 'ri-lock-line' },
    ],
  }

  return (
    <footer className="bg-background-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 flex items-center justify-center bg-primary-500 rounded-lg">
                <i className="ri-store-2-line text-xl text-white"></i>
              </div>
              <span className="text-xl font-bold text-foreground-800">校园淘</span>
            </div>
            <p className="text-sm text-foreground-500 leading-relaxed">
              校园专属信息撮合平台，让闲置流动起来，让校园生活更便捷。提供二手交易、拼团团购、校园论坛三大核心功能。
            </p>
          </div>

          {/* 快速导航 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground-700 mb-4">快速导航</h4>
            <ul className="space-y-1">
              {footerLinks.quickNav.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-foreground-500 px-2 py-1.5 rounded-lg hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 帮助中心 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground-700 mb-4">帮助中心</h4>
            <ul className="space-y-1">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-foreground-500 px-2 py-1.5 rounded-lg hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h4 className="text-sm font-semibold text-foreground-700 mb-4">关于我们</h4>
            <ul className="space-y-1">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-sm text-foreground-500 px-2 py-1.5 rounded-lg hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-secondary-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-400">
            © {currentYear} 校园淘. 保留所有权利.
          </p>
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
            >
              <i className="ri-wechat-fill text-lg"></i>
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
            >
              <i className="ri-weibo-fill text-lg"></i>
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-200 hover:text-primary-500 transition-all duration-200"
            >
              <i className="ri-bilibili-fill text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}