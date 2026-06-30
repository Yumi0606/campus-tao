import client from './client'
import type { LikeRequest } from './types'

export const likeApi = {
  /**
   * 点赞
   * 后端返回 Result<String>，data 为提示信息如 "点赞成功"
   * @param targetType 点赞目标类型：大写枚举 "POST"/"COMMENT"
   * @param targetId 点赞目标 ID
   */
  like(targetType: LikeRequest['targetType'], targetId: number): Promise<string> {
    return client.post('/api/like', { targetType, targetId })
  },

  /**
   * 取消点赞
   * 后端返回 Result<String>，data 为提示信息如 "取消点赞成功"
   * @param targetType 点赞目标类型：大写枚举 "POST"/"COMMENT"
   * @param targetId 点赞目标 ID
   */
  unlike(targetType: LikeRequest['targetType'], targetId: number): Promise<string> {
    return client.delete('/api/like', { data: { targetType, targetId } })
  },
}
