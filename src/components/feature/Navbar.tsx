import { useAuth } from '@/components/base/Auth'

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 点击外部关闭用户菜单
  useEffect(() => {
    if (!userMenuOpen) return
    const handleClick = () => setUserMenuOpen(false)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [userMenuOpen])

  const navLinks = [
    { path: '/secondhand', label: '二手交易', icon: 'ri-swap-box-line' },
    { path: '/groupbuy', label: '拼团团购', icon: 'ri-group-line' },
    { path: '/forum', label: '校园论坛', icon: 'ri-chat-smile-2-line' },
  ]

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/')

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    navigate('/login')
  }

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
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 px-2 py-1 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <div className="w-9 h-9 flex items-center justify-center bg-primary-500 rounded-lg">
              <i className="ri-store-2-line text-xl text-white"></i>
            </div>
            <span className="text-xl font-bold text-foreground-900">校园淘</span>
          </Link>

          {/* Desktop Navigation — pill 风格（仅已登录显示） */}
          {isAuthenticated && (
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
          )}

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* 消息铃铛 */}
                <Link
                  to="/chat"
                  className="relative p-2.5 rounded-xl text-foreground-500 hover:bg-background-100 hover:text-primary-500 transition-all duration-200"
                >
                  <i className="ri-notification-3-line text-xl"></i>
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-background-50"></span>
                </Link>

                {/* 用户头像 + 下拉菜单 */}
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-background-100 transition-all duration-200 cursor-pointer"
                  >
                    {user?.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.nickname}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center">
                        <i className="ri-user-line text-primary-600 text-sm"></i>
                      </div>
                    )}
                    <span className="hidden sm:inline text-sm font-medium text-foreground-700 max-w-[80px] truncate">
                      {user?.nickname || user?.username}
                    </span>
                    <i className="ri-arrow-down-s-line text-foreground-400 text-sm"></i>
                  </button>

                  {/* 下拉菜单 */}
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-background-50 rounded-xl border border-secondary-200 py-2 animate-in slide-in-from-top-2">
                      <Link
                        to="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground-600 hover:bg-background-100 hover:text-foreground-800 transition-colors"
                      >
                        <i className="ri-user-3-line"></i>
                        个人中心
                      </Link>
                      <Link
                        to="/profile/edit"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground-600 hover:bg-background-100 hover:text-foreground-800 transition-colors"
                      >
                        <i className="ri-settings-3-line"></i>
                        编辑资料
                      </Link>
                      <div className="border-t border-secondary-200 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground-600 hover:bg-error/10 hover:text-error transition-colors cursor-pointer"
                      >
                        <i className="ri-logout-box-line"></i>
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* 未登录 — 显示登录按钮 */
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:scale-95 transition-all duration-200 text-sm font-medium"
              >
                <i className="ri-login-box-line"></i>
                登录
              </Link>
            )}

            {/* Mobile Menu — 汉堡按钮 */}
            {isAuthenticated && (
              <button
                className="md:hidden p-2.5 rounded-xl text-foreground-500 hover:bg-background-100 hover:text-primary-500 transition-all duration-200 cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <i className={`text-xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu — 下拉面板 */}
        {isAuthenticated && mobileMenuOpen && (
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
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground-600 hover:bg-background-100 hover:text-foreground-800 transition-all duration-200 whitespace-nowrap"
              >
                <i className="ri-user-3-line text-lg"></i>
                <span>个人中心</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
