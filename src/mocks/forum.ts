import type { Post, Comment } from './types'

// 论坛分类列表
export const forumCategories = [
  '全部',
  '选课攻略',
  '活动通知',
  '学习交流',
  '兼职招聘',
  '失物招领',
  '生活杂谈',
  '其他',
]

// 论坛帖子数据
export const forumPosts: Post[] = [
  {
    id: '1',
    title: '【选课避坑】2024春季学期那些千万别选的课',
    content: '作为即将毕业的老学长，整理了一些踩坑课程名单，供大家参考选课。\n\n1. ××老师的《××学概论》——上课全念PPT，考试全是超纲题，挂科率30%+，慎重考虑！\n\n2. 《××实验课》——每次实验都要写万字报告，工作量巨大，不推荐时间紧张的童鞋。\n\n3. ××老师的《××原理》——虽然老师人很好，但是上课节奏太快，跟不上会很难。\n\n推荐的好课下次另发帖分享，有问题可以留言问我。',
    category: '选课攻略',
    author: {
      id: 'u14',
      name: '课代表小明',
      avatar: 'https://i.pravatar.cc/100?img=14',
      rating: 5.0,
      campus: '主校区',
      isVerified: true,
    },
    likes: 156,
    comments: 42,
    isPinned: true,
    hasAttachment: false,
    postedAt: '2024-01-10',
    tags: ['选课', '避坑', '经验分享'],
    views: 892,
  },
  {
    id: '2',
    title: '【通知】校园音乐节来了！1月20日晚体育馆',
    content: '一年一度的校园音乐节即将开幕！\n\n时间：1月20日 19:00-22:00\n地点：主校区体育馆\n\n演出阵容：\n- 校乐队 The Sound\n- 吉他社表演\n- 舞蹈社街舞秀\n- 神秘嘉宾乐队\n\n票价：学生票免费（需预约），外校票20元\n预约方式：学生会公众号预约\n\n欢迎大家来嗨！',
    category: '活动通知',
    author: {
      id: 'u15',
      name: '学生会官方',
      avatar: 'https://i.pravatar.cc/100?img=15',
      rating: 5.0,
      campus: '主校区',
      isVerified: true,
    },
    likes: 234,
    comments: 58,
    isPinned: true,
    hasAttachment: true,
    postedAt: '2024-01-12',
    tags: ['音乐节', '活动', '免费'],
    views: 1234,
  },
  {
    id: '3',
    title: '四级备考经验分享：从400到550的逆袭之路',
    content: '去年四级考了400分，今年终于过了550！分享一下我的备考经验。\n\n1. 词汇：不要死背单词书，用APP刷高频词，每天100个。\n\n2. 听力：精听！听一句写一句，反复练习真题听力。\n\n3. 阅读：先看题目再看文章，关键词定位法效率高。\n\n4. 写作：背模板，考前准备3个万能模板。\n\n坚持2个月，每天1小时，肯定能过！有问题留言问我。',
    category: '学习交流',
    author: {
      id: 'u16',
      name: '英语小达人',
      avatar: 'https://i.pravatar.cc/100?img=16',
      rating: 4.8,
      campus: '东校区',
    },
    likes: 89,
    comments: 23,
    isPinned: false,
    hasAttachment: false,
    postedAt: '2024-01-08',
    tags: ['四级', '备考', '经验'],
    views: 456,
  },
  {
    id: '4',
    title: '【招聘】某互联网公司校园大使招募',
    content: '知名互联网公司招募校园大使！\n\n工作内容：\n- 协助公司在校内推广活动\n- 收集学生反馈和建议\n- 组织小型交流会\n\n要求：\n- 本校在读学生\n- 有一定社交能力\n- 每周能投入5小时左右\n\n待遇：\n- 月薪500元\n- 公司实习优先权\n- 内部培训机会\n\n有意者私信我，截止日期1月25日。',
    category: '兼职招聘',
    author: {
      id: 'u17',
      name: 'HR小姐姐',
      avatar: 'https://i.pravatar.cc/100?img=17',
      rating: 4.7,
      campus: '主校区',
      isVerified: true,
    },
    likes: 67,
    comments: 31,
    isPinned: false,
    hasAttachment: false,
    postedAt: '2024-01-14',
    tags: ['招聘', '校园大使', '兼职'],
    views: 289,
  },
  {
    id: '5',
    title: '【失物招领】图书馆捡到蓝色钱包',
    content: '今天在图书馆三楼自习室捡到一个蓝色钱包，里面有学生卡和一些现金。\n\n学生卡姓名：×××\n学院：计算机学院\n\n请失主看到后私信我确认身份，图书馆归还。认领截止时间1月20日。',
    category: '失物招领',
    author: {
      id: 'u18',
      name: '热心同学',
      avatar: 'https://i.pravatar.cc/100?img=18',
      rating: 5.0,
      campus: '主校区',
    },
    likes: 23,
    comments: 5,
    isPinned: false,
    hasAttachment: false,
    postedAt: '2024-01-15',
    tags: ['失物招领', '钱包'],
    views: 156,
  },
  {
    id: '6',
    title: '体育课选课攻略：哪种课最轻松？',
    content: '分析一下各种体育课的难度和工作量，给想选轻松课的同学参考。\n\n最轻松前三：\n1. 瑜伽——几乎不费力，考核简单\n2. 太极拳——节奏慢，适合不爱运动的\n3. 健美操——跟着音乐动，氛围好\n\n工作量大的：\n- 网球——需要额外练习\n- 篮球——考核严格\n- 游泳——需要会游才能过\n\n仅供参考，还是要选自己喜欢的！',
    category: '选课攻略',
    author: {
      id: 'u14',
      name: '课代表小明',
      avatar: 'https://i.pravatar.cc/100?img=14',
      rating: 5.0,
      campus: '主校区',
      isVerified: true,
    },
    likes: 112,
    comments: 28,
    isPinned: false,
    hasAttachment: false,
    postedAt: '2024-01-07',
    tags: ['体育课', '选课'],
    views: 534,
  },
  {
    id: '7',
    title: '【讲座】考研经验分享会 1月18日',
    content: '研究生学长学姐经验分享会来了！\n\n时间：1月18日 14:00\n地点：教学楼A101\n\n内容：\n- 各专业考研难度分析\n- 复习时间规划\n- 复试面试技巧\n- 导师选择建议\n\n适合大二大三想考研的同学，欢迎参加！',
    category: '活动通知',
    author: {
      id: 'u19',
      name: '研代会',
      avatar: 'https://i.pravatar.cc/100?img=19',
      rating: 4.9,
      campus: '主校区',
      isVerified: true,
    },
    likes: 78,
    comments: 15,
    isPinned: false,
    hasAttachment: true,
    postedAt: '2024-01-13',
    tags: ['考研', '讲座', '分享'],
    views: 345,
  },
  {
    id: '8',
    title: '外卖推荐：学校附近好吃的都在这！',
    content: '整理了一份学校附近外卖清单，亲测好吃！\n\n🍔 快餐类：\n- ××汉堡店——双层芝士堡绝了\n- ××炸鸡——脆皮嫩肉\n\n🍜 面食类：\n- ××牛肉面——汤底浓郁\n- ××米粉——桂林风味正宗\n\n🥗 健康类：\n- ××轻食——减脂首选\n- ××沙拉——新鲜便宜\n\n其他好吃的欢迎补充！',
    category: '生活杂谈',
    author: {
      id: 'u20',
      name: '美食博主',
      avatar: 'https://i.pravatar.cc/100?img=20',
      rating: 4.6,
      campus: '东校区',
    },
    likes: 145,
    comments: 67,
    isPinned: false,
    hasAttachment: false,
    postedAt: '2024-01-06',
    tags: ['外卖', '美食', '推荐'],
    views: 678,
  },
]

