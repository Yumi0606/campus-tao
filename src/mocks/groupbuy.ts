import type { GroupBuy } from './types'

// 拼团状态列表
export const groupBuyStatuses = ['全部', '进行中', '已成团', '已结束']

// 拼团数据
export const groupBuys: GroupBuy[] = [
  {
    id: '1',
    title: '坚果大礼包 混合坚果仁 500g*3袋',
    description: '每日坚果混合装，包含核桃仁、腰果、杏仁、榛子等，健康营养早餐零食。成团后统一采购，团长负责分发。',
    originalPrice: 99,
    groupPrice: 59,
    minMembers: 20,
    currentMembers: 16,
    image: 'https://images.unsplash.com/photo-1605608081728-93af5c5f974c?w=800&h=600&fit=crop',
    initiator: {
      id: 'u8',
      name: '吃货团长',
      avatar: 'https://i.pravatar.cc/100?img=8',
      rating: 4.8,
      campus: '主校区',
      isVerified: true,
    },
    status: 'ongoing',
    deadline: '2024-01-20',
    pickupLocation: '主校区食堂门口',
    createdAt: '2024-01-10',
    views: 156,
  },
  {
    id: '2',
    title: '公牛插座 6位总控开关 插线板',
    description: '宿舍必备插线板，带USB充电口，安全耐用。成团价超划算，每人限购2个。',
    originalPrice: 45,
    groupPrice: 28,
    minMembers: 30,
    currentMembers: 22,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    initiator: {
      id: 'u9',
      name: '宿舍管理员',
      avatar: 'https://i.pravatar.cc/100?img=9',
      rating: 4.7,
      campus: '东校区',
    },
    status: 'ongoing',
    deadline: '2024-01-18',
    pickupLocation: '东校区宿舍楼下',
    createdAt: '2024-01-08',
    views: 189,
  },
  {
    id: '3',
    title: '星巴克保温杯 限量版渐变色 500ml',
    description: '星巴克限量款保温杯，双层真空保温12小时。颜值超高，成团已结束，感谢参与的同学！',
    originalPrice: 189,
    groupPrice: 128,
    minMembers: 15,
    currentMembers: 15,
    image: 'https://images.unsplash.com/photo-1514228742587-7b54c00c6d25?w=800&h=600&fit=crop',
    initiator: {
      id: 'u10',
      name: '咖啡爱好者',
      avatar: 'https://i.pravatar.cc/100?img=10',
      rating: 4.9,
      campus: '主校区',
      isVerified: true,
    },
    status: 'completed',
    deadline: '2024-01-15',
    pickupLocation: '主校区咖啡厅',
    createdAt: '2024-01-05',
    views: 234,
  },
  {
    id: '4',
    title: '法兰绒睡衣套装 冬季保暖家居服',
    description: '超柔软法兰绒睡衣，保暖透气。男女款可选，尺码齐全。适合宿舍休息穿。',
    originalPrice: 129,
    groupPrice: 79,
    minMembers: 20,
    currentMembers: 8,
    image: 'https://images.unsplash.com/photo-1559056199-5c5f5c8d8c6c?w=800&h=600&fit=crop',
    initiator: {
      id: 'u11',
      name: '冬日暖阳',
      avatar: 'https://i.pravatar.cc/100?img=11',
      rating: 4.6,
      campus: '西校区',
    },
    status: 'ongoing',
    deadline: '2024-01-22',
    pickupLocation: '西校区超市门口',
    createdAt: '2024-01-12',
    views: 78,
  },
  {
    id: '5',
    title: '考试套装 笔记本+中性笔+便利贴',
    description: '备考必备文具套装：笔记本5本、中性笔10支、便利贴3盒、荧光笔6支。考试季特惠拼团！',
    originalPrice: 35,
    groupPrice: 19,
    minMembers: 50,
    currentMembers: 43,
    image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=600&fit=crop',
    initiator: {
      id: 'u12',
      name: '学霸小刘',
      avatar: 'https://i.pravatar.cc/100?img=12',
      rating: 5.0,
      campus: '主校区',
      isVerified: true,
    },
    status: 'ongoing',
    deadline: '2024-01-25',
    pickupLocation: '主校区图书馆门口',
    createdAt: '2024-01-14',
    views: 312,
  },
  {
    id: '6',
    title: '折叠桌 宿舍床上小桌子 可升降',
    description: '宿舍床上用小折叠桌，可调节高度和角度。学习、追剧神器！铝合金材质，轻便耐用。',
    originalPrice: 89,
    groupPrice: 55,
    minMembers: 15,
    currentMembers: 10,
    image: 'https://images.unsplash.com/photo-1595516800179-67c4686b8b5a?w=800&h=600&fit=crop',
    initiator: {
      id: 'u13',
      name: '宿舍达人',
      avatar: 'https://i.pravatar.cc/100?img=13',
      rating: 4.5,
      campus: '北校区',
    },
    status: 'ongoing',
    deadline: '2024-01-19',
    pickupLocation: '北校区快递点',
    createdAt: '2024-01-11',
    views: 145,
  },
]

// 根据 ID 获取拼团
export const getGroupBuyById = (id: string): GroupBuy | undefined => {
  return groupBuys.find((g) => g.id === id)
}

// 根据状态筛选
export const getGroupBuysByStatus = (status: string): GroupBuy[] => {
  if (status === '全部') return groupBuys
  return groupBuys.filter((g) => g.status === status)
}

// 根据发起人筛选（我的拼团）
export const getGroupBuysByInitiator = (name: string): GroupBuy[] => {
  return groupBuys.filter((g) => g.initiator.name === name)
}

// 热门拼团（进行中，人数最多）
export const getHotGroupBuys = (limit: number = 3): GroupBuy[] => {
  return groupBuys
    .filter((g) => g.status === 'ongoing')
    .sort((a, b) => b.currentMembers - a.currentMembers)
    .slice(0, limit)
}