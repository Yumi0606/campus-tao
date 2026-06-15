export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { path: '/secondhand', label: '二手交易', icon: 'ri-swap-box-line' },
    { path: '/groupbuy', label: '拼团团购', icon: 'ri-group-line' },
    { path: '/forum', label: '校园论坛', icon: 'ri-chat-smile-2-line' },
    { path: '/profile', label: '个人中心', icon: 'ri-user-3-line' },
  ]

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background-50/95 backdrop-blur-md border-b border-secondary-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — 带 hover 发光效果 */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-primary-500 rounded-lg">
              <i className="ri-store-2-line text-xl text-white"></i>
            </div>
            <span className="text-xl font-bold text-foreground-900">校园淘</span>
          </Link>

          {/* Desktop Navigation — pill 风格导航按钮 */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-background-200/60 rounded-xl">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    active
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-800'
                  }`}
                >
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* 消息铃铛 — 带 badge 和 hover */}
            <Link
              to="/chat"
              className="relative p-2.5 rounded-xl text-foreground-500 hover:bg-background-100 hover:text-primary-500 transition-all duration-200"
            >
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-background-50"></span>
            </Link>

            {/* 用户头像 — 带 ring 和 hover */}
            <Link
              to="/profile/edit"
              className="w-9 h-9 rounded-xl bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-all duration-200 hover:ring-2 hover:ring-primary-300"
            >
              <i className="ri-user-line text-primary-600"></i>
            </Link>

            {/* Mobile Menu — 汉堡按钮 */}
            <button
              className="md:hidden p-2.5 rounded-xl text-foreground-500 hover:bg-background-100 hover:text-primary-500 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className={`text-xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu — 下拉面板 */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 pt-2 border-t border-secondary-200 animate-in slide-in-from-top">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-foreground-600 hover:bg-background-100 hover:text-foreground-800'
                    }`}
                  >
                    <i className={link.icon + ' text-lg'}></i>
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}