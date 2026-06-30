import client from './client'
import type { PageResult, FavoriteInfo, FavoriteRequest } from './types'

export const favoriteApi = {
  /**
   * 添加收藏
   * 后端返回 Result<Long>，data 为收藏记录 ID
   * @param targetType 收藏目标类型：大写枚举 "ITEM"/"GROUP_BUY"/"POST"
   * @param targetId 收藏目标 ID
   */
  add(targetType: FavoriteRequest['targetType'], targetId: number): Promise<number> {
    return client.post('/api/favorite', { targetType, targetId })
  },

  /**
   * 取消收藏
   * 后端返回 Result<Void>
   * @param targetType 收藏目标类型：大写枚举 "ITEM"/"GROUP_BUY"/"POST"
   * @param targetId 收藏目标 ID
   */
  cancel(targetType: FavoriteRequest['targetType'], targetId: number): Promise<void> {
    return client.delete('/api/favorite', { data: { targetType, targetId } })
  },

  /**
   * 获取我的收藏列表
   * 后端返回 Result<PageInfo<Map<String, Object>>>，每条记录包含收藏信息 + target 目标详情
   * @param page 页码（从 1 开始），默认 1
   * @param size 每页条数，默认 10
   */
  myFavorites(page: number = 1, size: number = 10): Promise<PageResult<FavoriteInfo>> {
    return client.get('/api/favorite', { params: { page, size } })
  },
}
