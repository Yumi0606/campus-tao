import { userApi, fileApi } from '@/api'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'

export function EditProfile() {
  const { user, logout, refreshUser } = useAuth()
  const { showToast } = useToast()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const [form, setForm] = useState({
    nickname: user?.nickname || '',
    campus: user?.campus || '',
    contactInfo: user?.contactInfo || '',
    email: user?.email || '',
    phone: user?.phone || '',
    oldPassword: '',
    newPassword: '',
  })

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await fileApi.upload(file)
      await userApi.updateInfo({ avatarUrl: url })
      await refreshUser()
      showToast('头像已更新', 'success')
    } catch {
      showToast('上传失败', 'error')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updateData: Record<string, unknown> = {
        nickname: form.nickname,
        campus: form.campus,
        contactInfo: form.contactInfo,
        email: form.email,
        phone: form.phone,
      }
      if (form.oldPassword && form.newPassword) {
        updateData.oldPassword = form.oldPassword
        updateData.newPassword = form.newPassword
      }
      await userApi.updateInfo(updateData)
      await refreshUser()
      setSaved(true)
      showToast('资料已保存', 'success')
      setTimeout(() => setSaved(false), 2000)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '保存失败', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    logout()
    window.REACT_APP_NAVIGATE('/login')
  }

  if (!user) return null

  const inputClass = "w-full px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground-800 mb-6">编辑资料</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧头像区 sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-background-100 rounded-xl p-6 text-center">
              <div className="relative inline-block mb-4">
                <img src={user.avatarUrl || 'https://i.pravatar.cc/100?img=1'} alt={user.nickname} loading="lazy"
                  className="w-28 h-28 rounded-2xl" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" id="avatar-input" />
                <label htmlFor="avatar-input"
                  className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-200 cursor-pointer">
                  <i className="ri-camera-line text-sm"></i>
                </label>
              </div>
              <h2 className="text-base font-semibold text-foreground-800">{form.nickname || user.username}</h2>
              <div className="flex items-center justify-center gap-3 mt-2 text-sm text-foreground-500">
                <span className="inline-flex items-center gap-1"><i className="ri-star-fill text-warning text-xs"></i>{user.rating}</span>
                <span>·</span>
                <span>{user.tradeCount} 笔交易</span>
              </div>
            </div>
          </div>

          {/* 右侧表单区 */}
          <div className="lg:col-span-2">
            {/* 基本信息 */}
            <div className="bg-background-100 rounded-xl p-6 mb-6">
              <h3 className="text-base font-semibold text-foreground-800 mb-4">基本信息</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">昵称</label>
                  <input type="text" value={form.nickname} onChange={(e) => updateField('nickname', e.target.value)}
                    className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">校区</label>
                    <select value={form.campus} onChange={(e) => updateField('campus', e.target.value)}
                      className={inputClass + " cursor-pointer"}>
                      {['主校区', '东校区', '西校区', '南校区', '北校区'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">邮箱</label>
                    <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)}
                      className={inputClass} placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">联系方式</label>
                  <input type="text" value={form.contactInfo} onChange={(e) => updateField('contactInfo', e.target.value)}
                    className={inputClass} placeholder="微信号 / QQ号" />
                </div>
              </div>
            </div>

            {/* 修改密码 */}
            <div className="bg-background-100 rounded-xl p-6 mb-6">
              <h3 className="text-base font-semibold text-foreground-800 mb-4">修改密码</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">旧密码</label>
                  <input type="password" value={form.oldPassword} onChange={(e) => updateField('oldPassword', e.target.value)}
                    className={inputClass} placeholder="输入旧密码" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">新密码</label>
                  <input type="password" value={form.newPassword} onChange={(e) => updateField('newPassword', e.target.value)}
                    className={inputClass} placeholder="输入新密码" />
                </div>
              </div>
              <p className="text-xs text-foreground-400 mt-2">留空则不修改密码</p>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleSave} disabled={saving}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                  saved ? 'bg-success text-white' : saving ? 'bg-primary-300 text-white cursor-not-allowed' : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                }`}>
                <i className={saved ? 'ri-check-line' : 'ri-save-line'}></i>
                {saved ? '已保存' : saving ? '保存中...' : '保存'}
              </button>
              <button onClick={() => window.REACT_APP_NAVIGATE('/profile')}
                className="px-8 py-3 bg-background-100 text-foreground-600 rounded-xl hover:bg-background-200 transition-all duration-200 whitespace-nowrap font-medium cursor-pointer">
                取消
              </button>
            </div>

            {/* 账户管理 */}
            <div className="bg-error/5 rounded-xl p-6 border border-error/10">
              <h3 className="text-base font-semibold text-foreground-800 mb-4">账户管理</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground-700">退出登录</p>
                  <p className="text-xs text-foreground-400">退出当前账号</p>
                </div>
                <button onClick={() => setShowLogoutConfirm(true)}
                  className="px-4 py-2 bg-background-50 text-foreground-600 rounded-xl hover:bg-error/10 hover:text-error transition-all duration-200 whitespace-nowrap font-medium cursor-pointer">
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 退出登录确认弹窗 */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-950/50 backdrop-blur-sm"
          onClick={() => setShowLogoutConfirm(false)}>
          <div className="bg-background-50 rounded-xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-error/10 rounded-2xl">
              <i className="ri-logout-box-line text-2xl text-error"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground-800 text-center mb-2">确认退出登录？</h3>
            <p className="text-sm text-foreground-500 text-center mb-6">退出后需要重新登录才能使用</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 bg-background-100 text-foreground-600 rounded-xl hover:bg-background-200 transition-all duration-200 whitespace-nowrap font-medium cursor-pointer">取消</button>
              <button onClick={handleLogout}
                className="flex-1 py-2.5 bg-error text-white rounded-xl hover:bg-error/90 active:scale-[0.98] transition-all duration-200 whitespace-nowrap font-medium cursor-pointer">确认退出</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
