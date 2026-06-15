import { userProfile } from '@/mocks/profile'
import { useToast } from '@/components/base/Toast'

export function EditProfile() {
  const { showToast } = useToast()
  const [saved, setSaved] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteInput, setDeleteInput] = useState('')

  // 表单状态
  const [form, setForm] = useState({
    nickname: userProfile.name,
    campus: userProfile.campus,
    department: userProfile.department,
    grade: userProfile.grade,
    bio: userProfile.bio,
    wechat: userProfile.wechat,
    qq: userProfile.qq,
  })

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setSaved(true)
    showToast('资料已保存', 'success')
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    setShowLogoutConfirm(false)
    showToast('已退出登录', 'info')
    window.REACT_APP_NAVIGATE('/')
  }

  const handleDeleteAccount = () => {
    if (deleteInput !== '确认注销') return
    setShowDeleteConfirm(false)
    setDeleteInput('')
    showToast('账号已注销', 'error')
    window.REACT_APP_NAVIGATE('/')
  }

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
                <img src={userProfile.avatar} alt={userProfile.name} loading="lazy"
                  className="w-28 h-28 rounded-2xl" />
                <button className="absolute -bottom-1 -right-1 w-9 h-9 flex items-center justify-center bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-all duration-200">
                  <i className="ri-camera-line text-sm"></i>
                </button>
              </div>
              <h2 className="text-base font-semibold text-foreground-800">{form.nickname}</h2>
              <div className="flex items-center justify-center gap-3 mt-2 text-sm text-foreground-500">
                <span className="inline-flex items-center gap-1"><i className="ri-star-fill text-warning text-xs"></i>{userProfile.rating}</span>
                <span>·</span>
                <span>{userProfile.tradeCount} 笔交易</span>
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
                    <label className="block text-sm font-medium text-foreground-700 mb-2">年级</label>
                    <select value={form.grade} onChange={(e) => updateField('grade', e.target.value)}
                      className={inputClass + " cursor-pointer"}>
                      {['大一', '大二', '大三', '大四', '研一', '研二', '研三'].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">院系</label>
                  <input type="text" value={form.department} onChange={(e) => updateField('department', e.target.value)}
                    className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">个人简介</label>
                  <textarea maxLength={200} value={form.bio} onChange={(e) => updateField('bio', e.target.value)}
                    rows={3} className={inputClass + " resize-none"} />
                  <p className="text-xs text-foreground-400 mt-1 text-right">{form.bio.length}/200</p>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="bg-background-100 rounded-xl p-6 mb-6">
              <h3 className="text-base font-semibold text-foreground-800 mb-4">联系方式</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">微信</label>
                  <input type="text" value={form.wechat} onChange={(e) => updateField('wechat', e.target.value)}
                    className={inputClass} placeholder="微信号" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-2">QQ</label>
                  <input type="text" value={form.qq} onChange={(e) => updateField('qq', e.target.value)}
                    className={inputClass} placeholder="QQ号" />
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleSave}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                  saved ? 'bg-success text-white' : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                }`}>
                <i className={saved ? 'ri-check-line' : 'ri-save-line'}></i>
                {saved ? '已保存' : '保存'}
              </button>
              <button onClick={() => window.REACT_APP_NAVIGATE('/profile')}
                className="px-8 py-3 bg-background-100 text-foreground-600 rounded-xl hover:bg-background-200 transition-all duration-200 whitespace-nowrap font-medium">
                取消
              </button>
            </div>

            {/* 账户管理 Danger Zone */}
            <div className="bg-error/5 rounded-xl p-6 border border-error/10">
              <h3 className="text-base font-semibold text-foreground-800 mb-4">账户管理</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground-700">退出登录</p>
                    <p className="text-xs text-foreground-400">退出当前账号</p>
                  </div>
                  <button onClick={() => setShowLogoutConfirm(true)}
                    className="px-4 py-2 bg-background-50 text-foreground-600 rounded-xl hover:bg-error/10 hover:text-error transition-all duration-200 whitespace-nowrap font-medium">
                    退出登录
                  </button>
                </div>
                <div className="border-t border-error/10 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground-700">注销账号</p>
                    <p className="text-xs text-foreground-400">永久删除账号及所有数据</p>
                  </div>
                  <button onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-error/10 text-error rounded-xl hover:bg-error/20 transition-all duration-200 whitespace-nowrap font-medium">
                    注销账号
                  </button>
                </div>
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
                className="flex-1 py-2.5 bg-background-100 text-foreground-600 rounded-xl hover:bg-background-200 transition-all duration-200 whitespace-nowrap font-medium">取消</button>
              <button onClick={handleLogout}
                className="flex-1 py-2.5 bg-error text-white rounded-xl hover:bg-error/90 active:scale-[0.98] transition-all duration-200 whitespace-nowrap font-medium">确认退出</button>
            </div>
          </div>
        </div>
      )}

      {/* 注销账号确认弹窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-950/50 backdrop-blur-sm"
          onClick={() => { setShowDeleteConfirm(false); setDeleteInput('') }}>
          <div className="bg-background-50 rounded-xl p-6 w-full max-w-sm mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-error/10 rounded-2xl">
              <i className="ri-delete-bin-line text-2xl text-error"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground-800 text-center mb-2">确认注销账号？</h3>
            <p className="text-sm text-foreground-500 text-center mb-4">此操作不可恢复，所有数据将被永久删除</p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground-700 mb-2">请输入"确认注销"以继续</label>
              <input type="text" value={deleteInput} onChange={(e) => setDeleteInput(e.target.value)}
                className={inputClass} placeholder="确认注销" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteInput('') }}
                className="flex-1 py-2.5 bg-background-100 text-foreground-600 rounded-xl hover:bg-background-200 transition-all duration-200 whitespace-nowrap font-medium">取消</button>
              <button onClick={handleDeleteAccount} disabled={deleteInput !== '确认注销'}
                className={`flex-1 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                  deleteInput === '确认注销' ? 'bg-accent-500 text-white hover:bg-accent-600 active:scale-[0.98]' : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
                }`}>
                确认注销
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}