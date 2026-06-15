import type { User } from './types';

export const currentUser: User = {
  id: 1,
  name: '校园小达人',
  avatar: 'https://i.pravatar.cc/100?img=33',
  campus: '主校区',
  joinDate: '2023-09-01',
  rating: 4.8,
  soldCount: 12,
  boughtCount: 8,
  groupBuyCount: 5,
};

export const myProducts = [
  {
    id: 101,
    title: '已出：高等数学教材',
    price: 20,
    status: '已售出',
    buyer: '学长A',
    soldAt: '2024-03-10',
  },
  {
    id: 102,
    title: '小米手环8 全新',
    price: 180,
    status: '在售中',
    views: 45,
    likes: 12,
  },
];

export const myGroupBuys = [
  {
    id: 201,
    title: '瑞幸咖啡券拼团',
    role: '发起人',
    status: '已成团',
    people: 10,
  },
  {
    id: 202,
    title: '健身月卡团购',
    role: '参与者',
    status: '进行中',
    people: 3,
  },
];

export const myFavorites = [
  { id: 1, type: 'product', title: 'iPad Pro 11寸', price: 5200 },
  { id: 2, type: 'product', title: 'Kindle Paperwhite', price: 650 },
  { id: 3, type: 'post', title: '考研英语一85分经验分享', author: '考研上岸' },
];

export const myTransactions = [
  {
    id: 301,
    type: '买入',
    product: '小米台灯',
    price: 45,
    seller: '毕业学姐',
    date: '2024-03-05',
    rating: 5,
    comment: '物品很好，学姐人也很nice！',
  },
  {
    id: 302,
    type: '卖出',
    product: '高数教材',
    price: 20,
    buyer: '大一学弟',
    date: '2024-03-10',
    rating: 5,
    comment: '学弟很准时，交易顺利~',
  },
];

export const myReviews = [
  {
    id: 401,
    from: '大一学弟',
    rating: 5,
    comment: '书保存得很好，学长人超nice！',
    date: '2024-03-10',
    product: '高等数学教材',
  },
  {
    id: 402,
    from: '毕业学姐',
    rating: 5,
    comment: '买家很准时，沟通愉快~',
    date: '2024-03-05',
    product: '小米台灯',
  },
];