import { userApi } from '@/api'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'

export function Login() {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)

  // 登录表单
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  // 注册表单
  const [regUsername, setRegUsername] = useState('')
  const [regPhone, setRegPhone] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirm, setRegConfirm] = useState('')

  // 登录后跳转到来源页，默认首页
  const from = (location.state as { from?: string })?.from || '/'

  const inputClass = 'w-full px-4 py-3 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200'

  const handleLogin = async () => {
    if (!account.trim() || !password.trim()) {
      showToast('请填写账号和密码', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await userApi.login({ account, password })
      // 后端返回 { token, userId, username, nickname }，用 token 拉取完整用户信息
      localStorage.setItem('token', res.token)
      const userInfo = await userApi.getInfo()
      login(res.token, userInfo)
      showToast('登录成功', 'success')
      navigate(from, { replace: true })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '登录失败'
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!regUsername.trim() || !regPhone.trim() || !regPassword.trim()) {
      showToast('请填写所有必填项', 'error')
      return
    }
    if (regPassword !== regConfirm) {
      showToast('两次密码输入不一致', 'error')
      return
    }
    if (!/^1\d{10}$/.test(regPhone)) {
      showToast('请输入正确的手机号', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await userApi.register({
        username: regUsername,
        phone: regPhone,
        password: regPassword,
      })
      // 注册后后端返回 token，用 token 拉取完整用户信息
      localStorage.setItem('token', res.token)
      const userInfo = await userApi.getInfo()
      login(res.token, userInfo)
      showToast('注册成功', 'success')
      navigate(from, { replace: true })
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '注册失败'
      showToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      isLogin ? handleLogin() : handleRegister()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-12">
      <div className="w-full max-w-md">
        {/* 顶部品牌 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <i className="ri-store-2-line text-3xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-foreground-800">校园淘</h1>
          <p className="text-sm text-foreground-500 mt-1">校园好物，轻松淘到</p>
        </div>

        {/* 表单卡片 */}
        <div className="bg-background-100 rounded-xl p-8">
          {/* 登录/注册 切换 Tab */}
          <div className="flex p-1 bg-background-200/60 rounded-xl mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                isLogin
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                !isLogin
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-foreground-500 hover:text-foreground-700'
              }`}
            >
              注册
            </button>
          </div>

          {isLogin ? (
            /* ---- 登录表单 ---- */
            <div className="space-y-4" onKeyDown={handleKeyDown}>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">账号</label>
                <div className="relative">
                  <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="用户名或手机号"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">密码</label>
                <div className="relative">
                  <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="请输入密码"
                  />
                </div>
              </div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  loading
                    ? 'bg-primary-300 text-white cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                }`}
              >
                {loading ? '登录中...' : '登录'}
              </button>
            </div>
          ) : (
            /* ---- 注册表单 ---- */
            <div className="space-y-4" onKeyDown={handleKeyDown}>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">用户名</label>
                <div className="relative">
                  <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="text"
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="设置用户名"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">手机号</label>
                <div className="relative">
                  <i className="ri-phone-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="输入手机号"
                    maxLength={11}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">密码</label>
                <div className="relative">
                  <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="设置密码（至少6位）"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">确认密码</label>
                <div className="relative">
                  <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400"></i>
                  <input
                    type="password"
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    className={inputClass + ' pl-11'}
                    placeholder="再次输入密码"
                  />
                </div>
              </div>
              <button
                onClick={handleRegister}
                disabled={loading}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  loading
                    ? 'bg-primary-300 text-white cursor-not-allowed'
                    : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                }`}
              >
                {loading ? '注册中...' : '注册'}
              </button>
            </div>
          )}
        </div>

        {/* 底部提示 */}
        <p className="text-center text-xs text-foreground-400 mt-6">
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors cursor-pointer"
          >
            {isLogin ? '立即注册' : '去登录'}
          </button>
        </p>
      </div>
    </div>
  )
}
