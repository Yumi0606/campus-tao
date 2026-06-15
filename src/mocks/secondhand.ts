import type { Product } from './types'

// 分类列表
export const categories = [
  '全部',
  '电子产品',
  '生活电器',
  '图书教材',
  '家具',
  '文体用品',
  '服饰美妆',
  '其他',
]

// 校区列表
export const campuses = [
  '全部校区',
  '主校区',
  '东校区',
  '西校区',
  '南校区',
  '北校区',
]

// 二手商品数据
export const secondhandProducts: Product[] = [
  {
    id: '1',
    title: 'MacBook Pro 2021 14寸 M1 Pro芯片 16GB+512GB',
    description: '2021年购入，使用一年半，成色99新。屏幕完美无划痕，电池健康度94%， cycles 127次。配件齐全：原装充电器、保护壳、键盘膜。系统流畅，适合设计/开发/剪辑。可当面验货，满意再付款。',
    price: 5200,
    originalPrice: 14999,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
    seller: {
      id: 'u1',
      name: '小李同学',
      avatar: 'https://i.pravatar.cc/100?img=1',
      rating: 4.9,
      campus: '主校区',
      isVerified: true,
    },
    status: 'available',
    campus: '主校区',
    postedAt: '2024-01-15',
    views: 234,
    likes: 18,
  },
  {
    id: '2',
    title: '九阳豆浆机 家用全自动破壁料理机',
    description: '全新未拆封，毕业带不走转手。支持预约、自动清洗，容量1.2L适合2-3人。原价299，买来一直没用过。',
    price: 168,
    originalPrice: 299,
    category: '生活电器',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&h=600&fit=crop',
    seller: {
      id: 'u2',
      name: '吃货小王',
      avatar: 'https://i.pravatar.cc/100?img=2',
      rating: 4.7,
      campus: '东校区',
    },
    status: 'available',
    campus: '东校区',
    postedAt: '2024-01-14',
    views: 156,
    likes: 12,
  },
  {
    id: '3',
    title: '人体工学电脑椅 家用办公椅 可调节扶手',
    description: '使用一年，升降/后仰功能正常，无损坏。灰黑色网布，透气舒适。适合长时间学习/办公使用。自提，可协助搬运。',
    price: 380,
    originalPrice: 699,
    category: '家具',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop',
    seller: {
      id: 'u3',
      name: '阿杰学长',
      avatar: 'https://i.pravatar.cc/100?img=3',
      rating: 4.8,
      campus: '西校区',
      isVerified: true,
    },
    status: 'available',
    campus: '西校区',
    postedAt: '2024-01-13',
    views: 189,
    likes: 15,
  },
  {
    id: '4',
    title: '考研英语数学资料全套（含真题+网课）',
    description: '2024考研全套资料，英语一+数学二，包含：考研词汇书、真题解析10年、张宇高数+线代、李永乐线性代数、王式安概率论，赠送网课视频网盘链接。',
    price: 45,
    originalPrice: 200,
    category: '图书教材',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
    seller: {
      id: 'u4',
      name: '研一学姐',
      avatar: 'https://i.pravatar.cc/100?img=4',
      rating: 5.0,
      campus: '主校区',
      isVerified: true,
    },
    status: 'available',
    campus: '主校区',
    postedAt: '2024-01-12',
    views: 312,
    likes: 28,
  },
  {
    id: '5',
    title: '索尼WH-1000XM4头戴式降噪耳机 黑色',
    description: '国行正品，购于京东，使用半年。降噪效果一流，续航30小时。配件：原装充电线、收纳盒、飞机转接头。小刮痕不影响使用。',
    price: 850,
    originalPrice: 2299,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    seller: {
      id: 'u1',
      name: '小李同学',
      avatar: 'https://i.pravatar.cc/100?img=1',
      rating: 4.9,
      campus: '主校区',
      isVerified: true,
    },
    status: 'available',
    campus: '主校区',
    postedAt: '2024-01-11',
    views: 278,
    likes: 22,
  },
  {
    id: '6',
    title: 'iPad Air 5 256GB WiFi版 深空灰色',
    description: '2022年购入，M1芯片性能强劲。屏幕贴类纸膜，有保护壳，轻微使用痕迹。适合记笔记、看视频、画图。配件：Apple Pencil二代（另议）。',
    price: 3800,
    originalPrice: 5499,
    category: '电子产品',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
    seller: {
      id: 'u5',
      name: '设计师小陈',
      avatar: 'https://i.pravatar.cc/100?img=5',
      rating: 4.6,
      campus: '南校区',
    },
    status: 'available',
    campus: '南校区',
    postedAt: '2024-01-10',
    views: 423,
    likes: 35,
  },
  {
    id: '7',
    title: '小冰箱 宿舍家用迷你冰箱 48L 冷藏冷冻',
    description: '使用两年，制冷效果很好，噪音小。适合宿舍使用，可放饮料水果。已清洗消毒，自提，主校区宿舍区可协助搬运。',
    price: 220,
    originalPrice: 499,
    category: '生活电器',
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&h=600&fit=crop',
    seller: {
      id: 'u6',
      name: '毕业生小张',
      avatar: 'https://i.pravatar.cc/100?img=6',
      rating: 4.5,
      campus: '北校区',
    },
    status: 'sold',
    campus: '北校区',
    postedAt: '2024-01-09',
    views: 167,
    likes: 8,
  },
  {
    id: '8',
    title: '雅马哈F310入门民谣吉他 送琴包+调音器',
    description: '入门级经典款，音色清亮。购于一年前，练习用保护很好。无磕碰，弦距适中。适合初学者。赠送：琴包、调音器、备用琴弦。',
    price: 350,
    originalPrice: 899,
    category: '文体用品',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    seller: {
      id: 'u7',
      name: '吉他社社长',
      avatar: 'https://i.pravatar.cc/100?img=7',
      rating: 4.8,
      campus: '主校区',
      isVerified: true,
    },
    status: 'available',
    campus: '主校区',
    postedAt: '2024-01-08',
    views: 198,
    likes: 16,
  },
]

// 根据 ID 获取商品
export const getProductById = (id: string): Product | undefined => {
  return secondhandProducts.find((p) => p.id === id)
}

// 根据分类筛选
export const getProductsByCategory = (category: string): Product[] => {
  if (category === '全部') return secondhandProducts
  return secondhandProducts.filter((p) => p.category === category)
}

// 根据校区筛选
export const getProductsByCampus = (campus: string): Product[] => {
  if (campus === '全部校区') return secondhandProducts
  return secondhandProducts.filter((p) => p.campus === campus)
}

// 根据卖家筛选（我的发布）
export const getProductsBySeller = (sellerName: string): Product[] => {
  return secondhandProducts.filter((p) => p.seller.name === sellerName)
}
