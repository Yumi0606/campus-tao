import client from './client'
import type { PageResult, MessageInfo, ConversationInfo, MessageRequest } from './types'

export const messageApi = {
  /**
   * 发送私信
   * @returns 新建的消息信息
   */
  send(data: MessageRequest): Promise<MessageInfo> {
    return client.post('/api/message', data)
  },

  /** 获取当前用户的所有会话列表 */
  conversations(): Promise<ConversationInfo[]> {
    return client.get('/api/message/conversations')
  },

  /**
   * 获取与某用户的聊天记录
   * @param contactId 对方用户 ID
   * @param page 页码（从 1 开始），默认 1
   * @param size 每页条数，默认 20
   */
  history(contactId: number, page: number = 1, size: number = 20): Promise<PageResult<MessageInfo>> {
    return client.get('/api/message/history', { params: { contactId, page, size } })
  },

  /**
   * 标记消息为已读
   * @param messageId 消息 ID
   */
  markRead(messageId: number): Promise<void> {
    return client.put(`/api/message/${messageId}/read`)
  },
}
