import client from './client'
import type { PageResult, FavoriteInfo, FavoriteRequest } from './types'

export const favoriteApi = {
  /**
   * 添加收藏
   * @param targetType 收藏目标类型："item"=物品，"group_buy"=团购，"post"=帖子
   * @param targetId 收藏目标 ID
   */
  add(targetType: FavoriteRequest['targetType'], targetId: number): Promise<void> {
    return client.post('/api/favorite', { targetType, targetId })
  },

  /**
   * 取消收藏
   * @param targetType 收藏目标类型："item"=物品，"group_buy"=团购，"post"=帖子
   * @param targetId 收藏目标 ID
   */
  cancel(targetType: FavoriteRequest['targetType'], targetId: number): Promise<void> {
    return client.delete('/api/favorite', { data: { targetType, targetId } })
  },

  /**
   * 获取我的收藏列表
   * @param page 页码（从 1 开始），默认 1
   * @param size 每页条数，默认 10
   */
  myFavorites(page: number = 1, size: number = 10): Promise<PageResult<FavoriteInfo>> {
    return client.get('/api/favorite', { params: { page, size } })
  },
}
