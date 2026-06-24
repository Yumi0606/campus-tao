import { itemApi, fileApi } from '@/api'
import type { ItemInfo } from '@/api/types'
import { useToast } from '@/components/base/Toast'
import { ITEM_CATEGORIES, CAMPUSES } from '@/constants'

interface PublishProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  /** 传入已有物品则为编辑模式 */
  editItem?: ItemInfo | null
}

export function PublishProductModal({ isOpen, onClose, onSuccess, editItem }: PublishProductModalProps) {
  const { showToast } = useToast()
  const isEdit = !!editItem

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [campus, setCampus] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const categories = ITEM_CATEGORIES
  const campuses = CAMPUSES
  const canSubmit = title.length > 0 && category && campus && price && description.length > 0

  const resetForm = () => {
    setImageFile(null); setImagePreview(null); setTitle(''); setCategory(''); setCampus('')
    setPrice(''); setOriginalPrice(''); setDescription('')
    setSubmitting(false); setSuccess(false)
  }

  // 编辑模式：预填数据
  useEffect(() => {
    if (!isOpen) return
    if (editItem) {
      setTitle(editItem.name)
      setCategory(editItem.category)
      setCampus(editItem.campus)
      setPrice(String(editItem.price))
      setOriginalPrice(String(editItem.originalPrice))
      setDescription(editItem.description)
      setImagePreview(editItem.images?.[0] || null)
    } else {
      resetForm()
    }
  }, [isOpen, editItem])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    const reader = new FileReader()
    reader.onload = (ev) => setImagePreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return
    setSubmitting(true)
    try {
      // 先上传新图片（如果有）
      let images = editItem?.images || []
      if (imageFile) {
        const url = await fileApi.upload(imageFile)
        images = [url]
      }

      const payload = {
        name: title,
        price: Number(price),
        quantity: editItem?.quantity || 1,
        description,
        category,
        campus,
        images,
      }

      if (isEdit && editItem) {
        await itemApi.update(editItem.id, payload)
      } else {
        await itemApi.publish(payload)
      }

      setSuccess(true)
      showToast(isEdit ? '修改成功' : '发布成功', 'success')
      onSuccess?.()
      setTimeout(() => { resetForm(); onClose() }, 1500)
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : (isEdit ? '修改失败' : '发布失败'), 'error')
    } finally {
      setSubmitting(false)
    }
  }

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
            <h3 className="text-lg font-semibold text-foreground-800 mb-2">{isEdit ? '修改成功！' : '发布成功！'}</h3>
            <p className="text-sm text-foreground-500">{isEdit ? '商品信息已更新' : '您的商品已成功发布'}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground-800">{isEdit ? '编辑商品' : '发布商品'}</h3>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-all duration-200 cursor-pointer"
                onClick={onClose}>
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            {/* 图片上传 */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品图片</label>
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="product-image-input" />
              <label htmlFor="product-image-input"
                className="border-2 border-dashed border-secondary-300 rounded-xl p-4 text-center cursor-pointer hover:border-primary-400 hover:bg-primary-50/30 transition-all duration-200 block">
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

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品标题 <span className="text-accent-500">*</span></label>
              <input type="text" maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)}
                className={inputClass} placeholder="请输入商品标题" />
              <p className="text-xs text-foreground-400 mt-1 text-right">{title.length}/60</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">分类 <span className="text-accent-500">*</span></label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass + " cursor-pointer"}>
                  <option value="">请选择</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">校区 <span className="text-accent-500">*</span></label>
                <select value={campus} onChange={(e) => setCampus(e.target.value)} className={inputClass + " cursor-pointer"}>
                  <option value="">请选择</option>
                  {campuses.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-medium text-foreground-700 mb-2">售价 <span className="text-accent-500">*</span></label>
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

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">商品描述 <span className="text-accent-500">*</span></label>
              <textarea maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)}
                rows={4} className={inputClass + " resize-none"} placeholder="请详细描述商品信息..." />
              <p className="text-xs text-foreground-400 mt-1 text-right">{description.length}/500</p>
            </div>

            <div className="bg-warning/10 rounded-xl p-3 mb-6">
              <p className="text-xs text-foreground-600 flex items-center gap-2">
                <i className="ri-shield-check-line text-warning"></i>
                请如实描述商品，建议面交验货后再付款
              </p>
            </div>

            <button disabled={!canSubmit || submitting}
              className={`w-full py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium cursor-pointer ${
                canSubmit && !submitting ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]' : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
              }`} onClick={handleSubmit}>
              {submitting ? (isEdit ? '保存中...' : '发布中...') : (isEdit ? '保存修改' : '发布商品')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
