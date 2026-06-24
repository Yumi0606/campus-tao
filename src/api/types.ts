/* ========================================
   API 类型定义 — 与后端 DTO / Entity 对齐
   每个字段都有 JSDoc 中文注释，IDE 悬停即可阅读
   ======================================== */

// ---- 通用响应 ----

/** 后端统一响应结构 */
export interface Result<T> {
  /** 状态码，200 表示成功 */
  code: number
  /** 提示信息 */
  message: string
  /** 业务数据 */
  data: T
}

/** 分页响应结构 */
export interface PageResult<T> {
  /** 总记录数 */
  total: number
  /** 总页数 */
  pages: number
  /** 当前页码（从 1 开始） */
  page: number
  /** 每页条数 */
  size: number
  /** 当前页数据列表 */
  records: T[]
}

// ---- 用户模块 ----

/** 注册请求 */
export interface RegisterRequest {
  /** 用户名 */
  username: string
  /** 手机号 */
  phone: string
  /** 密码 */
  password: string
  /** 邮箱（可选） */
  email?: string
}

/** 登录请求 */
export interface LoginRequest {
  /** 用户名或手机号 */
  account: string
  /** 密码 */
  password: string
}

/** 登录/注册成功返回 */
export interface LoginResult {
  /** JWT Token，后续请求需放入 Authorization: Bearer <token> */
  token: string
  /** 用户 ID */
  userId: number
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname: string
}

/** 用户信息 */
export interface UserInfo {
  /** 用户 ID */
  id: number
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname: string
  /** 手机号 */
  phone: string
  /** 邮箱 */
  email: string
  /** 头像 URL */
  avatarUrl: string
  /** 所在校区，如 "主校区"、"南校区" */
  campus: string
  /** 联系方式（微信/QQ 等） */
  contactInfo: string
  /** 学生证照片 URL */
  studentCardUrl: string
  /** 是否已通过学生认证 */
  studentVerified: boolean
  /** 信用评分（0-5） */
  rating: number
  /** 完成交易数 */
  tradeCount: number
  /** 发布商品数 */
  publishCount: number
  /** 参与拼团数 */
  groupBuyCount: number
  /** 注册时间 */
  createdAt: string
}

/** 修改个人信息请求（所有字段可选，只传需要修改的） */
export interface UserUpdateRequest {
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 头像 URL（需先通过 fileApi.upload 上传获取） */
  avatarUrl?: string
  /** 所在校区 */
  campus?: string
  /** 联系方式 */
  contactInfo?: string
  /** 旧密码（修改密码时必填） */
  oldPassword?: string
  /** 新密码（修改密码时必填） */
  newPassword?: string
  /** 学生证照片 URL（需先通过 fileApi.upload 上传获取） */
  studentCardUrl?: string
}

// ---- 二手物品模块 ----

/** 发布/编辑物品请求 */
export interface ItemRequest {
  /** 物品名称 */
  name: string
  /** 售价（元） */
  price: number
  /** 数量 */
  quantity: number
  /** 物品描述 */
  description?: string
  /** 分类，如 "数码"、"书籍" */
  category?: string
  /** 所在校区 */
  campus?: string
  /** 图片 URL 列表（需先通过 fileApi.upload 上传获取） */
  images?: string[]
  /** 关键词列表，如 ["手机", "华为"]，用于搜索匹配 */
  keywords?: string[]
}

/** 物品信息 */
export interface ItemInfo {
  /** 物品 ID */
  id: number
  /** 发布者用户 ID */
  userId: number
  /** 物品名称 */
  name: string
  /** 售价（元） */
  price: number
  /** 原价（元） */
  originalPrice: number
  /** 数量 */
  quantity: number
  /** 物品描述 */
  description: string
  /** 分类 */
  category: string
  /** 所在校区 */
  campus: string
  /** 图片 URL 列表 */
  images: string[]
  /** 关键词列表 */
  keywords: string[]
  /** 状态：0=在售，1=已下架，2=已售出 */
  status: number
  /** 浏览次数 */
  views: number
  /** 收藏数 */
  likes: number
  /** 发布时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 卖家信息 */
  seller: UserInfo
}

// ---- 拼团团购模块 ----

/** 发起/编辑团购请求 */
export interface GroupBuyRequest {
  /** 团购名称 */
  name: string
  /** 原价（元） */
  originalPrice: number
  /** 团购价（元） */
  discountPrice: number
  /** 成团最少人数 */
  minPeople: number
  /** 可购数量 */
  quantity: number
  /** 截止时间，ISO 8601 格式，如 "2026-07-01T23:59:59" */
  endTime: string
  /** 团购说明 */
  description?: string
  /** 分类 */
  category?: string
  /** 图片 URL 列表（需先通过 fileApi.upload 上传获取） */
  images?: string[]
  /** 关键词列表 */
  keywords?: string[]
}

