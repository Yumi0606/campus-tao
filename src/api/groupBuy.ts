import client from './client'
import type { PageResult, GroupBuyInfo, GroupBuyRequest } from './types'

export const groupBuyApi = {
  /**
   * 发起拼团团购
   * @returns 新建的团购信息
   */
  create(data: GroupBuyRequest): Promise<GroupBuyInfo> {
    return client.post('/api/group-buy', data)
  },

  /**
   * 编辑团购（仅团长可操作）
   * @param groupBuyId 团购 ID
   */
  update(groupBuyId: number, data: GroupBuyRequest): Promise<GroupBuyInfo> {
    return client.put(`/api/group-buy/${groupBuyId}`, data)
  },

  /**
   * 删除团购（仅团长可操作）
   * @param groupBuyId 团购 ID
   */
  remove(groupBuyId: number): Promise<void> {
    return client.delete(`/api/group-buy/${groupBuyId}`)
  },

  /**
   * 获取团购详情
   * @param groupBuyId 团购 ID
   */
  detail(groupBuyId: number): Promise<GroupBuyInfo> {
    return client.get(`/api/group-buy/${groupBuyId}`)
  },

  /**
   * 分页查询团购列表
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   * @param category 分类筛选
   * @param status 状态筛选：0=进行中，1=已成团，2=已结束，3=已取消
   * @param keywords 搜索关键词列表
   * @param sortBy 排序字段
   * @param sortOrder 排序方向（0=升序，1=降序）
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
    },
  ): Promise<PageResult<GroupBuyInfo>> {
    return client.get('/api/group-buy/page', { params: { page, size, ...options } })
  },

  /**
   * 参与团购
   * @param groupBuyId 团购 ID
   */
  join(groupBuyId: number): Promise<void> {
    return client.post(`/api/group-buy/${groupBuyId}/join`)
  },

  /**
   * 取消参与团购
   * @param groupBuyId 团购 ID
   */
  cancelJoin(groupBuyId: number): Promise<void> {
    return client.post(`/api/group-buy/${groupBuyId}/cancel-join`)
  },
}
