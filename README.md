# 云幻教育科技股份有限公司 - 企业官网

> 3D/AR/VR 教育产品领航者 | 全栈企业官网系统

## 项目简介

云幻教育科技股份有限公司企业官网，采用前后端分离架构。前台展示企业品牌形象与产品方案，后台管理系统支持文章发布、图片管理、网站内容在线编辑，无需修改代码即可更新网站内容。

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| **前端框架** | React 19 + TypeScript | SPA 单页应用 |
| **构建工具** | Vite 7 | 开发热更新 + 生产构建 |
| **CSS 方案** | Tailwind CSS v4 | 原子化 CSS + CSS 变量设计系统 |
| **UI 组件库** | shadcn/ui (40+ 组件) | Radix UI 基础 + 可定制样式 |
| **动画** | Framer Motion | 页面切换 + 内容入场动画 |
| **路由** | React Router DOM v7 | 前端路由 + 嵌套布局 |
| **HTTP 客户端** | Axios | API 请求 + 拦截器 |
| **后端框架** | Express + TypeScript | RESTful API 服务 |
| **ORM** | Prisma 5 | 数据库模型 + 迁移 + 类型安全查询 |
| **数据库** | PostgreSQL | 关系型数据库 |
| **文件上传** | Multer | 图片上传 + 磁盘存储 |
| **参数校验** | Zod | 运行时类型校验 |
| **包管理** | pnpm | 快速 + 磁盘节省 |

## 项目结构

```
/
├── frontend/                    # 前端项目
│   ├── public/images/           # 静态图片资源
│   ├── src/
│   │   ├── App.tsx              # 根组件 + 路由配置
│   │   ├── main.tsx             # 入口文件
│   │   ├── index.css            # 全局样式 + 设计系统变量
│   │   ├── components/
│   │   │   ├── layout/          # 公共布局（Header, Footer）
│   │   │   ├── admin/           # 后台布局（AdminLayout）
│   │   │   ├── ui/              # shadcn/ui 组件库（40+）
│   │   │   ├── AnimatedRoutes.tsx
│   │   │   ├── PageTransition.tsx
│   │   │   └── MotionPrimitives.tsx
│   │   ├── hooks/               # 数据 Hooks
│   │   │   ├── use-articles.ts  # 文章 CRUD
│   │   │   ├── use-images.ts    # 图片上传/删除
│   │   │   └── use-site-config.ts # 网站配置
│   │   ├── lib/
│   │   │   └── api-client.ts   # Axios 封装
│   │   └── pages/               # 页面组件
│   │       ├── Index.tsx        # 首页
│   │       ├── About.tsx        # 关于我们
│   │       ├── Products.tsx    # 产品服务
│   │       ├── Contact.tsx      # 联系我们
│   │       └── admin/           # 后台管理页面
│   │           ├── Dashboard.tsx   # 仪表盘
│   │           ├── Articles.tsx    # 文章管理
│   │           ├── Images.tsx      # 图片管理
│   │           └── Settings.tsx    # 网站设置
│   └── vite.config.ts          # Vite 配置（含 API 代理）
│
├── backend/                     # 后端项目
│   ├── prisma/
│   │   ├── schema.prisma       # 数据库模型定义
│   │   └── seed.ts             # 初始化数据脚本
│   ├── uploads/                 # 上传图片存储目录
│   ├── src/
│   │   ├── index.ts            # 服务入口
│   │   ├── config/
│   │   │   ├── db.ts          # Prisma 客户端
│   │   │   └── env.ts         # 环境变量校验
│   │   └── modules/
│   │       ├── article.ts      # 文章 API
│   │       ├── image.ts        # 图片 API
│   │       └── site-config.ts  # 网站配置 API
│   └── .env                    # 环境变量
│
└── docs/                        # 项目文档
    ├── design_system.json      # 设计系统配置
    └── product/features.md     # 功能需求文档
```

## 页面路由

### 前台展示页面

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 轮播横幅、产品方案、公司简介、成功案例、新闻动态 |
| `/about` | 关于我们 | 公司简介、文化理念、荣誉资质、发展历程 |
| `/products` | 产品服务 | 产品分类Tab、解决方案、技术优势 |
| `/contact` | 联系我们 | 联系方式、在线留言、办公地点 |

