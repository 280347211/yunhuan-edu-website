# 云幻教育科技股份有限公司 - 企业官网

> 3D/AR/VR 教育产品领航者 | Next.js SSR 全栈企业官网系统（SEO 优化版）

## 项目简介

云幻教育科技股份有限公司企业官网，采用 **Next.js SSR 服务端渲染** 架构，完美解决百度搜索引擎抓取问题。前台页面服务端预渲染完整 HTML 内容，后台管理系统支持文章发布、图片管理、网站内容在线编辑。

**SEO 核心优势：**
- 百度蜘蛛访问任意页面 → 返回 **完整 HTML**（标题 + 正文 + 图片），不是空壳
- 后台发布新文章/产品 → **立即生效**，无需重新构建
- 每个页面独立的 `<title>` / `<meta description>` / Open Graph 标签
- 旧站 URL **301 重定向**到新地址，搜索权重平滑转移
- sitemap.xml + robots.txt 已就绪，可提交百度站长平台

本项目兼容旧版 ThinkPHP + MySQL 数据库，保留 `dc_` 前缀表名，可直接导入历史数据。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端框架** | Next.js 15 (App Router) | SSR 服务端渲染，对 SEO 友好 |
| **React 版本** | React 19 + TypeScript | UI 渲染层 |
| **CSS 方案** | Tailwind CSS v4 | 原子化 CSS + CSS 变量设计系统 |
| **UI 组件库** | shadcn/ui (55 组件) | Radix UI 基础 + 可定制样式 |
| **动画** | Framer Motion | 页面切换 + 内容入场动画 |
| **路由** | Next.js App Router 文件路由 | Server Components + Client Components 混合 |
| **HTTP 客户端** | Axios | API 请求（管理后台使用） |
| **后端框架** | Express + TypeScript | RESTful API 服务 |
| **ORM** | Prisma 5 | 数据库模型 + 类型安全查询 |
| **数据库** | MySQL 5.7+ | 兼容旧版 ThinkPHP 数据 |
| **文件上传** | Multer | 图片上传 + 磁盘存储 |
| **进程管理** | PM2 | 生产环境 Node.js 进程管理 |
| **反向代理** | Nginx | 统一入口 + SSL + 301 重定向 |
| **包管理** | pnpm | 快速 + 磁盘节省 |

## 项目结构

```
/
├── frontend/                    # Next.js 前端项目
│   ├── app/                     # Next.js App Router 目录（SSR）
│   │   ├── layout.tsx          # 根布局（Header + Footer + 元信息）
│   │   ├── page.tsx            # 首页（SSR + 客户端混合）
│   │   ├── HomePageClient.tsx  # 首页客户端组件（轮播/动画）
│   │   ├── globals.css         # 全局样式 + 设计系统变量
│   │   ├── not-found.tsx       # 404 页面
│   │   ├── about/
│   │   │   ├── page.tsx        # 关于我们（SSR）
│   │   │   └── AboutClient.tsx  # 关于客户端组件
│   │   ├── products/
│   │   │   ├── page.tsx        # 产品服务（SSR）
│   │   │   └── ProductsClient.tsx
│   │   ├── contact/
│   │   │   ├── page.tsx        # 联系我们（SSR）
│   │   │   └── ContactClient.tsx
│   │   └── admin/
│   │       ├── layout.tsx      # 管理后台布局
│   │       ├── page.tsx        # 仪表盘
│   │       ├── articles/      # 文章管理
│   │       ├── images/        # 图片管理
│   │       └── settings/       # 网站设置
│   ├── public/                  # 静态资源（直接服务）
│   │   ├── images/           # SVG 图片资源
│   │   ├── sitemap.xml      # SEO 站点地图
│   │   └── robots.txt       # 爬虫规则
│   ├── src/                     # 共享源码（客户端组件/hooks/lib）
│   │   ├── components/
│   │   │   ├── layout/       # Header, Footer（已适配 next/link）
│   │   │   └── ui/            # shadcn/ui 组件库（55 个）
│   │   ├── hooks/             # 数据 Hooks
│   │   │   ├── use-articles.ts
│   │   │   ├── use-products.ts
│   │   │   ├── use-categories.ts
│   │   │   ├── use-images.ts
│   │   │   └── use-site-config.ts
│   │   ├── lib/api-client.ts  # Axios 封装
│   │   └── MotionPrimitives.tsx # Framer Motion 动画组件
│   ├── scripts/
│   │   └── generate-sitemap.js # 动态生成 sitemap 的脚本
│   ├── next.config.ts          # Next.js 配置（API 代理 + 图片）
│   └── package.json
│
├── backend/                     # Express 后端项目
│   ├── prisma/schema.prisma    # 数据库模型定义（dc_ 表映射）
│   ├── public/Uploads/         # 上传图片目录
│   ├── src/
│   │   ├── index.ts            # Express 入口
│   │   ├── config/            # DB 客户端 + 编码修复工具
│   │   └── modules/
│   │       ├── article.ts      # 文章 CRUD API
│   │       ├── product.ts      # 产品 API
│   │       ├── category.ts     # 分类 API
│   │       ├── slide.ts        # 轮播图 API
│   │       ├── config.ts       # 网站配置 API
│   │       └── image.ts        # 图片上传 API
│   └── .env
│
├── deploy/                      # ECS 部署文件
│   ├── nginx.conf              # Nginx 配置（含 301 重定向规则）
│   └── deploy.sh               # 一键部署脚本
│
└── docs/                        # 项目文档
```

