
请帮我创建一个校园信息撮合平台——「校园淘」。面向大学生，提供二手交易、拼团团购、校园论坛三大功能，平台不涉及资金托管，仅做信息展示与私聊撮合。
技术栈：React 19 + Tailwind CSS 3 + TypeScript，Vite SPA。使用 React Router v7 做路由。i18next 做国际化框架（先搭好框架即可，暂不需要实际翻译）。当前阶段用 Mock 数据驱动。
---
## 一、全局样式系统
### 色彩（必须严格使用这个 OKLCH 色彩系统，通过 CSS 变量 + Tailwind 绑定）
在 index.css 里定义：
- font-family 统一用 Google Fonts 的 Noto Sans SC（在 index.html 中引入）
- 五个色阶角色：background（暖奶油白系）、primary（暖琥珀/蜂蜜金）、accent（珊瑚/暖玫瑰）、secondary（暖沙色/taupe）、foreground（暖深棕）
- 每个角色从 50-950 共 11 级
- 使用 oklch(var(--xxx) / <alpha-value>) 格式在 tailwind.config.ts 里绑定
- 禁止在代码中硬编码 hex/rgb 颜色，全部走 Token
- background-50 做页面底色，primary-500 做主 CTA，accent-500 做第二强调（收藏、价格等），secondary 做标签/辅助UI
具体 CSS 变量值参考：
–background-50: 0.99 0.005 95;
–primary-500: 0.78 0.20 60;
–accent-500: 0.72 0.25 60;
–secondary-500: 0.70 0.10 58;
–foreground-950: 0.16 0.03 8;
// … 其他级别按梯度展开


### 字体
- Noto Sans SC 做主字体（body + heading），Google Fonts CDN 引入
- 卡片标题 14px，正文 13-14px，辅助文字 12px
- 所有按钮加 whitespace-nowrap
### 圆角
- 卡片/容器 rounded-xl (12px)
- 按钮/表单 rounded-lg (8px)
- 筛选标签 rounded-full
- 禁止使用 box-shadow
### 图标
使用 Remix Icon CDN（已在 index.html 引入），禁止装 npm 包。
---
## 二、项目结构
src/
components/
base/ # ProductCard, GroupBuyCard, PostCard, PaymentModal
feature/ # Navbar, Footer
pages/
home/ # 首页
secondhand/ # 二手交易列表 + detail/详情 + components/PublishProductModal
groupbuy/ # 团购列表 + detail/详情 + components/PublishGroupBuyModal
forum/ # 论坛列表 + detail/详情 + components/PublishPostModal
profile/ # 个人中心 + edit/编辑资料
chat/ # 聊天系统（列表+窗口）
NotFound.tsx # 404
mocks/ # secondhand.ts, groupbuy.ts, forum.ts, profile.ts
router/ # config.tsx (路由配置) + index.ts (路由渲染)
i18n/local/ # 国际化占位
App.tsx # BrowserRouter + Navbar + Footer + AppRoutes
main.tsx
index.css


