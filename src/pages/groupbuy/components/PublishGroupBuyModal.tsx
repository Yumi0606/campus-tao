interface PublishGroupBuyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishGroupBuyModal({ isOpen, onClose }: PublishGroupBuyModalProps) {
  const [image, setImage] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [groupPrice, setGroupPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [minMembers, setMinMembers] = useState('2')
  const [deadline, setDeadline] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')
  const [description, setDescription] = useState('')
  const [success, setSuccess] = useState(false)

  const canSubmit = title.length > 0 && groupPrice && originalPrice && minMembers && deadline && pickupLocation && description.length > 0

  const resetForm = () => {
    setImage(null); setTitle(''); setGroupPrice(''); setOriginalPrice('')
    setMinMembers('2'); setDeadline(''); setPickupLocation(''); setDescription(''); setSuccess(false)
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSuccess(true)
    setTimeout(() => { resetForm(); onClose() }, 2000)
  }

  useEffect(() => { if (!isOpen) resetForm() }, [isOpen])
  if (!isOpen) return null

  const inputClass = "w-full px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"

  // 图片上传处理
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-950/50 backdrop-blur-sm"
      onClick={success ? undefined : onClose}>
      <div className="bg-background-50 rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-success/10 rounded-2xl">
              <i className="ri-check-line text-4xl text-success"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground-800 mb-2">拼团发起成功！</h3>
            <p className="text-sm text-foreground-500">快邀请好友加入吧</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground-800">发起拼团</h3>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-all duration-200" onClick={onClose}>
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            {/* 图片上传 — 虚线框 + file input + 预览 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品图片</label>
              <input
                type="file" accept="image/*" id="groupbuy-image" className="hidden"
                onChange={handleImageChange} />
              <label
                htmlFor="groupbuy-image"
                className="block border-2 border-dashed border-secondary-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200">
                {image ? (
                  <img src={image} alt="预览" className="w-full h-32 object-cover rounded-lg" />
                ) : (
                  <div className="py-4">
                    <div className="w-10 h-10 flex items-center justify-center mx-auto mb-2 bg-background-200 rounded-xl">
                      <i className="ri-image-add-line text-xl text-secondary-400"></i>
                    </div>
                    <p className="text-sm text-foreground-500">点击上传图片</p>
                    <p className="text-xs text-foreground-400 mt-1">支持 JPG、PNG，建议尺寸 800×600</p>
                  </div>
                )}
              </label>
            </div>

            {/* 团购标题 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                团购标题 <span className="text-accent-500">*</span>
              </label>
              <input type="text" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)}
                className={inputClass} placeholder="请输入团购标题" />
              <p className="text-xs text-foreground-400 mt-1 text-right">{title.length}/60</p>
            </div>

            {/* 价格 */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  团购价 <span className="text-accent-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">¥</span>
                  <input type="number" value={groupPrice} onChange={(e) => setGroupPrice(e.target.value)}
                    className={inputClass + " pl-8"} placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  原价 <span className="text-accent-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">¥</span>
                  <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                    className={inputClass + " pl-8"} placeholder="0" />
                </div>
              </div>
            </div>

            {/* 成团人数和截止时间 */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  成团人数 <span className="text-accent-500">*</span>
                </label>
                <input type="number" min={2} value={minMembers} onChange={(e) => setMinMembers(e.target.value)}
                  className={inputClass} placeholder="最少2人" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  截止时间 <span className="text-accent-500">*</span>
                </label>
                <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                  className={inputClass + " cursor-pointer"} />
              </div>
            </div>

            {/* 取货地点 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                取货地点 <span className="text-accent-500">*</span>
              </label>
              <input type="text" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}
                className={inputClass} placeholder="请输入取货地点" />
            </div>

            {/* 团购说明 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                团购说明 <span className="text-accent-500">*</span>
              </label>
              <textarea maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)}
                rows={4} className={inputClass + " resize-none"} placeholder="请详细描述团购商品信息..." />
              <p className="text-xs text-foreground-400 mt-1 text-right">{description.length}/500</p>
            </div>

            {/* 安全提示 */}
            <div className="bg-warning/10 rounded-xl p-3 mb-6">
              <p className="text-xs text-foreground-600 flex items-center gap-2">
                <i className="ri-shield-check-line text-warning"></i>
                团长负责统计人数、统一采购和分发商品，请诚信组织
              </p>
            </div>

            {/* 提交按钮 */}
            <button disabled={!canSubmit}
              className={`w-full py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                canSubmit ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]' : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
              }`} onClick={handleSubmit}>
              发起拼团
            </button>
          </>
        )}
      </div>
    </div>
  )
}