/** 团购信息 */
export interface GroupBuyInfo {
  /** 团购 ID */
  id: number
  /** 发起者用户 ID */
  userId: number
  /** 团购名称 */
  name: string
  /** 原价（元） */
  originalPrice: number
  /** 团购价（元） */
  discountPrice: number
  /** 成团最少人数 */
  minPeople: number
  /** 当前已参团人数 */
  currentPeople: number
  /** 可购数量 */
  quantity: number
  /** 截止时间 */
  endTime: string
  /** 团购说明 */
  description: string
  /** 分类 */
  category: string
  /** 图片 URL 列表 */
  images: string[]
  /** 关键词列表 */
  keywords: string[]
  /** 状态：0=进行中，1=已成团，2=已结束，3=已取消 */
  status: number
  /** 浏览次数 */
  views: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 团长信息 */
  initiator: UserInfo
  /** 参团成员列表 */
  participants: GroupBuyParticipant[]
}

/** 团购参与成员 */
export interface GroupBuyParticipant {
  /** 记录 ID */
  id: number
  /** 团购 ID */
  groupBuyId: number
  /** 用户 ID */
  userId: number
  /** 用户名 */
  username: string
  /** 用户头像 URL */
  avatarUrl: string
  /** 参团时间 */
  joinedAt: string
}

// ---- 论坛帖子模块 ----

/** 发帖/编辑帖子请求 */
export interface PostRequest {
  /** 帖子标题 */
  title: string
  /** 帖子正文 */
  content: string
  /** 板块，如 "求助"、"二手"、"生活" */
  board?: string
  /** 图片 URL 列表（需先通过 fileApi.upload 上传获取） */
  images?: string[]
}

/** 帖子信息 */
export interface PostInfo {
  /** 帖子 ID */
  id: number
  /** 作者用户 ID */
  userId: number
  /** 帖子标题 */
  title: string
  /** 帖子正文 */
  content: string
  /** 所属板块 */
  board: string
  /** 图片 URL 列表 */
  images: string[]
  /** 浏览次数 */
  views: number
  /** 点赞数 */
  likes: number
  /** 评论数 */
  commentCount: number
  /** 是否置顶 */
  isPinned: boolean
  /** 发布时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 作者信息 */
  author: UserInfo
}

// ---- 评论模块 ----

/** 发表评论请求 */
export interface CommentRequest {
  /** 评论所属帖子 ID */
  postId: number
  /** 评论内容 */
  content: string
  /** 父评论 ID（回复评论时传入，顶级评论不传） */
  parentId?: number
}

/** 评论信息 */
export interface CommentInfo {
  /** 评论 ID */
  id: number
  /** 所属帖子 ID */
  postId: number
  /** 评论者用户 ID */
  userId: number
  /** 父评论 ID，顶级评论为 null */
  parentId: number | null
  /** 评论内容 */
  content: string
  /** 点赞数 */
  likes: number
  /** 评论时间 */
  createdAt: string
  /** 评论者信息 */
  author: UserInfo
  /** 子评论列表（二级回复） */
  children?: CommentInfo[]
}

// ---- 私信模块 ----

/** 发送消息请求 */
export interface MessageRequest {
  /** 接收者用户 ID */
  receiverId: number
  /** 消息内容 */
  content: string
  /** 关联物品 ID（从物品详情页发起私聊时传入） */
  relatedItemId?: number
  /** 关联团购 ID（从团购详情页发起私聊时传入） */
  relatedGroupBuyId?: number
}

/** 消息信息 */
export interface MessageInfo {
  /** 消息 ID */
  id: number
  /** 发送者用户 ID */
  senderId: number
  /** 接收者用户 ID */
  receiverId: number
  /** 消息内容 */
  content: string
  /** 关联物品 ID，无关联时为 null */
  relatedItemId: number | null
  /** 关联团购 ID，无关联时为 null */
  relatedGroupBuyId: number | null
  /** 是否已读 */
  isRead: boolean
  /** 发送时间 */
  createdAt: string
}

/** 会话信息 */
export interface ConversationInfo {
  /** 对方用户 ID */
  contactId: number
  /** 对方用户名 */
  contactName: string
  /** 对方头像 URL */
  contactAvatar: string
  /** 最后一条消息内容 */
  lastMessage: string
  /** 最后一条消息时间 */
  lastMessageTime: string
  /** 未读消息数 */
  unreadCount: number
  /** 关联物品，无关联时为 null */
  relatedItem: { id: number; name: string } | null
  /** 关联团购，无关联时为 null */
  relatedGroupBuy: { id: number; name: string } | null
}

// ---- 收藏模块 ----

/** 收藏/取消收藏请求 */
export interface FavoriteRequest {
  /** 收藏目标类型："item"=物品，"group_buy"=团购，"post"=帖子 */
  targetType: 'item' | 'group_buy' | 'post'
  /** 收藏目标 ID */
  targetId: number
}

/** 收藏记录 */
export interface FavoriteInfo {
  /** 收藏记录 ID */
  id: number
  /** 用户 ID */
  userId: number
  /** 收藏目标类型 */
  targetType: string
  /** 收藏目标 ID */
  targetId: number
  /** 收藏时间 */
  createdAt: string
  /** 收藏的目标对象详情 */
  target: ItemInfo | GroupBuyInfo | PostInfo
}

// ---- 点赞模块 ----

/** 点赞/取消点赞请求 */
export interface LikeRequest {
  /** 点赞目标类型："post"=帖子，"comment"=评论 */
  targetType: 'post' | 'comment'
  /** 点赞目标 ID */
  targetId: number
}
