export interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  condition: '全新' | '99新' | '95新' | '9成新' | '8成新';
  category: string;
  campus: string;
  image: string;
  seller: {
    id: number;
    name: string;
    avatar: string;
  };
  description: string;
  views: number;
  likes: number;
  createdAt: string;
  isSold: boolean;
}

export interface GroupBuy {
  id: number;
  title: string;
  image: string;
  originalPrice: number;
  groupPrice: number;
  minPeople: number;
  currentPeople: number;
  deadline: string;
  organizer: {
    id: number;
    name: string;
    avatar: string;
  };
  description: string;
  status: '进行中' | '即将成团' | '已成团' | '已结束';
  campus: string;
  pickupLocation: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  views: number;
  isPinned: boolean;
  isHot: boolean;
  createdAt: string;
  images?: string[];
  attachments?: { name: string; url: string }[];
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  campus: string;
  joinDate: string;
  rating: number;
  soldCount: number;
  boughtCount: number;
  groupBuyCount: number;
}

export const categories = [
  { id: 'all', name: '全部', icon: '📦' },
  { id: 'books', name: '教材书籍', icon: '📚' },
  { id: 'electronics', name: '数码电子', icon: '💻' },
  { id: 'clothes', name: '服饰鞋包', icon: '👕' },
  { id: 'sports', name: '运动户外', icon: '⚽' },
  { id: 'daily', name: '生活用品', icon: '🧴' },
  { id: 'beauty', name: '美妆护肤', icon: '💄' },
  { id: 'food', name: '食品零食', icon: '🍜' },
  { id: 'other', name: '其他', icon: '🎁' },
];

export const campuses = [
  { id: 'all', name: '全部校区' },
  { id: 'main', name: '主校区' },
  { id: 'east', name: '东校区' },
  { id: 'south', name: '南校区' },
  { id: 'north', name: '北校区' },
];

export const forumCategories = [
  { id: 'all', name: '全部', icon: '📋' },
  { id: 'course', name: '选课攻略', icon: '📖' },
  { id: 'activity', name: '活动通知', icon: '🎉' },
  { id: 'job', name: '招聘信息', icon: '💼' },
  { id: 'study', name: '学习交流', icon: '✏️' },
  { id: 'life', name: '校园生活', icon: '🏠' },
  { id: 'lost', name: '失物招领', icon: '🔍' },
  { id: 'other', name: '其他', icon: '💬' },
];