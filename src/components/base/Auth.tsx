import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { userApi } from '@/api'
import type { UserInfo } from '@/api/types'

interface AuthContextType {
  /** 当前登录用户信息 */
  user: UserInfo | null
  /** 是否已登录 */
  isAuthenticated: boolean
  /** 是否正在加载用户信息 */
  loading: boolean
  /** 登录，保存 token 和用户信息 */
  login: (token: string, userData: UserInfo) => void
  /** 登出，清除 token 和用户信息 */
  logout: () => void
  /** 刷新当前用户信息（从后端重新拉取） */
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(() => {
    try {
      const cached = localStorage.getItem('user')
      return cached ? JSON.parse(cached) as UserInfo : null
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })
  const [loading, setLoading] = useState(true)

  // 初始化：如果 localStorage 有 token，尝试拉取最新用户信息
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }
    userApi.getInfo()
      .then((data) => {
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
      })
      .catch(() => {
        // token 无效，清除
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback((token: string, userData: UserInfo) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await userApi.getInfo()
      setUser(data)
      localStorage.setItem('user', JSON.stringify(data))
    } catch {
      logout()
    }
  }, [logout])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      loading,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
