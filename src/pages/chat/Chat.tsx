import { messageApi } from '@/api'
import { userApi } from '@/api'
import type { ConversationInfo, MessageInfo } from '@/api/types'
import { useAuth } from '@/components/base/Auth'
import { useToast } from '@/components/base/Toast'
import { SafeAvatar } from '@/components/base/FallbackImage'

/** 格式化消息时间：今天显示 HH:mm，昨天显示"昨天 HH:mm"，今年显示 M/D HH:mm，跨年显示 YYYY/M/D HH:mm */
function formatMessageTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`

  const isToday = date.toDateString() === now.toDateString()
  if (isToday) return time

  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const isYesterday = date.toDateString() === yesterday.toDateString()
  if (isYesterday) return `昨天 ${time}`

  const isThisYear = date.getFullYear() === now.getFullYear()
  if (isThisYear) return `${date.getMonth() + 1}/${date.getDate()} ${time}`

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${time}`
}

export function Chat() {
  const { contactId } = useParams()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [conversations, setConversations] = useState<ConversationInfo[]>([])
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    contactId ? Number(contactId) : null
  )
  const [messages, setMessages] = useState<MessageInfo[]>([])
  const [messageText, setMessageText] = useState('')
  const [mobileShowChat, setMobileShowChat] = useState(!!contactId)
  const [loadingConvos, setLoadingConvos] = useState(true)
  // 新会话：URL 指定了联系人但该联系人不在已有会话列表中
  const [newContact, setNewContact] = useState<ConversationInfo | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 消息变化时自动滚动消息容器到底部（不影响页面滚动）
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  // 加载会话列表
  useEffect(() => {
    messageApi.conversations()
      .then((data) => {
        setConversations(data)
        // 如果没有选中联系人且有会话，选第一个
        if (!selectedContactId && data.length > 0) {
          setSelectedContactId(data[0].contactId)
        }
      })
      .catch((e: unknown) => showToast(e instanceof Error ? e.message : '加载会话失败', 'error'))
      .finally(() => setLoadingConvos(false))
  }, [])

  // 当 URL 中有 contactId 但该联系人不在已有会话列表中时，获取用户信息构造虚拟联系人
  useEffect(() => {
    if (!selectedContactId) {
      setNewContact(null)
      return
    }
    // 检查是否已在会话列表中
    const exists = conversations.some((c) => c.contactId === selectedContactId)
    if (exists) {
      setNewContact(null)
      return
    }
    // 不在会话列表中，获取用户公开信息
    userApi.getPublicInfo(selectedContactId)
      .then((userInfo) => {
        const virtualContact: ConversationInfo = {
          contactId: userInfo.userId,
          nickname: userInfo.nickname || `用户${userInfo.userId}`,
          avatarUrl: userInfo.avatarUrl || '',
          lastMessage: '',
          lastMessageTime: '',
          unreadCount: 0,
        }
        setNewContact(virtualContact)
        setMobileShowChat(true)
      })
      .catch((e: unknown) => {
        showToast(e instanceof Error ? e.message : '获取用户信息失败', 'error')
        setNewContact(null)
      })
  }, [selectedContactId, conversations])

  // 选中联系人时加载消息
  useEffect(() => {
    if (!selectedContactId) return
    // 新会话（不在已有会话列表中）没有历史消息，跳过加载
    const exists = conversations.some((c) => c.contactId === selectedContactId)
    if (!exists) {
      setMessages([])
      return
    }
    messageApi.history(selectedContactId, 1, 100)
      .then((data) => {
        // 后端返回消息按 created_at DESC，前端需反转为升序（旧→新）以保证正确显示顺序
        const list = data?.list ?? []
        list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        setMessages(list)
        setMobileShowChat(true)
      })
      .catch((e: unknown) => showToast(e instanceof Error ? e.message : '加载消息失败', 'error'))
  }, [selectedContactId, conversations])

  // 路由变化时切换联系人
  useEffect(() => {
    if (contactId) {
      const id = Number(contactId)
      if (id !== selectedContactId) {
        setSelectedContactId(id)
      }
    }
  }, [contactId])

  // 合并已有会话和虚拟联系人
  const allContacts = newContact
    ? [newContact, ...conversations.filter((c) => c.contactId !== newContact.contactId)]
    : conversations

  const currentContact = allContacts.find((c) => c.contactId === selectedContactId)

  const handleSelectContact = async (id: number) => {
    setSelectedContactId(id)
    // 标记未读消息为已读
    const conv = conversations.find((c) => c.contactId === id)
    if (conv && conv.unreadCount > 0) {
      try {
        // 找到该会话中未读的消息并标记
        const data = await messageApi.history(id, 1, conv.unreadCount)
        data?.list
          ?.filter((m) => m.isRead === 0 && m.receiverId === user?.userId)
          .forEach((m) => messageApi.markRead(m.id))
      } catch (e: unknown) {
        showToast(e instanceof Error ? e.message : '标记已读失败', 'error')
      }
      // 更新本地未读数
      setConversations((prev) =>
        prev.map((c) => c.contactId === id ? { ...c, unreadCount: 0 } : c)
      )
    }
  }

  const handleSend = async () => {
    if (!messageText.trim() || !selectedContactId) return
    try {
      const newMsg = await messageApi.send({
        receiverId: selectedContactId,
        content: messageText,
      })
      setMessages([...messages, newMsg])
      setMessageText('')
      // 发送消息后刷新会话列表，使虚拟联系人变为真实会话
      messageApi.conversations()
        .then((data) => {
          setConversations(data)
          // 虚拟联系人已变为真实会话，清除虚拟状态
          setNewContact(null)
        })
        .catch(() => { /* 静默失败，不影响发送体验 */ })
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : '发送失败', 'error')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto flex h-[calc(100vh-128px)]">
        {/* 左栏：联系人列表 */}
        <div className={`w-80 lg:w-96 border-r border-secondary-200 overflow-y-auto shrink-0 ${
          mobileShowChat ? 'hidden md:block' : 'block'
        }`}>
          <div className="p-4 border-b border-secondary-200">
            <h2 className="text-base font-semibold text-foreground-800">消息</h2>
          </div>
          {loadingConvos ? (
            <div className="flex justify-center py-10">
              <i className="ri-loader-4-line text-2xl text-primary-500 animate-spin"></i>
            </div>
          ) : (
            <div className="divide-y divide-secondary-100">
              {allContacts.map((contact) => (
                <button key={contact.contactId}
                  onClick={() => handleSelectContact(contact.contactId)}
                  className={`w-full flex items-center gap-3 p-4 text-left transition-all duration-200 cursor-pointer ${
                    selectedContactId === contact.contactId
                      ? 'bg-primary-50'
                      : 'hover:bg-background-100'
                  }`}>
                  <div className="relative">
                    <SafeAvatar src={contact.avatarUrl} alt={contact.nickname} className="w-10 h-10 rounded-full" />
                    {contact.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-accent-500 text-white text-xs rounded-full shrink-0 font-medium">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground-800 truncate">{contact.nickname}</span>
                      <span className="text-xs text-foreground-400 shrink-0 ml-2">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-foreground-400 truncate mt-0.5">{contact.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 右栏：消息区 */}
        <div className={`flex-1 flex flex-col ${
          mobileShowChat ? 'flex' : 'hidden md:flex'
        }`}>
          {currentContact ? (
            <>
              {/* 顶部：聊天对象信息 */}
              <div className="flex items-center gap-3 p-4 border-b border-secondary-200">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-500 hover:bg-background-100 transition-all duration-200 cursor-pointer"
                  onClick={() => mobileShowChat ? setMobileShowChat(false) : navigate(-1)}>
                  <i className="ri-arrow-left-s-line text-lg"></i>
                </button>
                <SafeAvatar src={currentContact.avatarUrl} alt={currentContact.nickname} className="w-8 h-8 rounded-full" />
                <div>
                  <span className="text-sm font-medium text-foreground-800">{currentContact.nickname}</span>
                </div>
              </div>

              {/* 消息区 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => {
                  const isMe = msg.senderId === user?.userId
                  // 与上一条消息间隔超过 5 分钟时显示时间标签
                  const showTime = index === 0 || (() => {
                    const prev = messages[index - 1]
                    const diff = new Date(msg.createdAt).getTime() - new Date(prev.createdAt).getTime()
                    return diff > 5 * 60 * 1000
                  })()
                  return (
                    <div key={msg.id}>
                      {showTime && (
                        <div className="text-center text-xs text-foreground-400 my-2">
                          {formatMessageTime(msg.createdAt)}
                        </div>
                      )}
                      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                          isMe
                            ? 'bg-primary-500 text-white rounded-br-md'
                            : 'bg-background-100 text-foreground-700 rounded-bl-md'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* 底部输入区 */}
              <div className="p-4 border-t border-secondary-200">
                <div className="flex gap-2">
                  <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"
                    placeholder="输入消息..." />
                  <button onClick={handleSend} disabled={!messageText.trim()}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer ${
                      messageText.trim()
                        ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95'
                        : 'bg-secondary-200 text-foreground-400 cursor-not-allowed'
                    }`}>
                    <i className="ri-send-plane-fill"></i>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-20 h-20 flex items-center justify-center bg-background-200 rounded-2xl mb-4">
                <i className="ri-chat-3-line text-3xl text-secondary-400"></i>
              </div>
              <p className="text-foreground-500 font-medium">选择一条消息开始聊天</p>
              <p className="text-sm text-foreground-400 mt-1">从左侧联系人列表中选择</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
