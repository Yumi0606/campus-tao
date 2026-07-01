/* ========================================
   API 类型定义 — 与后端 Swagger 文档严格对齐
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

/** 分页响应结构（与后端 PageInfo 对齐） */
export interface PageResult<T> {
  /** 总记录数 */
  total: number
  /** 总页数 */
  pages: number
  /** 当前页码（从 1 开始） */
  pageNum: number
  /** 每页条数 */
  pageSize: number
  /** 当前页实际记录数 */
  size: number
  /** 当前页数据列表 */
  list: T[]
  /** 起始行号 */
  startRow: number
  /** 结束行号 */
  endRow: number
  /** 上一页页码 */
  prePage: number
  /** 下一页页码 */
  nextPage: number
  /** 是否第一页 */
  isFirstPage: boolean
  /** 是否最后一页 */
  isLastPage: boolean
  /** 是否有上一页 */
  hasPreviousPage: boolean
  /** 是否有下一页 */
  hasNextPage: boolean
  /** 导航页码数 */
  navigatePages: number
  /** 导航页码列表 */
  navigatepageNums: number[]
  /** 导航首页 */
  navigateFirstPage: number
  /** 导航末页 */
  navigateLastPage: number
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

/** 登录/注册成功返回（后端 LoginResponse） */
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

/** 用户信息（与后端 UserInfoResponse 对齐） */
export interface UserInfo {
  /** 用户 ID（后端字段名 userId） */
  userId: number
  /** 用户名 */
  username: string
  /** 手机号 */
  phone: string
  /** 邮箱 */
  email: string
  /** 昵称 */
  nickname: string
  /** 头像 URL */
  avatarUrl: string
  /** 所在校区 */
  campus: string
  /** 联系方式 */
  contactInfo: string
  /** 学生证照片 URL */
  studentCardUrl: string
  /** 是否已通过学生认证：0=未验证，1=已验证，2=审核中 */
  isVerified: number
  /** 账号状态：0=禁用，1=正常 */
  status: number
  /** 注册时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
  /** 完成交易数 */
  completedTransactions: number
  /** 发布商品数 */
  publishedItems: number
  /** 参与拼团数 */
  joinedGroupBuys: number
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

/** 物品信息（与后端 Item 实体对齐） */
export interface ItemInfo {
  /** 物品 ID */
  id: number
  /** 发布者用户 ID */
  sellerId: number
  /** 物品名称 */
  name: string
  /** 售价（元） */
  price: number
  /** 数量 */
  quantity: number
  /** 物品描述 */
  description: string
  /** 分类 */
  category: string
  /** 所在校区 */
  campus: string
  /** 图片 URL 列表（后端返回 JSON 字符串，client 拦截器会自动解析为数组） */
  images: string[]
  /** 关键词列表（后端返回 JSON 字符串，client 拦截器会自动解析为数组） */
  keywords: string[]
  /** 状态：0=在售，1=已售，2=下架 */
  status: number
  /** 浏览次数 */
  viewCount: number
  /** 售出时间 */
  soldAt: string | null
  /** 发布时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
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

/** 团购信息（与后端 GroupBuy 实体对齐） */
export interface GroupBuyInfo {
  /** 团购 ID */
  id: number
  /** 发起者用户 ID（后端字段名 initiatorId） */
  initiatorId: number
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
  /** 图片 URL 列表（后端返回 JSON 字符串，client 拦截器会自动解析为数组） */
  images: string[]
  /** 关键词列表（后端返回 JSON 字符串，client 拦截器会自动解析为数组） */
  keywords: string[]
  /** 状态：0=进行中，1=已成团，2=已结束 */
  status: number
  /** 浏览次数 */
  viewCount: number
  /** 创建时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
}

/** 团购参与成员（与后端 GroupBuyParticipant 实体对齐） */
export interface GroupBuyParticipant {
  /** 记录 ID */
  id: number
  /** 团购 ID */
  groupBuyId: number
  /** 用户 ID */
  userId: number
  /** 数量 */
  quantity: number
  /** 状态：0=已报名，1=已取消 */
  status: number
  /** 取消时间 */
  cancelledAt: string | null
  /** 创建时间 */
  createdAt: string
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

/** 帖子信息（与后端 Post 实体对齐） */
export interface PostInfo {
  /** 帖子 ID */
  id: number
  /** 作者用户 ID（后端字段名 authorId） */
  authorId: number
  /** 帖子标题 */
  title: string
  /** 帖子正文 */
  content: string
  /** 图片 URL 列表（后端返回 JSON 字符串，client 拦截器会自动解析为数组） */
  images: string[]
  /** 所属板块 */
  board: string
  /** 状态：0=已删除，1=正常 */
  status: number
  /** 点赞数（后端字段名 likeCount） */
  likeCount: number
  /** 评论数 */
  commentCount: number
  /** 浏览次数（后端字段名 viewCount） */
  viewCount: number
  /** 是否置顶：0=否，1=是（后端字段名 isTop） */
  isTop: number
  /** 发布时间 */
  createdAt: string
  /** 更新时间 */
  updatedAt: string
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

/** 评论信息（与后端 Comment 实体对齐） */
export interface CommentInfo {
  /** 评论 ID */
  id: number
  /** 所属帖子 ID */
  postId: number
  /** 评论者用户 ID（后端字段名 authorId） */
  authorId: number
  /** 父评论 ID，顶级评论为 null */
  parentId: number | null
  /** 评论内容 */
  content: string
  /** 点赞数（后端字段名 likeCount） */
  likeCount: number
  /** 状态：0=已删除，1=正常 */
  status: number
  /** 评论时间 */
  createdAt: string
  /** 子评论列表（后端字段名 replies） */
  replies: CommentInfo[]
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

/** 消息信息（与后端 Message 实体对齐） */
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
  /** 是否已读：0=未读，1=已读 */
  isRead: number
  /** 阅读时间 */
  readAt: string | null
  /** 发送时间 */
  createdAt: string
}

/** 会话信息（与后端 ConversationResponse 对齐） */
export interface ConversationInfo {
  /** 对方用户 ID */
  contactId: number
  /** 对方昵称（后端字段名 nickname） */
  nickname: string
  /** 对方头像 URL（后端字段名 avatarUrl） */
  avatarUrl: string
  /** 最后一条消息内容 */
  lastMessage: string
  /** 最后一条消息时间 */
  lastMessageTime: string
  /** 未读消息数 */
  unreadCount: number
}

// ---- 收藏模块 ----

/** 收藏/取消收藏请求 */
export interface FavoriteRequest {
  /** 收藏目标类型：大写枚举 "ITEM"=物品，"GROUP_BUY"=团购，"POST"=帖子 */
  targetType: 'ITEM' | 'GROUP_BUY' | 'POST'
  /** 收藏目标 ID */
  targetId: number
}

/** 收藏记录（与后端 Favorite + 目标实体组合对齐） */
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
  /** 收藏的目标对象详情（根据 targetType 可能是 Item/Post/GroupBuy） */
  target: ItemInfo | GroupBuyInfo | PostInfo
}

// ---- 点赞模块 ----

/** 点赞/取消点赞请求 */
export interface LikeRequest {
  /** 点赞目标类型：大写枚举 "POST"=帖子，"COMMENT"=评论 */
  targetType: 'POST' | 'COMMENT'
  /** 点赞目标 ID */
  targetId: number
}
