import client from './client'
import type { PageResult, PostInfo, PostRequest } from './types'

export const postApi = {
  /**
   * 发布帖子
   * @returns 新建的帖子信息
   */
  publish(data: PostRequest): Promise<PostInfo> {
    return client.post('/api/post', data)
  },

  /**
   * 编辑帖子
   * @param postId 帖子 ID
   */
  update(postId: number, data: PostRequest): Promise<PostInfo> {
    return client.put(`/api/post/${postId}`, data)
  },

  /**
   * 删除帖子
   * @param postId 帖子 ID
   */
  remove(postId: number): Promise<void> {
    return client.delete(`/api/post/${postId}`)
  },

  /**
   * 获取帖子详情
   * @param postId 帖子 ID
   */
  detail(postId: number): Promise<PostInfo> {
    return client.get(`/api/post/${postId}`)
  },

  /**
   * 分页查询帖子列表
   * @param page 页码（从 1 开始）
   * @param size 每页条数
   * @param board 板块筛选，如 "求助"、"二手"、"生活"
   * @param keywords 搜索关键词列表
   * @param sortBy 排序字段
   * @param sortOrder 排序方向（0=升序，1=降序）
   * @param sortMode 排序模式，如 "hot"=热门、"latest"=最新
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
    },
  ): Promise<PageResult<PostInfo>> {
    return client.get('/api/post/page', { params: { page, size, ...options } })
  },
}
