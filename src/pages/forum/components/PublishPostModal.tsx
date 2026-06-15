interface PublishPostModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishPostModal({ isOpen, onClose }: PublishPostModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = ['选课攻略', '活动通知', '学习交流', '兼职招聘', '失物招领', '生活杂谈', '其他']
  const canSubmit = title.length > 0 && category && content.length > 0
  const parsedTags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0).slice(0, 3)

  const resetForm = () => { setTitle(''); setCategory(''); setContent(''); setTagsInput(''); setSuccess(false) }
  const handleSubmit = () => { if (!canSubmit) return; setSuccess(true); setTimeout(() => { resetForm(); onClose() }, 2000) }
  useEffect(() => { if (!isOpen) resetForm() }, [isOpen])
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
            <h3 className="text-lg font-semibold text-foreground-800 mb-2">发布成功！</h3>
            <p className="text-sm text-foreground-500">您的帖子已成功发布</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground-800">发布帖子</h3>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:bg-background-100 hover:text-foreground-600 transition-all duration-200" onClick={onClose}>
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">帖子标题 <span className="text-accent-500">*</span></label>
              <input type="text" maxLength={80} value={title} onChange={(e) => setTitle(e.target.value)}
                className={inputClass} placeholder="请输入帖子标题" />
              <p className="text-xs text-foreground-400 mt-1 text-right">{title.length}/80</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">选择板块 <span className="text-accent-500">*</span></label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className={inputClass + " cursor-pointer"}>
                <option value="">请选择板块</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">正文内容 <span className="text-accent-500">*</span></label>
              <textarea maxLength={500} value={content} onChange={(e) => setContent(e.target.value)}
                rows={6} className={inputClass + " resize-none"} placeholder="请输入帖子内容..." />
              <p className="text-xs text-foreground-400 mt-1 text-right">{content.length}/500</p>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-foreground-700 mb-2">标签（最多3个）</label>
              <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                className={inputClass} placeholder="逗号分隔，如：选课,攻略,避坑" />
              {parsedTags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {parsedTags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-secondary-100 text-secondary-600 rounded-lg font-medium">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-primary-50 rounded-xl p-3 mb-6">
              <p className="text-xs text-foreground-600 flex items-center gap-2">
                <i className="ri-lightbulb-line text-primary-500"></i>
                建议用【前缀】格式标记帖子，如【选课】【活动】等
              </p>
            </div>

            <button disabled={!canSubmit}
              className={`w-full py-3 rounded-xl transition-all duration-200 whitespace-nowrap font-medium ${
                canSubmit ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]' : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
              }`} onClick={handleSubmit}>
              发布帖子
            </button>
          </>
        )}
      </div>
    </div>
  )
}