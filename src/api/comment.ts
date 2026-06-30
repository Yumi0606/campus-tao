import client from './client'
import type { PageResult, CommentInfo, CommentRequest } from './types'

export const commentApi = {
  /**
   * 发表评论
   * 后端返回 Result<Long>，data 为新评论 ID
   */
  publish(data: CommentRequest): Promise<number> {
    return client.post('/api/comment', data)
  },

  /**
   * 删除评论
   * 后端返回 Result<Void>
   * @param commentId 评论 ID
   */
  remove(commentId: number): Promise<void> {
    return client.delete(`/api/comment/${commentId}`)
  },

  /**
   * 按帖子查询评论列表
   * 后端返回 Result<PageInfo<Comment>>
   * @param postId 帖子 ID
   * @param page 页码（从 1 开始），默认 1
   * @param size 每页条数，默认 10
   */
  listByPost(postId: number, page: number = 1, size: number = 10): Promise<PageResult<CommentInfo>> {
    return client.get('/api/comment/list', { params: { postId, page, size } })
  },
}
