import { useRoutes, useNavigate } from 'react-router-dom'
import { routes } from './config'

// 全局导航函数，供外部调用
declare global {
  interface Window {
    REACT_APP_NAVIGATE: (path: string) => void
  }
}

export function AppRoutes() {
  const navigate = useNavigate()

  // 暴露导航函数到全局
  window.REACT_APP_NAVIGATE = (path: string) => {
    navigate(path)
  }

  return useRoutes(routes)
}

// 导出路由配置
export { routes } from './config'