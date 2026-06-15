// 类型定义

// 用户基础信息
export interface User {
  id: string
  name: string
  avatar: string
  rating: number
  campus?: string
  department?: string
  grade?: string
  isVerified?: boolean
}

// 二手商品
export interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number
  category: string
  image: string
  seller: User
  status: 'available' | 'sold'
  campus: string
  postedAt: string
  views: number
  likes: number
}

// 拼团
export interface GroupBuy {
  id: string
  title: string
  description: string
  originalPrice: number
  groupPrice: number
  minMembers: number
  currentMembers: number
  image: string
  initiator: User
  status: 'ongoing' | 'completed' | 'ended'
  deadline: string
  pickupLocation: string
  createdAt: string
  views: number
}

// 论坛帖子
export interface Post {
  id: string
  title: string
  content: string
  category: string
  author: User
  likes: number
  comments: number
  isPinned: boolean
  hasAttachment: boolean
  postedAt: string
  tags: string[]
  views: number
}

// 评论
export interface Comment {
  id: string
  postId: string
  author: User
  content: string
  likes: number
  createdAt: string
}

// 个人中心 - 我的发布
export interface MyProduct {
  id: string
  title: string
  image: string
  price: number
  status: 'available' | 'sold'
  views: number
  postedAt: string
}

// 个人中心 - 我的收藏
export interface MyFavorite {
  id: string
  productId: string
  title: string
  image: string
  price: number
  seller: User
  postedAt: string
}

// 个人中心 - 交易记录
export interface TradeRecord {
  id: string
  type: 'buy' | 'sell'
  productName: string
  date: string
  price: number
  counterparty: User
  rating: number
}

// 个人中心 - 我的拼团
export interface MyGroupBuy {
  id: string
  groupBuyId: string
  title: string
  role: 'leader' | 'member'
  status: 'ongoing' | 'completed' | 'ended'
  price: number
  joinedAt: string
}

// 个人中心 - 评价
export interface Review {
  id: string
  reviewer: User
  date: string
  productName: string
  rating: number
  content: string
}

// 用户资料
export interface UserProfile {
  id: string
  name: string
  avatar: string
  campus: string
  department: string
  grade: string
  bio: string
  wechat: string
  qq: string
  rating: number
  tradeCount: number
  publishCount: number
  groupBuyCount: number
}

// 聊天 - 联系人
export interface Contact {
  id: string
  name: string
  avatar: string
  isOnline: boolean
  lastMessage: string
  lastMessageTime: string
  sourceProduct?: string
  unreadCount: number
}

// 聊天 - 消息
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  isRead: boolean
}
