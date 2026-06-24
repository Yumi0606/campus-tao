# 校园淘 🏫

一个面向高校学生的校园二手交易平台，支持二手交易、拼团团购、校园论坛、即时聊天等功能。

## 功能概览

| 模块 | 功能 |
|------|------|
| 二手交易 | 商品浏览、分类筛选、校区筛选、发布商品、收藏、模拟支付 |
| 拼团团购 | 团购列表、进度追踪、参团/取消、模拟支付 |
| 校园论坛 | 帖子浏览、分类筛选、点赞/评论/回复、发布帖子 |
| 即时聊天 | 联系人列表、消息收发、在线状态 |
| 个人中心 | 资料编辑、我的发布/收藏/交易记录/拼团/评价 |

## 技术栈

- **框架**: React 19 + TypeScript
- **构建**: Vite 8
- **样式**: Tailwind CSS v4（`@theme` 配置，无独立 config 文件）
- **路由**: React Router v7
- **图标**: Remix Icon（CDN）
- **字体**: Noto Sans SC
- **包管理**: pnpm

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 预览构建产物
pnpm preview

# 代码检查
pnpm lint
```

## 项目结构

```
src/
├── components/
│   ├── base/          # 通用组件（ProductCard, Toast, Breadcrumb 等）
│   └── feature/       # 布局组件（Navbar, Footer）
├── pages/
│   ├── home/          # 首页
│   ├── secondhand/    # 二手交易（列表 + 详情 + 发布弹窗）
│   ├── groupbuy/      # 拼团团购（列表 + 详情 + 发布弹窗）
│   ├── forum/         # 校园论坛（列表 + 详情 + 发布弹窗）
│   ├── profile/       # 个人中心（主页 + 编辑）
│   ├── chat/          # 聊天
│   └── NotFound.tsx   # 404 页面
├── mocks/             # 模拟数据与类型定义
├── router/            # 路由配置
├── index.css          # 全局样式与 Tailwind 主题
├── main.tsx           # 入口
└── App.tsx            # 布局壳（Navbar + 内容 + Footer）
```

## 设计体系

采用暖色调配色方案，所有颜色使用 `oklch()` 定义：

| 色系 | 用途 | 示例 |
|------|------|------|
| Primary | 主色调 — 暖琥珀/蜂蜜金 | 按钮、链接、高亮 |
| Accent | 强调色 — 珊瑚/暖玫瑰 | 价格、收藏、重要标签 |
| Secondary | 辅助色 — 暖沙色 | 次要标签、分隔线 |
| Background | 背景色 — 暖奶油白 | 页面背景、卡片背景 |
| Foreground | 前景色 — 暖深棕 | 正文、标题 |

## 说明

- 本项目为纯前端演示，所有数据均为模拟数据，无后端服务
- 支付流程为模拟扫码 → 确认 → 成功动画，无真实支付集成
- 图片来源：商品图使用 Unsplash，头像使用 pravatar.cc
