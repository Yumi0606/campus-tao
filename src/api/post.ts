import client from './client'
import type { PageResult, PostInfo, PostRequest } from './types'

export const postApi = {
  /**
   * 发布帖子
   * 后端返回 Result<Long>，data 为新帖子 ID
   */
  publish(data: PostRequest): Promise<number> {
    return client.post('/api/post', data)
  },

  /**
   * 编辑帖子
   * 后端返回 Result<Void>
   * @param postId 帖子 ID
   */
  update(postId: number, data: PostRequest): Promise<void> {
    return client.put(`/api/post/${postId}`, data)
  },

  /**
   * 删除帖子
   * 后端返回 Result<Void>
   * @param postId 帖子 ID
   */
  remove(postId: number): Promise<void> {
    return client.delete(`/api/post/${postId}`)
  },

  /**
   * 获取帖子详情
   * 后端返回 Result<Post>
   * @param postId 帖子 ID
   */
  detail(postId: number): Promise<PostInfo> {
    return client.get(`/api/post/${postId}`)
  },

  /**
   * 分页查询帖子列表
   * 后端返回 Result<PageInfo<Post>>
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   */
  page(
    page: number,
    size: number,
    options?: {
      board?: string
      keywords?: string[]
      sortBy?: string
      sortOrder?: number
      sortMode?: string
      mineOnly?: boolean
    },
  ): Promise<PageResult<PostInfo>> {
    return client.get('/api/post/page', { params: { page, size, ...options } })
  },
}
