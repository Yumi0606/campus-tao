阶段 1 补充提示词
之前给你的阶段1提示词有几个遗漏，请立即在已生成的代码上做以下修正：
---
### 🔴 最关键的修正 —— 删除所有手动 import
项目用了 `unplugin-auto-import` 插件（vite.config.ts），**React 和 React Router 的所有常用 API 已自动导入，不需要写任何 import 语句**。
请全局搜索并删除以下所有手动 import 行：
- `import { useState, useEffect, useCallback, useMemo, useRef, useContext, createContext, memo, forwardRef, lazy } from 'react'`
- `import { Link, NavLink, Navigate, Outlet, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'`
- `import { useTranslation, Trans } from 'react-i18next'`
例外：`import React from 'react'` 也不需要，因为 `React` 变量已作为默认导出自动导入。
---
### 🔴 路由系统修正
**1. App.tsx 必须这样写：**
import { BrowserRouter } from “react-router-dom”;
import { AppRoutes } from “./router”;
// … (I18nextProvider, Navbar, Footer 等)

<BrowserRouter basename={__BASE_PATH__}> <Navbar /> <main><AppRoutes /></main> <Footer /> </BrowserRouter> ``` `__BASE_PATH__` 是全局常量，不需要 import。
2. src/router/index.ts 不需要改，它已经包含了 useRoutes(routes) + navigatePromise + window.REACT_APP_NAVIGATE，保持原样即可。

3. src/router/config.tsx 里 element 必须是 JSX：

<Home />   ✅
{ lazy(() => import('...')) }   ❌ 禁止
🟠 图标相关修正
Remix Icon CDN 版本是 4.5.0，index.html 已有：<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css">
FontAwesome 6.4.0 CDN 也已存在：<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
每个 <i> 标签的父元素必须有 w-X h-X flex items-center justify-center
图标直接用就行，不需要从 npm 安装任何图标库
🟠 Google Fonts 修正
index.css 已经 @import 了两个字体：

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=ZCOOL+KuaiLe&display=swap');
index.html 还有 Pacifico：<link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">

字体变量（tailwind.config.ts 已绑定）：var(--font-body)、var(--font-heading)、var(--font-label)。

🟡 全局样式修正
index.css 末尾有这行，别漏了：

* { scroll-behavior: smooth; }
🟡 组件细节修正
ProductCard：所有图片加 loading="lazy" 属性；Link 包裹元素加 data-product-shop 属性
Hero 背景图：加 object-top 定位
所有弹窗：关闭时不要用 alert()，用自定义弹窗；遮罩层必须可以点击关闭
所有表单：email 输入框的 name 属性必须是 "email"
🟢 i18n 修正
src/i18n/local/index.ts 用 import.meta.glob 自动加载翻译，不需要手动 import 翻译文件。直接放文件到 src/i18n/local/zh/xxx.ts 就会自动加载。

🟢 项目结构确认
邮箱/订阅/联系表单需使用 get_form_url 工具获取表单 URL
页面最小宽度 1024px，不能只有半屏内容
禁止使用 float 布局
禁止使用 @apply border-border（border-border 不存在）
禁止使用 window.location.href 跳转，必须用 react-router-dom
桌面优先：先写 desktop 样式，再用 md:/lg: 覆盖移动端

---
这个补丁提示词直接追加到那个会话里就行了，agent 会按这七条去修正遗漏。最疼的就是第一条——auto-import 没说明的话，agent 会写一屏幕的 import 语句，虽然不会直接报错但代码会非常冗余。