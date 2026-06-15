interface PublishProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishProductModal({ isOpen, onClose }: PublishProductModalProps) {
  const [image, setImage] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [campus, setCampus] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [description, setDescription] = useState('')
  const [contactType, setContactType] = useState<'wechat' | 'qq'>('wechat')
  const [contactValue, setContactValue] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = ['电子产品', '生活电器', '图书教材', '家具', '文体用品', '服饰美妆', '其他']
  const campuses = ['主校区', '东校区', '西校区', '南校区', '北校区']

  const canSubmit = title.length > 0 && category && campus && price && description.length > 0

  const resetForm = () => {
    setImage(null); setTitle(''); setCategory(''); setCampus('')
    setPrice(''); setOriginalPrice(''); setDescription('')
    setContactType('wechat'); setContactValue(''); setSuccess(false)
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSuccess(true)
    setTimeout(() => { resetForm(); onClose() }, 2000)
  }

  useEffect(() => { if (!isOpen) resetForm() }, [isOpen])

  if (!isOpen) return null

  const inputClass = "w-full px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-950/50 backdrop-blur-sm"
      onClick={success ? undefined : onClose}
    >
      <div
        className="bg-background-50 rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-success/10 rounded-2xl">
              <i className="ri-check-line text-4xl text-success"></i>
            </div>
            <h3 className="text-lg font-semibold text-foreground-800 mb-2">发布成功！</h3>
            <p className="text-sm text-foreground-500">您的商品已成功发布</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground-800">发布商品</h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-all duration-200"
                onClick={onClose}
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            {/* 图片上传 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品图片</label>
              <div
                className="border-2 border-dashed border-secondary-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200"
                onClick={() => setImage('https://images.unsplash.com/photo-1523275335684-37898b6baf79?w=400&h=300&fit=crop')}
              >
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
              </div>
            </div>

            {/* 商品标题 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                商品标题 <span className="text-accent-500">*</span>
              </label>
              <input type="text" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)}
                className={inputClass} placeholder="请输入商品标题" />
              <p className="text-xs text-foreground-400 mt-1 text-right">{title.length}/60</p>
            </div>

            {/* 分类和校区 */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  分类 <span className="text-accent-500">*</span>
                </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className={inputClass + " cursor-pointer"}>
                  <option value="">请选择</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  校区 <span className="text-accent-500">*</span>
                </label>
                <select value={campus} onChange={(e) => setCampus(e.target.value)}
                  className={inputClass + " cursor-pointer"}>
                  <option value="">请选择</option>
                  {campuses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* 价格 */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">
                  售价 <span className="text-accent-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">¥</span>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
                    className={inputClass + " pl-8"} placeholder="0" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">原价（选填）</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-sm">¥</span>
                  <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)}
                    className={inputClass + " pl-8"} placeholder="0" />
                </div>
              </div>
            </div>

            {/* 商品描述 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">
                商品描述 <span className="text-accent-500">*</span>
              </label>
              <textarea maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)}
                rows={4} className={inputClass + " resize-none"} placeholder="请详细描述商品信息..." />
              <p className="text-xs text-foreground-400 mt-1 text-right">{description.length}/500</p>
            </div>

            {/* 联系方式 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">联系方式</label>
              <div className="flex gap-2 mb-2">
                <button onClick={() => setContactType('wechat')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    contactType === 'wechat' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                  }`}>
                  微信
                </button>
                <button onClick={() => setContactType('qq')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    contactType === 'qq' ? 'bg-primary-500 text-white' : 'bg-background-100 text-foreground-500 hover:bg-background-200'
                  }`}>
                  QQ
                </button>
              </div>
              <input type="text" value={contactValue} onChange={(e) => setContactValue(e.target.value)}
                className={inputClass} placeholder={`请输入${contactType === 'wechat' ? '微信号' : 'QQ号'}`} />
            </div>

            {/* 安全提示 */}
            <div className="bg-warning/10 rounded-xl p-3 mb-6">
              <p className="text-xs text-foreground-600 flex items-center gap-2">
                <i className="ri-shield-check-line text-warning"></i>
                请如实描述商品，建议面交验货后再付款
              </p>
            </div>

            {/* 提交按钮 */}
            <button
              disabled={!canSubmit}
              className={`w-full py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                canSubmit
                  ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
                  : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
              }`}
              onClick={handleSubmit}
            >
              发布商品
            </button>
          </>
        )}
      </div>
    </div>
  )
}