---
## 三、路由表（共12个路由）
| 路径 | 页面 | 说明 |
|------|------|------|
| / | Home | 首页 |
| /secondhand | Secondhand | 二手交易列表 |
| /secondhand/:id | SecondhandDetail | 二手商品详情 |
| /groupbuy | GroupBuy | 拼团列表 |
| /groupbuy/:id | GroupBuyDetail | 拼团详情 |
| /forum | Forum | 论坛帖子流 |
| /forum/:id | ForumDetail | 帖子详情 |
| /profile | Profile | 个人中心 |
| /profile/edit | EditProfile | 编辑资料 |
| /chat | Chat | 聊天（联系人列表） |
| /chat/:contactId | Chat | 指定联系人聊天 |
| * | NotFound | 404 |
---
## 四、公共组件
### Navbar（顶部导航，固定顶部）
- 左侧：品牌图标（ri-store-2-line）+ 「校园淘」文字
- 中间：四个导航链接——二手交易(ri-swap-box-line)、拼团团购(ri-group-line)、校园论坛(ri-chat-smile-2-line)、个人中心(ri-user-3-line)
- 右侧：消息铃铛图标(ri-notification-3-line)跳转/chat + 用户头像跳转/profile/edit
- 滚动效果：初始透明背景，下滑 >20px 后出现 bg-background-50/95 + backdrop-blur-md + 底部边框
- 当前路由高亮：bg-primary-100 text-primary-700
- 移动端：md:hidden 汉堡菜单，点击展开下拉导航面板
### Footer（全站页脚）
- 四列网格：品牌介绍、快速导航(二手/拼团/论坛)、帮助中心(使用指南/交易安全/举报反馈)、关于我们(关于/协议/隐私)
- 底部版权行 + 社交媒体图标（微信/微博/B站）
### ProductCard（二手商品卡片）
- 属性：id, title, price, originalPrice, image, seller(name/avatar/rating), status, campus, postedAt, views, likes
- 图片区 4:3 比例，hover 放大效果，已售商品加半透明遮罩 + "已售出"标签
- 左上角校区标签，右上角收藏心形按钮
- 底部：标题(2行截断)、价格(accent-600大号 + 原价划线)、卖家头像+名称、浏览数+时间
- 整体是 Link 包裹到 /secondhand/:id
- 添加 data-product-shop 属性
### GroupBuyCard（拼团卡片）
- 属性：id, title, originalPrice, groupPrice, minMembers, currentMembers, image, initiator, status, deadline, pickupLocation
- 左侧图片(sm:w-48) + 右侧内容 flex 布局
- 状态标签（进行中=primary、已成团=accent、已结束=foreground）
- 省¥xx 标签
- 进度条：当前人数/成团人数 + 百分比，进行中=primary色，已成团=accent色
- 底部：团长头像+名称、取货地点、截止时间
- 添加 data-product-shop 属性
### PostCard（论坛帖子卡片）
- 属性：id, title, content, category, author, likes, comments, isPinned, hasAttachment, postedAt, tags
- 作者头像 + 标题 + 正文(2行截断) + 标签行(#tag) + 底部信息栏
- 置顶帖显示 "置顶" 标签(ri-pushpin-line + accent色)
- 底部：点赞/评论/分享三个图标按钮
### PaymentModal（支付弹窗，可复用）
- Props: isOpen, onClose, amount, title, recipient
- 两阶段：扫码支付 → 已支付确认
- 第一阶段：支付金额大字、模拟二维码图片（用 Stable Diffusion 生成）、收款方信息、安全提示
- 第二阶段：绿色对勾动画 + 确认已发送提示，2秒后自动关闭
- 点击遮罩可关闭
---
## 五、页面详细描述
### 1. 首页 Home (/)
五个区块：
- **Hero**：全宽背景图（校园航拍/黄昏氛围），上覆黑色半透明渐变，居中标题「校园淘 · 让校园生活更便捷」+ 副标题 + 两个CTA按钮（逛二手/看拼团）
- **Feature Cards**：三张导航卡片（二手交易/拼团团购/校园论坛），z-10 上浮到 Hero 底部重叠区
- **热门二手**：4张 ProductCard 网格 + "查看全部"链接
- **进行中的拼团**：最多3条 GroupBuyCard 列表，bg-background-100 背景区分
- **热门讨论**：最多3条 PostCard 列表
- **CTA 区**：号召发布闲置/发起拼团，bg-background-100 背景
### 2. 二手交易 Secondhand (/secondhand)
- 标题栏：h1 "二手交易" + 副标题 + 「发布商品」按钮(primary-500)
- 搜索栏：搜索框 + 筛选按钮 + 排序下拉（最新发布/价格升降/最多浏览）
- 分类标签栏：7个分类(全部/电子产品/生活电器/图书教材/家具/文体用品/服饰美妆/其他) + "我的"按钮
- 校区筛选：点击筛选按钮展开（主校区/东校区/西校区/南校区/北校区）
- 商品网格：4列 ProductCard
- 空状态：无结果时显示图标 + "没有找到相关商品"
- 「我的」用当前用户（硬编码"小李同学"）过滤，active时为 accent-500 高亮
- 点击「发布商品」弹出 PublishProductModal（详见下文）
### 3. 二手详情 SecondhandDetail (/secondhand/:id)
- 面包屑：首页 > 二手交易 > 商品名
- 左侧：大图(4:3) + 缩略图条（当前用同图模拟），左上角校区/分类标签，已售遮罩
- 右侧：
  - 标题(h1) + 价格(accent-600大字) + 原价划线 + 省¥xx标签
  - 卖家信息卡（头像/名字/评分/认证 + "私聊卖家"按钮跳转/chat/卖家名）
  - 浏览数/发布时间/校区
  - 商品描述
  - 标签行（面交优先/支持验货/校内交易）
  - 操作按钮：立即支付(accent-500，已售禁用) + 收藏切换(心形填充/线框) + 分享
  - 安全提示(amber色调)
- 已售商品禁用支付按钮
- 支付弹窗复用 PaymentModal
### 4. 拼团列表 GroupBuy (/groupbuy)
- 标题栏 + 搜索框 +「发起拼团」按钮
- 状态筛选标签：全部/进行中/已成团/已结束 + "我的"按钮
- 列表模式（flex flex-col）展示 GroupBuyCard
- 底部「拼团流程」四步说明区域（发起/加入 → 等待成团 → 统一购买 → 线下取货）
- bg-background-100 背景区分
- 点击「发起拼团」弹出 PublishGroupBuyModal
### 5. 拼团详情 GroupBuyDetail (/groupbuy/:id)
- 面包屑 + 左大图 + 右信息区（跟二手详情类似布局）
- 团购价(accent-600大字) + 原价划线 + 省¥xx
- 进度条（大号 2.5px）+ 已参团人数 + 百分比 + 剩余提示
- 团长信息卡 + "私聊团长"按钮
- 取货地点 + 截止时间
- 操作按钮：立即支付(进行中) / 已成团/已结束(禁用) + 报名参团切换(isJoined状态) + 分享
- 安全提示
### 6. 论坛列表 Forum (/forum)
- 标题栏 + 搜索框 +「发帖」按钮
- 分类标签：全部/选课攻略/活动通知/学习交流/兼职招聘/失物招领/生活杂谈/其他 + "我的"
- 热门/最新 双段切换器（rounded-full pill 风格）
- 帖子列表：PostCard 纵向排列
- 点击「发帖」弹出 PublishPostModal
### 7. 论坛详情 ForumDetail (/forum/:id)
- 面包屑 + 置顶/分类标签 + 标题(h1)
- 作者信息行：头像/名字/时间 + 浏览量/点赞(可切换)/分享
- 正文内容(pre-line)
- 标签行
- 评论区：
  - 评论列表（头像 + 名字/时间 + 内容 + 点赞/回复按钮）
  - 评论输入区（当前用户头像 + textarea 500字限制 + 字符计数 + 发布按钮，为空时禁用）
### 8. 个人中心 Profile (/profile)
- 顶部信息栏：大头像 + 昵称 + 校区标签 + 院系年级 + 四组统计(完成交易/发布商品/参与拼团/评分) + "编辑资料"按钮
- Tab栏（sticky top-16）：我的发布/我的收藏/交易记录/我的拼团/评价
- Tab内容：
  - 我的发布：列表，每项含图片/标题/状态/价格/时间/浏览 + 编辑/删除图标按钮
  - 我的收藏：3列卡片网格，图片+标题+价格+卖家+时间
  - 交易记录：列表，每项含类型图标(买入/卖出)+商品名+日期+价格+对象+星级
  - 我的拼团：列表，每项含角色(团长crown图标/团员user图标)+标题+状态+价格+加入时间
  - 评价：卡片列表，每项含评价人头像/名字/日期/商品+星级+评语
### 9. 编辑资料 EditProfile (/profile/edit)
- 左侧头像区(sticky)：大头像 + 更换照片按钮(相机图标) + 名字 + 评分/交易数
- 右侧表单区：
  - 基本信息：昵称/校区(下拉)/院系/年级(下拉)/个人简介(textarea 200字)
  - 联系方式：微信/QQ
  - 保存按钮（点击后显示「已保存」对勾2秒）+ 取消按钮
- 账户管理区（Danger Zone）：
  - 退出登录：二次确认弹窗（带图标+文字），确认跳转首页
  - 注销账号：需输入"确认注销"四个字才能点击确认按钮，按钮accent红色
### 10. 聊天系统 Chat (/chat 或 /chat/:contactId)
- 双栏布局（h-[calc(100vh-128px)]）：
  - 左栏(w-80 lg:w-96)：联系人列表，每项含头像+在线绿点+名字+最后消息+时间+来源商品+未读红点(accent色)
  - 右栏（flex-1）：
    - 顶部：返回按钮(移动端) + 聊天对象头像/名字/在线状态
    - 消息区：气泡对话，自己发=primary-500暖色实心右对齐，对方=白底边框左对齐
    - 底部输入：圆角输入框 + 发送按钮(ri-send-plane-fill，为空时灰色禁用)
    - 支持回车发送
- 未选择聊天时：中间显示引导占位（图标 + "选择一条消息开始聊天"）
- 移动端：选择聊天后左栏隐藏，显示右栏全屏
---
## 六、发布弹窗（三个）
### PublishProductModal
- 图片上传（虚线框 + 点击触发 file input + 实时预览 + 提示"支持 JPG、PNG，建议尺寸 800×600"）
- 商品标题（60字 + 计数）*
- 分类下拉（排除"全部"）+ 校区下拉（排除"全部校区"）
- 售价/原价双列（¥前缀，原价选填）*
- 商品描述（textarea 500字 + 计数）*
- 联系方式：微信/QQ 单选 + 输入框
- 安全提示（amber色）
- 发布按钮：必填项未填时灰色禁用
- 成功：对勾动画 + "发布成功！" + 2秒关闭
- 关闭时重置所有表单
### PublishGroupBuyModal
- 图片上传（同上）
- 团购标题（60字 + 计数）*
- 团购价/原价双列 *
- 成团人数(min=2)/截止时间(date input) *
- 取货地点 *
- 团购说明（textarea 500字）*
- 安全提示：提醒团长负责统计/采购/分发
- 成功："拼团发起成功！"
### PublishPostModal
- 帖子标题（80字 + 计数）*
- 选择板块（下拉，排除"全部"）
- 正文内容（textarea 500字，6行高度 + 计数）*
- 标签输入（逗号分隔，最多3个）
- 小贴士：建议用【前缀】格式
- 成功："发布成功！"
---
## 七、Mock 数据
### 二手商品（secondhand.ts，导出 secondhandProducts、categories、campuses）
- 8件商品：MacBook(5.2k)/豆浆机(168)/人体工学椅(380)/考研资料(45)/索尼耳机(850)/iPad Air(3.8k)/小冰箱(220已售)/吉他(350)
- 每件包含：id, title, description(完整描述), price, originalPrice, category, image(用Stable Diffusion生成), seller{name,avatar,rating}, status, campus, postedAt, views, likes
- categories: ['全部', '电子产品', '生活电器', '图书教材', '家具', '文体用品', '服饰美妆', '其他']
- campuses: ['全部校区', '主校区', '东校区', '西校区', '南校区', '北校区']
### 拼团（groupbuy.ts，导出 groupBuys、groupBuyStatuses）
- 6个拼团：坚果大礼包(16/20人)/公牛插座(22/30人)/星巴克保温杯(已成团)/法兰绒睡衣(8/20人)/考试套装(43/50人)/折叠桌(10/15人)
- groupBuyStatuses: ['全部', '进行中', '已成团', '已结束']
### 论坛帖子（forum.ts，导出 forumPosts、forumCategories）
- 8篇帖子：选课避坑(置顶)/音乐节通知(置顶)/四级经验/校园大使招聘/失物招领/体育选课/考研分享会/外卖推荐
- 每篇含评论数(comments)字段
- forumCategories: ['全部', '选课攻略', '活动通知', '学习交流', '兼职招聘', '失物招领', '生活杂谈', '其他']
### 个人中心（profile.ts，导出 userProfile、myProducts、myFavorites、tradeRecords、myGroupBuys、reviews）
- userProfile: 小王同学/主校区/计算机大三/4.8分/23笔交易/15发布/8拼团
- myProducts: 2条
- myFavorites: 3条
- tradeRecords: 3条（卖出2条/买入1条，各带星级）
- myGroupBuys: 2条（参团1条/团长1条）
- reviews: 3条
### 图片生成规则
- 所有图片用 Stable Diffusion（https://readdy.ai/api/search-image?width=...&height=...&seq=...&orientation=...&query=...）
- 每个图片URL必须是完整硬编码字符串，不能用模板变量或拼接
- 提示词用英文，描述加上"minimalist design, cream background, warm lighting"等保持风格统一
---
## 八、交互细节
- 所有图片 hover 加 scale-105 过渡
- 按钮 hover 加颜色过渡
- 弹窗：fixed inset-0 z-50，半透明遮罩点击关闭，内容区居中
- 「我的」筛选用硬编码用户名匹配（二手="小李同学"，团购="吃货团长"，论坛="课代表小明"）
- 支付弹窗/发布弹窗的成功状态：绿色对勾 + 2秒自动关闭
- 论坛评论：本地点赞数+1，发布新评论追加到列表
- 聊天：回车发送，发送后清空输入框
- 面包屑统一：首页 > 列表页 > 详情
---
## 九、Move 端适配
- Hero: h-[420px] md:h-[520px]
- 标题: text-3xl md:text-5xl
- 网格: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3/4
- 导航: hidden md:flex，移动端 hamburger 按钮 md:hidden
- 聊天: 移动端隐藏联系人栏
---
请完全按照以上规范生成全部代码。不要跳过任何页面或组件，不要使用蓝色/紫色，不要使用 box-shadow。全部 Mock 数据填入，确保每个页面都有丰富真实的内容。