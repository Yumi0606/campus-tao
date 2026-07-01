import client from './client'
import type { PageResult, GroupBuyInfo, GroupBuyRequest } from './types'

export const groupBuyApi = {
  /**
   * 发起拼团团购
   * 后端返回 Result<Void>
   */
  create(data: GroupBuyRequest): Promise<void> {
    return client.post('/api/group-buy', data)
  },

  /**
   * 编辑团购（仅团长可操作）
   * 后端返回 Result<Void>
   * @param groupBuyId 团购 ID
   */
  update(groupBuyId: number, data: GroupBuyRequest): Promise<void> {
    return client.put(`/api/group-buy/${groupBuyId}`, data)
  },

  /**
   * 删除团购（仅团长可操作）
   * 后端返回 Result<Void>
   * @param groupBuyId 团购 ID
   */
  remove(groupBuyId: number): Promise<void> {
    return client.delete(`/api/group-buy/${groupBuyId}`)
  },

  /**
   * 获取团购详情
   * 后端返回 Result<GroupBuy>
   * @param groupBuyId 团购 ID
   */
  detail(groupBuyId: number): Promise<GroupBuyInfo> {
    return client.get(`/api/group-buy/${groupBuyId}`)
  },

  /**
   * 分页查询团购列表
   * 后端返回 Result<PageInfo<GroupBuy>>
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   */
  page(
    page: number,
    size: number,
    options?: {
      category?: string
      status?: number
      keywords?: string[]
      sortBy?: string
      sortOrder?: number
      mineOnly?: boolean
    },
  ): Promise<PageResult<GroupBuyInfo>> {
    return client.get('/api/group-buy/page', { params: { page, size, ...options } })
  },

  /**
   * 参与团购
   * 后端返回 Result<Void>
   * @param groupBuyId 团购 ID
   */
  join(groupBuyId: number): Promise<void> {
    return client.post(`/api/group-buy/${groupBuyId}/join`)
  },

  /**
   * 取消参与团购
   * 后端返回 Result<Void>
   * @param groupBuyId 团购 ID
   */
  cancelJoin(groupBuyId: number): Promise<void> {
    return client.post(`/api/group-buy/${groupBuyId}/cancel-join`)
  },
}