### 后台管理页面

| 路径 | 页面 | 说明 |
|------|------|------|
| `/admin` | 仪表盘 | 数据统计、最近文章 |
| `/admin/articles` | 文章管理 | 新建/编辑/删除/发布文章 |
| `/admin/images` | 图片管理 | 上传/删除图片、复制路径 |
| `/admin/settings` | 网站设置 | 修改公司信息、联系方式、横幅内容 |

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/articles` | 获取文章列表（支持 ?category=&published= 筛选） |
| GET | `/api/articles/:id` | 获取单篇文章 |
| POST | `/api/articles` | 创建文章 |
| PUT | `/api/articles/:id` | 更新文章 |
| DELETE | `/api/articles/:id` | 删除文章 |
| GET | `/api/images` | 获取图片列表 |
| POST | `/api/images` | 上传图片（multipart/form-data） |
| DELETE | `/api/images/:id` | 删除图片 |
| GET | `/api/site-config` | 获取全部配置 |
| GET | `/api/site-config/:key` | 获取单项配置 |
| PUT | `/api/site-config/:key` | 更新/创建单项配置 |
| POST | `/api/site-config/batch` | 批量更新配置 |

## 数据库模型

### Article（文章）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| title | String | 文章标题 |
| content | String | 文章正文 |
| summary | String? | 文章摘要 |
| cover | String? | 封面图路径 |
| category | String | 分类（news/policy/industry/media） |
| published | Boolean | 是否发布 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### Image（图片）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| filename | String | 文件名 |
| original | String | 原始文件名 |
| path | String | 访问路径 |
| alt | String? | 图片描述 |
| category | String? | 分类（general/banner/product/case/about） |
| createdAt | DateTime | 上传时间 |

### SiteConfig（网站配置）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| key | String | 配置键名（唯一） |
| value | String | 配置值 |

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8
- PostgreSQL >= 14

### 启动步骤

```bash
# 1. 克隆仓库
git clone https://github.com/280347211/yunhuan-edu-website.git
cd yunhuan-edu-website

# 2. 安装后端依赖
cd backend
pnpm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 设置数据库连接等参数

# 4. 初始化数据库
npx prisma db push
npx tsx prisma/seed.ts

# 5. 启动后端（端口 3000）
pnpm dev

# 6. 新开终端，安装前端依赖
cd ../frontend
pnpm install

# 7. 启动前端（端口 5173）
pnpm dev
```

启动后访问：
- 前台页面：http://localhost:5173
- 后台管理：http://localhost:5173/admin
- 后端 API：http://localhost:3000/api/health

---

## 生产部署指南

### 方式一：传统服务器部署（推荐新手）

#### 1. 准备服务器

```bash
# 推荐配置：2核4G + 40GB SSD
# 操作系统：Ubuntu 22.04 LTS

# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 pnpm
npm install -g pnpm

# 安装 PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 安装 Nginx（反向代理）
sudo apt install -y nginx
```

#### 2. 配置 PostgreSQL

```bash
# 切换到 postgres 用户
sudo -u postgres psql

# 创建数据库和用户
CREATE DATABASE yunhuan_edu;
CREATE USER yunhuan WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE yunhuan_edu TO yunhuan;
\q
```

#### 3. 部署项目代码

```bash
# 创建项目目录
sudo mkdir -p /opt/yunhuan-edu
sudo chown $USER:$USER /opt/yunhuan-edu

# 克隆代码
cd /opt/yunhuan-edu
git clone https://github.com/280347211/yunhuan-edu-website.git .

# 后端安装 + 构建
cd backend
pnpm install
cp .env.example .env
# 编辑 .env，修改 DATABASE_URL 为线上数据库地址
nano .env
```

编辑 `/opt/yunhuan-edu/backend/.env`：

```env
DATABASE_URL="postgres://yunhuan:your_secure_password@localhost:5432/yunhuan_edu?schema=public"
PORT=3000
UPLOAD_DIR="uploads"
```

```bash
# 初始化数据库
cd /opt/yunhuan-edu/backend
npx prisma db push
npx tsx prisma/seed.ts

# 构建后端 TypeScript
npx tsc

