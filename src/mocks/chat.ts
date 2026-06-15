import type { Contact, Message } from './types'

// 联系人列表
export const contacts: Contact[] = [
  {
    id: 'c1',
    name: '阿杰学长',
    avatar: 'https://i.pravatar.cc/100?img=3',
    isOnline: true,
    lastMessage: '椅子还在，周末有空来看吗？',
    lastMessageTime: '10:30',
    sourceProduct: '人体工学电脑椅',
    unreadCount: 2,
  },
  {
    id: 'c2',
    name: '设计师小陈',
    avatar: 'https://i.pravatar.cc/100?img=5',
    isOnline: false,
    lastMessage: '好的，那你先看看，有需要再联系',
    lastMessageTime: '昨天',
    sourceProduct: 'iPad Air 5 256GB',
    unreadCount: 0,
  },
  {
    id: 'c3',
    name: '吃货团长',
    avatar: 'https://i.pravatar.cc/100?img=8',
    isOnline: true,
    lastMessage: '拼团还差4个人就成团了，帮忙拉一下朋友呀~',
    lastMessageTime: '09:15',
    sourceProduct: '坚果大礼包拼团',
    unreadCount: 1,
  },
  {
    id: 'c4',
    name: '吉他社社长',
    avatar: 'https://i.pravatar.cc/100?img=7',
    isOnline: false,
    lastMessage: '吉他可以试弹，下午有空吗？',
    lastMessageTime: '周一',
    sourceProduct: '雅马哈F310吉他',
    unreadCount: 0,
  },
  {
    id: 'c5',
    name: '课代表小明',
    avatar: 'https://i.pravatar.cc/100?img=14',
    isOnline: true,
    lastMessage: '选课攻略帖子里有更详细的版本，需要的话我发你',
    lastMessageTime: '08:45',
    sourceProduct: '',
    unreadCount: 0,
  },
]

// 消息记录
export const messages: Message[] = [
  // 与 c1 的消息
  {
    id: 'm1',
    senderId: 'c1',
    receiverId: 'me',
    content: '你好，看到你对椅子感兴趣？',
    createdAt: '2024-01-15 10:00',
    isRead: true,
  },
  {
    id: 'm2',
    senderId: 'me',
    receiverId: 'c1',
    content: '是的，请问椅子还在吗？成色怎么样？',
    createdAt: '2024-01-15 10:05',
    isRead: true,
  },
  {
    id: 'm3',
    senderId: 'c1',
    receiverId: 'me',
    content: '在的，使用了一年多，升降和后仰都正常，网布也保护的不错，没有破损',
    createdAt: '2024-01-15 10:08',
    isRead: true,
  },
  {
    id: 'm4',
    senderId: 'me',
    receiverId: 'c1',
    content: '那价格还能便宜点吗？',
    createdAt: '2024-01-15 10:10',
    isRead: true,
  },
  {
    id: 'm5',
    senderId: 'c1',
    receiverId: 'me',
    content: '350最低了，确实很好用，你来看了就知道了',
    createdAt: '2024-01-15 10:12',
    isRead: true,
  },
  {
    id: 'm6',
    senderId: 'c1',
    receiverId: 'me',
    content: '椅子还在，周末有空来看吗？',
    createdAt: '2024-01-15 10:30',
    isRead: false,
  },
  // 与 c3 的消息
  {
    id: 'm7',
    senderId: 'c3',
    receiverId: 'me',
    content: '欢迎加入坚果拼团！',
    createdAt: '2024-01-15 09:00',
    isRead: true,
  },
  {
    id: 'm8',
    senderId: 'me',
    receiverId: 'c3',
    content: '谢谢，请问什么时候能成团呢？',
    createdAt: '2024-01-15 09:10',
    isRead: true,
  },
  {
    id: 'm9',
    senderId: 'c3',
    receiverId: 'me',
    content: '拼团还差4个人就成团了，帮忙拉一下朋友呀~',
    createdAt: '2024-01-15 09:15',
    isRead: false,
  },
]

// 获取联系人消息
export const getMessagesByContactId = (contactId: string): Message[] => {
  return messages.filter(
    (m) => (m.senderId === contactId && m.receiverId === 'me') || (m.senderId === 'me' && m.receiverId === contactId)
  )
}

// 获取联系人信息
export const getContactById = (id: string): Contact | undefined => {
  return contacts.find((c) => c.id === id)
}