interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  title: string
  recipient: string
}

export function PaymentModal({ isOpen, onClose, amount, title, recipient }: PaymentModalProps) {
  const [stage, setStage] = useState<'scan' | 'confirmed'>('scan')

  useEffect(() => {
    if (isOpen) {
      setStage('scan')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleConfirmPayment = () => {
    setStage('confirmed')
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground-950/50"
      onClick={onClose}
    >
      <div
        className="bg-background-50 rounded-xl p-6 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {stage === 'scan' ? (
          <>
            {/* 扫码支付 */}
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-foreground-800 mb-1">扫码支付</h3>
              <p className="text-sm text-foreground-500">{title}</p>
            </div>

            {/* 金额 */}
            <div className="text-center mb-4">
              <span className="text-3xl font-bold text-accent-600">¥{amount}</span>
            </div>

            {/* 模拟二维码 */}
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-background-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <i className="ri-qr-code-line text-4xl text-foreground-400"></i>
                  </div>
                  <p className="text-xs text-foreground-400">模拟二维码</p>
                </div>
              </div>
            </div>

            {/* 收款方信息 */}
            <div className="text-center mb-4">
              <p className="text-sm text-foreground-600">收款方：{recipient}</p>
            </div>

            {/* 安全提示 */}
            <div className="bg-warning/10 rounded-lg p-3 mb-4">
              <p className="text-xs text-foreground-600 flex items-center gap-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-shield-check-line text-warning"></i>
                </div>
                平台仅提供信息展示，请确认收款方身份后付款
              </p>
            </div>

            {/* 确认按钮 */}
            <button
              className="w-full py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors whitespace-nowrap"
              onClick={handleConfirmPayment}
            >
              我已支付
            </button>
          </>
        ) : (
          <>
            {/* 支付成功 */}
            <div className="text-center py-8">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-success/10 rounded-full">
                <i className="ri-check-line text-4xl text-success"></i>
              </div>
              <h3 className="text-lg font-semibold text-foreground-800 mb-2">支付成功</h3>
              <p className="text-sm text-foreground-500">请与对方联系确认交易详情</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}