import axios from 'axios'
import type { Result } from './types'

const client = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// 请求拦截器：自动注入 JWT Token
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器：解包 res.data.data，API 函数直接拿到业务数据
client.interceptors.response.use(
  (response) => {
    const result = response.data as Result<unknown>
    if (result.code !== 200) {
      return Promise.reject(new Error(result.message || '请求失败'))
    }
    // 直接返回业务数据，调用方无需再 .data.data
    return result.data as never
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.REACT_APP_NAVIGATE?.('/login')
    }
    return Promise.reject(error)
  },
)

export default client
