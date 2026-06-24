import client from './client'
import type { PageResult, ItemInfo, ItemRequest } from './types'

export const itemApi = {
  /**
   * 发布二手物品
   * @returns 新建的物品信息
   */
  publish(data: ItemRequest): Promise<ItemInfo> {
    return client.post('/api/item', data)
  },

  /**
   * 编辑物品
   * @param itemId 物品 ID
   */
  update(itemId: number, data: ItemRequest): Promise<ItemInfo> {
    return client.put(`/api/item/${itemId}`, data)
  },

  /**
   * 删除物品
   * @param itemId 物品 ID
   */
  remove(itemId: number): Promise<void> {
    return client.delete(`/api/item/${itemId}`)
  },

  /**
   * 获取物品详情
   * @param itemId 物品 ID
   */
  detail(itemId: number): Promise<ItemInfo> {
    return client.get(`/api/item/${itemId}`)
  },

  /**
   * 分页查询物品列表
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   * @param category 分类筛选，如 "数码"、"书籍"
   * @param campus 校区筛选，如 "主校区"
   * @param minPrice 最低价格
   * @param maxPrice 最高价格
   * @param keywords 搜索关键词列表
   * @param sortBy 排序字段
   * @param sortOrder 排序方向（0=升序，1=降序）
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
    },
  ): Promise<PageResult<ItemInfo>> {
    return client.get('/api/item/page', { params: { page, size, ...options } })
  },

  /**
   * 下架物品
   * @param itemId 物品 ID
   */
  offShelf(itemId: number): Promise<void> {
    return client.put(`/api/item/${itemId}/off-shelf`)
  },

  /**
   * 标记物品已售出
   * @param itemId 物品 ID
   * @param quantity 购买数量，默认 1
   */
  buy(itemId: number, quantity: number = 1): Promise<void> {
    return client.post(`/api/item/${itemId}/buy/${quantity}`)
  },
}
