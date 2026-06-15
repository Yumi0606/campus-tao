import { contacts, getMessagesByContactId, getContactById } from '@/mocks/chat'
import type { Message } from '@/mocks/types'

export function Chat() {
  const { contactId } = useParams()
  const navigate = useNavigate()
  const [selectedContact, setSelectedContact] = useState(contactId || '')
  const [messageText, setMessageText] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [mobileShowChat, setMobileShowChat] = useState(!!contactId)

  // 初始化消息
  useEffect(() => {
    if (selectedContact) {
      setMessages(getMessagesByContactId(selectedContact))
    }
  }, [selectedContact])

  // 路由变化时切换联系人
  useEffect(() => {
    if (contactId && contactId !== selectedContact) {
      setSelectedContact(contactId)
      setMobileShowChat(true)
    }
  }, [contactId])

  const currentContact = selectedContact ? getContactById(selectedContact) : null

  const handleSelectContact = (id: string) => {
    setSelectedContact(id)
    setMobileShowChat(true)
  }

  const handleSend = () => {
    if (!messageText.trim() || !selectedContact) return
    const newMsg: Message = {
      id: `m_new_${Date.now()}`,
      senderId: 'me',
      receiverId: selectedContact,
      content: messageText,
      createdAt: new Date().toLocaleString('zh-CN'),
      isRead: true,
    }
    setMessages([...messages, newMsg])
    setMessageText('')
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
          <div className="divide-y divide-secondary-100">
            {contacts.map((contact) => (
              <button key={contact.id}
                onClick={() => handleSelectContact(contact.id)}
                className={`w-full flex items-center gap-3 p-4 text-left transition-all duration-200 ${
                  selectedContact === contact.id
                    ? 'bg-primary-50'
                    : 'hover:bg-background-100'
                }`}>
                <div className="relative">
                  <img src={contact.avatar} alt={contact.name} loading="lazy" className="w-10 h-10 rounded-full" />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-background-50"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground-800 truncate">{contact.name}</span>
                    <span className="text-xs text-foreground-400 shrink-0 ml-2">{contact.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-foreground-400 truncate mt-0.5">{contact.lastMessage}</p>
                  {contact.sourceProduct && (
                    <p className="text-xs text-primary-500 truncate mt-0.5">关于：{contact.sourceProduct}</p>
                  )}
                </div>
                {contact.unreadCount > 0 && (
                  <span className="w-5 h-5 flex items-center justify-center bg-accent-500 text-white text-xs rounded-full shrink-0 font-medium">
                    {contact.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
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
                <img src={currentContact.avatar} alt={currentContact.name} loading="lazy" className="w-8 h-8 rounded-full" />
                <div>
                  <span className="text-sm font-medium text-foreground-800">{currentContact.name}</span>
                  {currentContact.isOnline && <span className="text-xs text-success ml-2">在线</span>}
                </div>
              </div>

              {/* 消息区 */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                  const isMe = msg.senderId === 'me'
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-primary-500 text-white rounded-br-md'
                          : 'bg-background-100 text-foreground-700 rounded-bl-md'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* 底部输入区 */}
              <div className="p-4 border-t border-secondary-200">
                <div className="flex gap-2">
                  <input type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-2.5 bg-background-100 rounded-xl border border-secondary-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none text-sm transition-all duration-200"
                    placeholder="输入消息..." />
                  <button onClick={handleSend} disabled={!messageText.trim()}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all duration-200 ${
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
            /* 未选择联系人：引导占位 */
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