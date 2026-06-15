import type { UserProfile, MyProduct, MyFavorite, TradeRecord, MyGroupBuy, Review } from './types'

// 用户资料
export const userProfile: UserProfile = {
  id: 'u1',
  name: '小王同学',
  avatar: 'https://i.pravatar.cc/100?img=1',
  campus: '主校区',
  department: '计算机学院',
  grade: '大三',
  bio: '热爱生活，热爱学习。经常出闲置，诚信交易。',
  wechat: 'xiaowang_123',
  qq: '123456789',
  rating: 4.8,
  tradeCount: 23,
  publishCount: 15,
  groupBuyCount: 8,
}

// 我的发布
export const myProducts: MyProduct[] = [
  {
    id: 'mp1',
    title: 'MacBook Pro 2021 14寸',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    price: 5200,
    status: 'available',
    views: 234,
    postedAt: '2024-01-15',
  },
  {
    id: 'mp2',
    title: '索尼WH-1000XM4降噪耳机',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    price: 850,
    status: 'sold',
    views: 178,
    postedAt: '2024-01-10',
  },
]

// 我的收藏
export const myFavorites: MyFavorite[] = [
  {
    id: 'mf1',
    productId: '3',
    title: '人体工学电脑椅',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    price: 380,
    seller: {
      id: 'u3',
      name: '阿杰学长',
      avatar: 'https://i.pravatar.cc/100?img=3',
      rating: 4.8,
      campus: '西校区',
    },
    postedAt: '2024-01-13',
  },
  {
    id: 'mf2',
    productId: '6',
    title: 'iPad Air 5 256GB',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    price: 3800,
    seller: {
      id: 'u5',
      name: '设计师小陈',
      avatar: 'https://i.pravatar.cc/100?img=5',
      rating: 4.6,
      campus: '南校区',
    },
    postedAt: '2024-01-10',
  },
  {
    id: 'mf3',
    productId: '8',
    title: '雅马哈F310入门民谣吉他',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    price: 350,
    seller: {
      id: 'u7',
      name: '吉他社社长',
      avatar: 'https://i.pravatar.cc/100?img=7',
      rating: 4.8,
      campus: '主校区',
    },
    postedAt: '2024-01-08',
  },
]

// 交易记录
export const tradeRecords: TradeRecord[] = [
  {
    id: 'tr1',
    type: 'sell',
    productName: '索尼WH-1000XM4降噪耳机',
    date: '2024-01-12',
    price: 850,
    counterparty: {
      id: 'u24',
      name: '音乐小王',
      avatar: 'https://i.pravatar.cc/100?img=24',
      rating: 4.7,
      campus: '东校区',
    },
    rating: 5,
  },
  {
    id: 'tr2',
    type: 'sell',
    productName: '二手自行车',
    date: '2024-01-05',
    price: 150,
    counterparty: {
      id: 'u25',
      name: '骑行达人',
      avatar: 'https://i.pravatar.cc/100?img=25',
      rating: 4.5,
      campus: '主校区',
    },
    rating: 5,
  },
  {
    id: 'tr3',
    type: 'buy',
    productName: '考研英语资料',
    date: '2024-01-08',
    price: 45,
    counterparty: {
      id: 'u4',
      name: '研一学姐',
      avatar: 'https://i.pravatar.cc/100?img=4',
      rating: 5.0,
      campus: '主校区',
    },
    rating: 5,
  },
]

// 我的拼团
export const myGroupBuys: MyGroupBuy[] = [
  {
    id: 'mg1',
    groupBuyId: '1',
    title: '坚果大礼包',
    role: 'member',
    status: 'ongoing',
    price: 59,
    joinedAt: '2024-01-10',
  },
  {
    id: 'mg2',
    groupBuyId: '5',
    title: '考试套装',
    role: 'leader',
    status: 'ongoing',
    price: 19,
    joinedAt: '2024-01-14',
  },
]

// 评价
export const reviews: Review[] = [
  {
    id: 'r1',
    reviewer: {
      id: 'u24',
      name: '音乐小王',
      avatar: 'https://i.pravatar.cc/100?img=24',
      rating: 4.7,
      campus: '东校区',
    },
    date: '2024-01-12',
    productName: '索尼WH-1000XM4降噪耳机',
    rating: 5,
    content: '耳机成色很好，卖家人也很nice，还送了保护套！非常满意的一次交易。',
  },
  {
    id: 'r2',
    reviewer: {
      id: 'u25',
      name: '骑行达人',
      avatar: 'https://i.pravatar.cc/100?img=25',
      rating: 4.5,
      campus: '主校区',
    },
    date: '2024-01-05',
    productName: '二手自行车',
    rating: 5,
    content: '自行车骑起来很舒服，卖家还帮忙调试了刹车。良心卖家！',
  },
  {
    id: 'r3',
    reviewer: {
      id: 'u26',
      name: '新手小白',
      avatar: 'https://i.pravatar.cc/100?img=26',
      rating: 4.6,
      campus: '西校区',
    },
    date: '2024-01-02',
    productName: '机械键盘',
    rating: 4,
    content: '键盘手感不错，就是有点脏，自己清理了一下就好了。',
  },
]