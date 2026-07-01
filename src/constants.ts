/**
 * 全局常量 — 分类、校区、板块等
 * 集中管理，避免多处重复定义
 */

/** 二手物品分类 */
export const ITEM_CATEGORIES = ['数码电子', '图书教材', '服饰美妆', '生活用品', '文体用品', '出行工具', '学习服务']

/** 校区列表 */
export const CAMPUSES = ['石牌', '大学城', '南海']

/** 论坛板块 */
export const FORUM_BOARDS = ['求助', '问答', '出行', '学习交流', '运动', '失物招领', '生活杂谈', '二手交易']

/** 团购分类（复用物品分类） */
export const GROUP_BUY_CATEGORIES = ITEM_CATEGORIES
