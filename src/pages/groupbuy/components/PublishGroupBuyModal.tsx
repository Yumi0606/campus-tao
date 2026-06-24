import { groupBuyApi, fileApi } from '@/api'
import type { GroupBuyInfo } from '@/api/types'
import { useToast } from '@/components/base/Toast'

interface PublishGroupBuyModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  /** 传入已有拼团则为编辑模式 */
  editGroupBuy?: GroupBuyInfo | null
}

export function PublishGroupBuyModal({ isOpen, onClose, onSuccess, editGroupBuy }: PublishGroupBuyModalProps) {
  const { showToast } = useToast()
  const isEdit = !!editGroupBuy
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [groupPrice, setGroupPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [minMembers, setMinMembers] = useState('2')
  const [deadline, setDeadline] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const canSubmit = title.length > 0 && groupPrice && originalPrice && minMembers && deadline && description.length > 0

  const resetForm = () => {
    setImageFile(null); setImagePreview(null); setTitle(''); setGroupPrice(''); setOriginalPrice('')
    setMinMembers('2'); setDeadline(''); setDescription(''); setSubmitting(false); setSuccess(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)
    try {
      let images: string[] = editGroupBuy?.images || []
      if (imageFile) {
        const url = await fileApi.upload(imageFile)
        images = [url]
      }
      const payload = {
        name: title,
        originalPrice: Number(originalPrice),
        discountPrice: Number(groupPrice),
        minPeople: Number(minMembers),
        quantity: Number(minMembers),
        endTime: new Date(deadline).toISOString(),
        description,
        images,
      }
      if (isEdit && editGroupBuy) {
        await groupBuyApi.update(editGroupBuy.id, payload)
      } else {
        await groupBuyApi.create(payload)
      }
      setSuccess(true)
      showToast(isEdit ? '修改成功！' : '拼团发起成功！', 'success')
      onSuccess?.()
      setTimeout(() => { resetForm(); onClose() }, 2000)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : (isEdit ? '修改失败' : '发起失败'), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    if (editGroupBuy) {
      setTitle(editGroupBuy.name)
      setGroupPrice(String(editGroupBuy.discountPrice))
      setOriginalPrice(String(editGroupBuy.originalPrice))
      setMinMembers(String(editGroupBuy.minPeople))
      // 将 ISO 时间转为 datetime-local 格式 (YYYY-MM-DDTHH:mm)
      const dt = new Date(editGroupBuy.endTime)
      const pad = (n: number) => String(n).padStart(2, '0')
      setDeadline(`${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`)
      setDescription(editGroupBuy.description || '')
      setImagePreview(editGroupBuy.images?.[0] || null)
    } else {
      resetForm()
    }
  }, [isOpen, editGroupBuy])
  if (!isOpen) return null

  const inputClass = "w-full px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"

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
            <h3 className="text-lg font-semibold text-foreground-800 mb-2">{isEdit ? '修改成功！' : '拼团发起成功！'}</h3>
            <p className="text-sm text-foreground-500">快邀请好友加入吧</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground-800">{isEdit ? '编辑拼团' : '发起拼团'}</h3>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-all duration-200 cursor-pointer" onClick={onClose}>
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            {/* 图片上传 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品图片</label>
              <input type="file" accept="image/*" id="groupbuy-image" className="hidden" onChange={handleImageChange} />
              <label htmlFor="groupbuy-image"
                className="block border-2 border-dashed border-secondary-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200">
                {imagePreview ? (
                  <img src={imagePreview} alt="预览" className="w-full h-32 object-cover rounded-lg" />
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
                <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)}
                  className={inputClass + " cursor-pointer"} />
              </div>
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
            <button disabled={!canSubmit || submitting}
              className={`w-full py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                canSubmit && !submitting ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]' : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
              }`} onClick={handleSubmit}>
              {submitting ? (isEdit ? '保存中...' : '发起中...') : (isEdit ? '保存修改' : '发起拼团')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
