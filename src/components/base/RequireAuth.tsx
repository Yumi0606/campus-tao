import { useAuth } from '@/components/base/Auth'

interface RequireAuthProps {
  children: React.ReactNode
}

/** 路由守卫：未登录时重定向到 /login，并记录来源页 */
export function RequireAuth({ children }: RequireAuthProps) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-3">
          <i className="ri-loader-4-line text-3xl text-primary-500 animate-spin"></i>
          <p className="text-sm text-foreground-400">加载中...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <>{children}</>
}
