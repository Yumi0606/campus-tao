import client from './client'
import type { PageResult, CommentInfo, CommentRequest } from './types'

export const commentApi = {
  /**
   * 发表评论
   * @returns 新建的评论信息
   */
  publish(data: CommentRequest): Promise<CommentInfo> {
    return client.post('/api/comment', data)
  },

  /**
   * 删除评论
   * @param commentId 评论 ID
   */
  remove(commentId: number): Promise<void> {
    return client.delete(`/api/comment/${commentId}`)
  },

  /**
   * 按帖子查询评论列表
   * @param postId 帖子 ID
   * @param page 页码（从 1 开始），默认 1
   * @param size 每页条数，默认 10
   */
  listByPost(postId: number, page: number = 1, size: number = 10): Promise<PageResult<CommentInfo>> {
    return client.get('/api/comment/list', { params: { postId, page, size } })
  },
}
