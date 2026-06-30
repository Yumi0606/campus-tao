import axios from 'axios'
import type { Result } from './types'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

/**
 * 尝试将 JSON 字符串解析为数组，已经是数组的直接返回
 * 后端 images/keywords 字段可能返回 "[]" 字符串而非真正的数组
 */
function parseJsonField(value: unknown): unknown[] {
  if (Array.isArray(value)) return value
  if (typeof value === 'string') {
    try { const parsed = JSON.parse(value); return Array.isArray(parsed) ? parsed : [] }
    catch { return [] }
  }
  return []
}

/**
 * 规范化后端返回的对象数据，将字符串类型的 images/keywords 解析为数组
 * 适用于 Item、GroupBuy、Post 等实体
 */
function normalizeEntity(item: unknown): unknown {
  if (!item || typeof item !== 'object') return item
  const obj = item as Record<string, unknown>
  if ('images' in obj) obj.images = parseJsonField(obj.images)
  if ('keywords' in obj) obj.keywords = parseJsonField(obj.keywords)
  return obj
}

/**
 * 递归规范化响应数据中的实体字段
 * 处理分页列表中的 list 项和单个实体对象
 */
function normalizeData(data: unknown): unknown {
  if (data === null || data === undefined) return data
  if (typeof data !== 'object') return data
  const obj = data as Record<string, unknown>

  // 数组结构：逐项规范化（如会话列表）
  if (Array.isArray(obj)) {
    return obj.map(normalizeEntity)
  }

  // 分页结构：{ list: [...] }
  if ('list' in obj && Array.isArray(obj.list)) {
    obj.list = obj.list.map(normalizeEntity)
    return data
  }

  // 单个实体对象（详情接口），统一规范化 images/keywords
  normalizeEntity(obj)
  return data
}

// 响应拦截器：解包 res.data.data，API 函数直接拿到业务数据
client.interceptors.response.use(
  (response) => {
    const result = response.data as Result<unknown>
    if (result.code !== 200) {
      return Promise.reject(new Error(result.message || '请求失败'))
    }
    // 规范化数据（解析 JSON 字符串字段等），然后直接返回业务数据
    return normalizeData(result.data) as never
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.REACT_APP_NAVIGATE?.('/login')
    }
    // 提取后端返回的错误信息，避免只显示 axios 默认的 "Request failed with status code xxx"
    const msg =
      error.response?.data?.message ||
      error.message ||
      '网络请求失败'
    return Promise.reject(new Error(msg))
  },
)

export default client
