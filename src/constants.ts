/**
 * 全局常量 — 分类、校区、板块等
 * 集中管理，避免多处重复定义
 */

/** 二手物品分类 */
export const ITEM_CATEGORIES = ['数码', '书籍', '服饰', '生活', '运动', '美妆', '其他']

/** 校区列表 */
export const CAMPUSES = ['主校区', '东校区', '西校区', '南校区', '北校区']

/** 论坛板块 */
export const FORUM_BOARDS = ['求助', '二手', '生活', '学习', '活动', '综合']

/** 团购分类（复用物品分类） */
export const GROUP_BUY_CATEGORIES = ITEM_CATEGORIES