## 页面路由

### 公开页面（SSR 渲染，SEO 友好）

| 路径 | 页面 | SEO 信息 |
|------|------|---------|
| `/` | 首页 | 轮播横幅、产品方案、公司简介、新闻动态 |
| `/about` | 关于我们 | 公司简介、文化理念、荣誉资质、发展历程 |
| `/products` | 产品服务 | 产品分类Tab、解决方案、技术优势 |
| `/contact` | 联系我们 | 联系方式、在线留言、办公地点 |

### 管理后台（CSR，无需 SEO）

| 路径 | 页面 | 说明 |
|------|------|------|
| `/admin` | 仪表盘 | 数据统计、最近文章 |
| `/admin/articles` | 文章管理 | 新建/编辑/删除/发布文章 |
| `/admin/images` | 图片管理 | 上传/删除图片、复制路径 |
| `/admin/settings` | 网站设置 | 修改SEO、公司信息、联系方式 |

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/articles` | 文章列表 |
| POST/PUT/DELETE | `/api/articles/:id` | 文章 CRUD |
| GET | `/api/products` | 产品列表 |
| GET | `/api/categories` | 分类列表/树结构 |
| GET | `/api/slides` | 轮播图列表 |
| GET/PUT | `/api/config/:varname` | 网站配置读写 |
| GET/POST/DELETE | `/api/images` | 图片管理 |

## 数据库模型

兼容旧版 ThinkPHP 系统，使用 `dc_` 前缀表名。详见旧 README 或 `backend/prisma/schema.prisma`。

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8
- MySQL >= 5.7（Docker 容器或本地安装）

### 启动步骤

```bash
# 1. 克隆仓库
git clone https://github.com/280347211/yunhuan-edu-website.git
cd yunhuan-edu-website

# 2. 启动后端（端口 3000）
cd backend && pnpm install && pnpm dev

