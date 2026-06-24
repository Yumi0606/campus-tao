import client from './client'
import type { LikeRequest } from './types'

export const likeApi = {
  /**
   * 点赞
   * @param targetType 点赞目标类型："post"=帖子，"comment"=评论
   * @param targetId 点赞目标 ID
   */
  like(targetType: LikeRequest['targetType'], targetId: number): Promise<void> {
    return client.post('/api/like', { targetType, targetId })
  },

  /**
   * 取消点赞
   * @param targetType 点赞目标类型："post"=帖子，"comment"=评论
   * @param targetId 点赞目标 ID
   */
  unlike(targetType: LikeRequest['targetType'], targetId: number): Promise<void> {
    return client.delete('/api/like', { data: { targetType, targetId } })
  },
}
