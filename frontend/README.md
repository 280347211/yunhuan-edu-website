# 前端项目说明

云幻教育科技股份有限公司企业官网 - 前端应用

## 技术栈

- **React 19** + TypeScript - UI 框架
- **Vite 7** - 构建工具
- **Tailwind CSS v4** - 原子化 CSS
- **shadcn/ui** - 40+ UI 组件库
- **Framer Motion** - 页面切换 + 内容动画
- **React Router DOM v7** - 前端路由
- **Axios** - HTTP 请求
- **TanStack React Query** - 服务端状态管理

## 目录结构

```
src/
├── App.tsx                # 根组件 + 路由配置
├── main.tsx               # 入口文件
├── index.css              # 全局样式 + 设计系统变量
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx     # 顶部导航（滚动变色 + 移动端Sheet菜单）
│   │   └── Footer.tsx     # 底部信息栏
│   ├── admin/
│   │   └── AdminLayout.tsx # 后台侧边栏布局
│   ├── ui/                # shadcn/ui 组件（40+，不修改）
│   ├── AnimatedRoutes.tsx  # 页面切换动画容器
│   ├── PageTransition.tsx   # 页面过渡动画
│   └── MotionPrimitives.tsx # FadeIn / Stagger / HoverLift
│
├── hooks/
│   ├── use-articles.ts     # 文章 CRUD
│   ├── use-images.ts       # 图片上传/删除
│   ├── use-site-config.ts  # 网站配置读写
│   └── use-mobile.ts       # 响应式断点
│
├── lib/
│   ├── api-client.ts      # Axios 实例（/api 前缀 + 拦截器）
│   └── utils.ts            # cn() 工具函数
│
├── pages/
│   ├── Index.tsx           # 首页
│   ├── About.tsx           # 关于我们
│   ├── Products.tsx        # 产品服务
│   ├── Contact.tsx         # 联系我们
│   ├── NotFound.tsx        # 404
│   └── admin/
│       ├── Dashboard.tsx   # 后台仪表盘
│       ├── Articles.tsx    # 文章管理
│       ├── Images.tsx      # 图片管理
│       └── Settings.tsx    # 网站设置
│
└── types/                  # 类型定义
```

## 设计系统

### 配色

CSS 变量定义在 `index.css` 的 `:root` 中：

| 变量 | 色值 | 用途 |
|------|------|------|
| `--primary` | oklch 蓝色 | 主色调，按钮/链接/强调 |
| `--secondary` | oklch 浅灰 | 次要背景 |
| `--accent` | oklch 琥珀 | 特殊强调 |
| `--background` | oklch 白色 | 页面背景 |
| `--foreground` | oklch 深蓝 | 正文文字 |

### 自定义 CSS 类

| 类名 | 用途 |
|------|------|
| `.section-en` | 区块英文副标题样式 |
| `.section-cn` | 区块中文主标题样式 |
| `.accent-bar` | 标题下方装饰条 |
| `.hero-gradient` | 首屏渐变背景 |
| `.hero-gradient-overlay` | 首屏渐变遮罩 |

### 动画体系

三层动画，全部基于 Framer Motion：

| 层级 | 组件 | 用途 |
|------|------|------|
| 页面切换 | `<AnimatedRoutes>` | 包裹 `<Routes>`，popLayout 模式 |
| 页面过渡 | `<PageTransition>` | 包裹每个页面，4种模式（fade/slide-up/slide-fade/scale） |
| 内容动画 | `<FadeIn>/<Stagger>/<HoverLift>` | 页面内部元素入场 + 交互效果 |

**使用规则：**
- Header/Footer 放在 `<AnimatedRoutes>` 外部（不参与切换动画）
- 所有标题用 `<FadeIn>` 包裹
- 列表/网格用 `<Stagger>` + `variants={fadeUp}` 包裹
- 卡片用 `<HoverLift>` 包裹

## API 代理

开发环境通过 Vite 代理访问后端（配置在 `vite.config.ts`）：

```
浏览器 → :5173 → Vite proxy(/api) → :3000(后端)
```

前端代码中所有 API 请求使用相对路径 `/api/...`，不需要硬编码后端地址。

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器（端口 5173）
pnpm dev

# 生产构建
pnpm build

# 预览构建产物
pnpm preview

# 代码检查
pnpm lint
```

## 新增页面步骤

1. 在 `src/pages/` 创建新组件，使用 MotionPrimitives 包裹内容
2. 在 `App.tsx` 添加 `<Route>`，设置 `data-genie-key` 和 `data-genie-title`
3. 在 `components/layout/Header.tsx` 的 `navItems` 添加导航项
4. 如需数据交互，在 `hooks/` 创建对应 Hook，使用 `api-client.ts` 调用后端 API

## 构建产物

`pnpm build` 后生成 `dist/` 目录：

```
dist/
├── index.html          # SPA 入口
└── assets/
    ├── index-xxx.css   # 合并样式（~120KB gzipped ~19KB）
    └── index-xxx.js    # 合并脚本（~620KB gzipped ~200KB）
```

部署时将 `dist/` 目录放到 Nginx 静态目录，配置 `try_files $uri /index.html` 即可。