# 3. 新开终端，启动前端 Next.js 开发服务器（端口 5173）
cd frontend && pnpm install && pnpm dev
```

访问：
- 前台页面：http://localhost:5173
- 后台管理：http://localhost:5173/admin
- 后端 API：http://localhost:3000/api/health

## ECS 生产部署（推荐方案）

### 架构总览

```
阿里云 ECS (2C2G)
┌─────────────────────────────────────┐
│  Nginx (:80/:443)                │ ← 统一入口
│  ├─ /api/*     → Express (:3000)   │ ← 后端 API
│  ├─ /Uploads/*  → Express (:3000)   │ ← 图片服务
│  ├─ 旧URL重定向 → 301 到新 URL    │ ← SEO 权重转移
│  └─ 其他路径   → Next.js (:3001)  │ ← SSR 前端
├─────────────────────────────────────┤
│  Express (:3000)                  │
│  └→ MySQL (:3306)                 │ ← 数据库
├─────────────────────────────────────┤
│  Next.js (:3001)                  │
│  └→ 每次请求实时 SSR 渲染 HTML      │ ← SEO 完美
└─────────────────────────────────────┘
```

### 一键部署步骤

```bash
# 1. 将 deploy/deploy.sh 上传到 ECS
scp deploy/deploy.sh root@<ECS_IP>:/root/

# 2. SSH 登录 ECS 执行部署
ssh root@<ECS_IP>
chmod +x /root/deploy.sh && bash /root/deploy.sh

# 3. 部署完成后修改域名 DNS
# 将 www.magicloudedu.com A 记录指向此 ECS IP

# 4. （可选）申请 SSL 证书
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.magicloudedu.com -d magicloudedu.com

# 5. 提交 sitemap 到百度站长平台
# 访问 https://ziyuan.baidu.com/site/index#/
# 添加站点 → 提交 sitemap.xml
```

### 手动部署（如果不用一键脚本）

详见 `deploy/deploy.sh` 和 `deploy/nginx.conf` 中的详细配置。

### 更新部署流程

```bash
# 在本地更新代码后
git add -A && git commit -m "update" && git push

# 在 ECS 上拉取并重启
ssh root@<ECS_IP> "cd /var/www/yunhuan-edu && git pull"
pm2 restart yunhuan-api yunhuan-web

# 如有前端构建变更
cd /var/www/yunhuan-edu/frontend && pnpm build
pm2 restart yunhuan-web
```

### GitHub Actions 自动化部署（可选）

可在仓库设置 `.github/workflows/deploy.yml`，实现推送代码自动部署到 ECS。

## SEO 优化清单

### 已完成

- [x] **Next.js SSR 渲染** — 所有公开页面返回完整 HTML 给搜索引擎
- [x] **独立页面元信息** — 每个 `<head>` 有独特的 title/description/keywords
- [x] **Open Graph 标签** — 社交媒体分享时显示正确标题和描述
- [x] **语义化 HTML** — 正确使用 `<header>`/`<nav>`/`<main>`/`<article>`/`<section>`
- [x] **301 旧 URL 重定向** — 12 种旧 PHP URL 格式自动跳转到新地址
- [x] **sitemap.xml** — 包含所有公开页面的 URL 列表
- [x] **robots.txt** — 允许爬取公开页面，屏蔽管理后台和 API
- [x] **Gzip 压缩** — Nginx 层面压缩文本响应
- [x] **安全头** — X-Frame-Options/X-Content-Type-Options 等
- [x] **图片懒加载** — 使用 loading="lazy" 减少首屏加载时间

### 建议后续操作

- [ ] **提交百度站长平台** — 验证站点 → 提交 sitemap → 使用主动推送接口
- [ ] **提交 Google Search Console** — 同上，Google 支持 JS 渲染但提交更好
- [ ] **SSL 证书** — HTTPS 是排名因素之一
- [ ] **内容定期更新** — 搜索引擎喜欢活跃的网站
- [ ] **添加结构化数据** — Product/Article schema 标记（JSON-LD）

## 旧 URL 301 重定向规则一览

| 旧 URL (ThinkPHP) | 新 URL (Next.js) | 说明 |
|---|---|---|
| `/news/show/{id}.html` | `/news/{id}` | 新闻文章 |
| `/compnew/show/{id}.html` | `/cases/{id}` | 成功案例 |
| `/ldgh/show/{id}.html` | `/news/{id}` | 领导关怀 |
| `/jyzc/show/{id}.html` | `/news/policy/{id}` | 教育政策 |
| `/mtnews/show/{id}.html` | `/news/media/{id}` | 媒体报道 |
| `/jjfa/show/{id}.html` | `/products/solutions/{id}` | 解决方案 |
| `/hxxl/show/{id}.html` | `/products/chemistry/{id}` | 化学资源 |
| `/jysb/show/{id}.html` | `/products/equipment/{id}` | 教育装备 |
| `/xibei/show/{id}.html` | `/cases/northwest/{id}` | 西北案例 |
| `/kexue/show/{id}.html` | `/resources/science/{id}` | 科学课程 |

## 历史数据迁移

从旧版 ThinkPHP 系统迁移数据时，需要注意：

1. **表名兼容**：Prisma 使用 `@@map("dc_xxx")` 映射到旧 `dc_` 前缀表
2. **编码修复**：旧数据可能存在 UTF-8 双重编码，执行 SQL 修复语句即可
3. **图片路径**：旧版图片在 `/Uploads/` 目录，已配置兼容路由
4. **时间格式**：旧版使用 Unix 时间戳（秒），新版保持一致

## License

Copyright 2024-2025 云幻教育科技股份有限公司. All rights reserved.