// 帖子评论数据
export const postComments: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    author: {
      id: 'u21',
      name: '大一萌新',
      avatar: 'https://i.pravatar.cc/100?img=21',
      rating: 4.5,
      campus: '主校区',
    },
    content: '太感谢了！刚来学校选课完全不懂，这个攻略救了我！',
    likes: 12,
    createdAt: '2024-01-10 10:30',
  },
  {
    id: 'c2',
    postId: '1',
    author: {
      id: 'u22',
      name: '大二学弟',
      avatar: 'https://i.pravatar.cc/100?img=22',
      rating: 4.7,
      campus: '东校区',
    },
    content: '请问那个实验课是必修吗？我们专业好像必须选...',
    likes: 5,
    createdAt: '2024-01-10 14:20',
  },
  {
    id: 'c3',
    postId: '2',
    author: {
      id: 'u23',
      name: '摇滚青年',
      avatar: 'https://i.pravatar.cc/100?img=23',
      rating: 4.8,
      campus: '主校区',
    },
    content: '期待！每年音乐节都去，今年阵容更强大！',
    likes: 18,
    createdAt: '2024-01-12 09:15',
  },
]

// 根据 ID 获取帖子
export const getPostById = (id: string): Post | undefined => {
  return forumPosts.find((p) => p.id === id)
}

// 获取帖子评论
export const getCommentsByPostId = (postId: string): Comment[] => {
  return postComments.filter((c) => c.postId === postId)
}

// 根据分类筛选
export const getPostsByCategory = (category: string): Post[] => {
  if (category === '全部') return forumPosts
  return forumPosts.filter((p) => p.category === category)
}

// 根据作者筛选（我的帖子）
export const getPostsByAuthor = (authorName: string): Post[] => {
  return forumPosts.filter((p) => p.author.name === authorName)
}

// 热门帖子（点赞最多）
export const getHotPosts = (limit: number = 3): Post[] => {
  return forumPosts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit)
}

// 最新帖子
export const getLatestPosts = (limit: number = 5): Post[] => {
  return forumPosts
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, limit)
}