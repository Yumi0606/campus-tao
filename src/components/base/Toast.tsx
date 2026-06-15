import { createContext, useContext, useState, useCallback } from 'react'

// Toast 类型
interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

// Context
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// 使用 Toast 的 hook
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

// Toast Provider 组件
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    // 3秒后自动移除
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast 渲染层 */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 animate-in slide-in-from-right ${
              toast.type === 'success'
                ? 'bg-success text-white'
                : toast.type === 'error'
                ? 'bg-error text-white'
                : 'bg-primary-500 text-white'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={
                  toast.type === 'success' ? 'ri-check-line' :
                  toast.type === 'error' ? 'ri-close-line' :
                  'ri-information-line'
                }></i>
              </div>
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}