# 前端安装 + 构建
cd /opt/yunhuan-edu/frontend
pnpm install
pnpm build
# 构建产物在 frontend/dist/ 目录
```

#### 4. 配置 Nginx 反向代理

创建 `/etc/nginx/sites-available/yunhuan-edu`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名

    # 前端静态文件
    location / {
        root /opt/yunhuan-edu/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 代理
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 上传图片代理
    location /uploads/ {
        proxy_pass http://127.0.0.1:3000;
    }

    # 图片缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        root /opt/yunhuan-edu/frontend/dist;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

```bash
# 启用站点配置
sudo ln -s /etc/nginx/sites-available/yunhuan-edu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. 配置 HTTPS（Let's Encrypt）

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
# 按提示操作，证书会自动配置到 Nginx
```

#### 6. 使用 PM2 管理后端进程

```bash
# 安装 PM2
npm install -g pm2

# 启动后端服务
cd /opt/yunhuan-edu/backend
pm2 start dist/index.js --name yunhuan-api

# 设置开机自启
pm2 startup
pm2 save
```

常用 PM2 命令：

```bash
pm2 status          # 查看进程状态
pm2 logs yunhuan-api # 查看日志
pm2 restart yunhuan-api # 重启服务
pm2 stop yunhuan-api    # 停止服务
```

#### 7. 更新部署

```bash
cd /opt/yunhuan-edu

# 拉取最新代码
git pull origin master

# 更新后端
cd backend
pnpm install
npx prisma db push
npx tsc
pm2 restart yunhuan-api

# 更新前端
cd ../frontend
pnpm install
pnpm build

# 无需重启 Nginx，静态文件自动生效
```

---

### 方式二：Docker 部署（推荐团队）

#### 1. 创建 Docker Compose 文件

在项目根目录创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: yunhuan_edu
      POSTGRES_USER: yunhuan
      POSTGRES_PASSWORD: your_secure_password
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      DATABASE_URL: postgres://yunhuan:your_secure_password@postgres:5432/yunhuan_edu?schema=public
      PORT: 3000
      UPLOAD_DIR: uploads
    volumes:
      - upload_data:/app/uploads
    ports:
      - "3000:3000"
    depends_on:
      - postgres

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/usr/share/nginx/html
      - ./certbot/conf:/etc/letsencrypt
    depends_on:
      - backend

volumes:
  pg_data:
  upload_data:
```

#### 2. 创建后端 Dockerfile

在 `backend/` 目录创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN npx prisma generate && npx tsc

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
RUN mkdir -p uploads
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

#### 3. 启动

```bash
# 构建前端
cd frontend && pnpm install && pnpm build

# 启动所有服务
docker compose up -d

# 初始化数据库
docker compose exec backend npx prisma db push
docker compose exec backend npx tsx prisma/seed.ts
```

---

### 方式三：Vercel + Supabase 部署（最简单）

适合小型项目，无需管理服务器。

1. **数据库**：在 [Supabase](https://supabase.com/) 创建免费 PostgreSQL 数据库
2. **后端**：使用 [Railway](https://railway.app/) 部署 Express 服务，设置环境变量 `DATABASE_URL` 为 Supabase 连接串
3. **前端**：在 [Vercel](https://vercel.com/) 导入 GitHub 仓库，配置：
   - Root Directory: `frontend`
   - Build Command: `pnpm build`
   - Output Directory: `dist`
   - 环境变量：`VITE_API_URL` = Railway 后端地址

---

## 常见问题

**Q: 后台上传的图片存在哪里？**
A: 开发环境存储在 `backend/uploads/`，生产环境建议配置 OSS（如腾讯云 COS、阿里云 OSS）替代本地存储。

**Q: 如何修改网站配色和字体？**
A: 编辑 `frontend/src/index.css` 中的 CSS 变量（如 `--primary`、`--font-family`），所有页面会自动生效。

**Q: 如何添加新的页面？**
A: 1) 在 `frontend/src/pages/` 创建新页面组件；2) 在 `App.tsx` 添加路由；3) 在 `Header.tsx` 添加导航链接。

**Q: 数据库迁移如何操作？**
A: 修改 `backend/prisma/schema.prisma` 后运行 `cd backend && npx prisma db push`。生产环境建议使用 `npx prisma migrate dev` 管理迁移版本。

## License

Copyright 2024 云幻教育科技股份有限公司. All rights reserved.
