import client from './client'
import type { PageResult, ItemInfo, ItemRequest } from './types'

export const itemApi = {
  /**
   * 发布二手物品
   * 后端返回 Result<Void>
   */
  publish(data: ItemRequest): Promise<void> {
    return client.post('/api/item', data)
  },

  /**
   * 编辑物品
   * 后端返回 Result<Void>
   * @param itemId 物品 ID
   */
  update(itemId: number, data: ItemRequest): Promise<void> {
    return client.put(`/api/item/${itemId}`, data)
  },

  /**
   * 删除物品
   * 后端返回 Result<Void>
   * @param itemId 物品 ID
   */
  remove(itemId: number): Promise<void> {
    return client.delete(`/api/item/${itemId}`)
  },

  /**
   * 获取物品详情
   * 后端返回 Result<Item>
   * @param itemId 物品 ID
   */
  detail(itemId: number): Promise<ItemInfo> {
    return client.get(`/api/item/${itemId}`)
  },

  /**
   * 分页查询物品列表
   * 后端返回 Result<PageInfo<Item>>
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   */
  page(
    page: number,
    size: number,
    options?: {
      category?: string
      campus?: string
      minPrice?: string
      maxPrice?: string
      keywords?: string[]
      sortBy?: string
      sortOrder?: number
      mineOnly?: boolean
    },
  ): Promise<PageResult<ItemInfo>> {
    return client.get('/api/item/page', { params: { page, size, ...options } })
  },

  /**
   * 下架物品
   * 后端返回 Result<Void>
   * @param itemId 物品 ID
   */
  offShelf(itemId: number): Promise<void> {
    return client.put(`/api/item/${itemId}/off-shelf`)
  },

  /**
   * 购买物品
   * 后端返回 Result<Void>
   * @param itemId 物品 ID
   * @param quantity 购买数量，默认 1
   */
  buy(itemId: number, quantity: number = 1): Promise<void> {
    return client.post(`/api/item/${itemId}/buy/${quantity}`)
  },
}
