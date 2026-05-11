# 云幻教育科技股份有限公司 - 企业官网

> 3D/AR/VR 教育产品领航者 | 全栈企业官网系统

## 项目简介

云幻教育科技股份有限公司企业官网，采用前后端分离架构。前台展示企业品牌形象与产品方案，后台管理系统支持文章发布、图片管理、网站内容在线编辑，无需修改代码即可更新网站内容。

本项目兼容旧版 ThinkPHP + MySQL 数据库，保留 `dc_` 前缀表名，可直接导入历史数据。

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
| **ORM** | Prisma 5 | 数据库模型 + 类型安全查询 |
| **数据库** | MySQL 5.7+ | 兼容旧版 ThinkPHP 数据 |
| **文件上传** | Multer | 图片上传 + 磁盘存储 |
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
│   │   │   ├── use-products.ts  # 产品查询
│   │   │   ├── use-categories.ts # 分类查询 + 树结构
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
│   │   └── schema.prisma       # 数据库模型定义（映射 dc_ 表）
│   ├── public/Uploads/         # 旧版图片兼容目录
│   ├── uploads/                 # 新上传图片存储目录
│   ├── src/
│   │   ├── index.ts            # 服务入口
│   │   ├── config/
│   │   │   ├── db.ts          # Prisma 客户端
│   │   │   ├── env.ts         # 环境变量校验
│   │   │   └── encoding.ts    # UTF-8 编码修复工具
│   │   └── modules/
│   │       ├── article.ts      # 文章 API
│   │       ├── product.ts      # 产品 API
│   │       ├── category.ts     # 分类 API
│   │       ├── slide.ts        # 轮播图 API
│   │       ├── config.ts       # 网站配置 API
│   │       └── image.ts        # 图片上传 API
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
| `/` | 首页 | 轮播横幅、产品方案、公司简介、新闻动态 |
| `/about` | 关于我们 | 公司简介、文化理念、荣誉资质、发展历程 |
| `/products` | 产品服务 | 产品分类Tab、解决方案、技术优势 |
| `/contact` | 联系我们 | 联系方式、在线留言、办公地点 |

### 后台管理页面

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
| GET | `/api/articles` | 文章列表（?catid=&status=&keyword=&page=&pageSize=） |
| GET | `/api/articles/:id` | 单篇文章 |
| POST | `/api/articles` | 创建文章 |
| PUT | `/api/articles/:id` | 更新文章 |
| DELETE | `/api/articles/:id` | 删除文章 |
| GET | `/api/products` | 产品列表（?catid=&status=） |
| GET | `/api/products/:id` | 单个产品 |
| POST | `/api/products` | 创建产品 |
| PUT | `/api/products/:id` | 更新产品 |
| DELETE | `/api/products/:id` | 删除产品 |
| GET | `/api/categories` | 分类列表（?parentid=&ismenu=&module=） |
| GET | `/api/categories/tree` | 分类树结构 |
| GET | `/api/categories/:id` | 单个分类 |
| GET | `/api/slides` | 轮播图列表（?fid=） |
| GET | `/api/slides/:id` | 单个轮播图 |
| GET | `/api/config` | 全部配置（key-value） |
| GET | `/api/config/:varname` | 单项配置 |
| PUT | `/api/config/:varname` | 更新配置 |
| GET | `/api/images` | 图片列表 |
| POST | `/api/images` | 上传图片（multipart/form-data） |
| DELETE | `/api/images/:filename` | 删除图片 |

## 数据库模型

数据库兼容旧版 ThinkPHP 系统，使用 `dc_` 前缀表名。

### dc_article（文章）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| catid | Int | 分类ID |
| title | String | 文章标题 |
| content | MediumText | 文章正文（HTML） |
| description | MediumText | 文章摘要 |
| keywords | VarChar(500) | 关键词 |
| thumb | VarChar(100) | 缩略图路径 |
| status | Int | 状态（0=草稿 1=已发布） |
| username | VarChar(40) | 作者 |
| createtime | Int | 创建时间（Unix时间戳） |
| updatetime | Int | 更新时间（Unix时间戳） |

### dc_product（产品）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| catid | Int | 分类ID |
| title | VarChar(120) | 产品标题 |
| content | Text | 产品详情（HTML） |
| description | MediumText | 产品简介 |
| thumb | VarChar(100) | 缩略图 |
| iocimg | VarChar(80) | 图标图片 |
| index_content | Text | 首页展示内容 |
| advantages | Text | 产品优势 |
| pronum | VarChar(255) | 产品编号 |
| status | Int | 状态 |

### dc_category（分类）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SmallInt | 自增主键 |
| catname | VarChar(60) | 分类名称 |
| en_catname | VarChar(60) | 英文名称 |
| parentid | SmallInt | 父分类ID |
| module | Char(24) | 模块类型（Article/Product/Page等） |
| ismenu | Int | 是否显示在导航菜单 |

### dc_config（配置）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | SmallInt | 自增主键 |
| varname | VarChar(20) | 配置键名 |
| value | Text | 配置值 |
| info | VarChar(100) | 配置说明 |
| groupid | Int | 分组ID |

### dc_slide_data（轮播图）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | Int | 自增主键 |
| fid | Int | 轮播组ID |
| title | VarChar(30) | 标题 |
| pic | VarChar(150) | 图片路径 |
| link | VarChar(150) | 链接地址 |
| listorder | SmallInt | 排序 |

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8
- MySQL >= 5.7

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
# 编辑 .env 设置 MySQL 连接参数

# 4. 生成 Prisma Client
npx prisma generate

# 5. 导入旧数据库（如有）
# mysql -u root -p yunhuan < your_dump.sql

# 6. 启动后端（端口 3000）
pnpm dev

# 7. 新开终端，安装前端依赖
cd ../frontend
pnpm install

# 8. 启动前端（端口 5173）
pnpm dev
```

启动后访问：
- 前台页面：http://localhost:5173
- 后台管理：http://localhost:5173/admin
- 后端 API：http://localhost:3000/api/health

---

## 生产部署指南

### 方式一：传统服务器部署

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

# 安装 MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation

# 安装 Nginx（反向代理）
sudo apt install -y nginx
```

#### 2. 配置 MySQL

```bash
sudo mysql

# 创建数据库和用户
CREATE DATABASE yunhuan DEFAULT CHARACTER SET utf8mb4;
CREATE USER 'yunhuan'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON yunhuan.* TO 'yunhuan'@'localhost';
FLUSH PRIVILEGES;
```

#### 3. 部署项目代码

```bash
# 创建项目目录
sudo mkdir -p /opt/yunhuan-edu
sudo chown $USER:$USER /opt/yunhuan-edu

# 克隆代码
cd /opt/yunhuan-edu
git clone https://github.com/280347211/yunhuan-edu-website.git .

# 后端安装 + 配置
cd backend
pnpm install
cp .env.example .env
# 编辑 .env，修改 DATABASE_URL 为线上数据库地址
nano .env
```

编辑 `/opt/yunhuan-edu/backend/.env`：

```env
DATABASE_URL="mysql://yunhuan:your_secure_password@localhost:3306/yunhuan"
PORT=3000
UPLOAD_DIR="uploads"
```

```bash
# 生成 Prisma Client
cd /opt/yunhuan-edu/backend
npx prisma generate

# 导入旧数据（如有）
# mysql -u yunhuan -p yunhuan < /path/to/yunhuan.sql

# 构建后端
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
    server_name your-domain.com;

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

    # 上传图片代理（新版 + 旧版路径）
    location /uploads/ {
        proxy_pass http://127.0.0.1:3000;
    }
    location /Uploads/ {
        proxy_pass http://127.0.0.1:3000;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/yunhuan-edu /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. 配置 HTTPS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### 6. 使用 PM2 管理后端进程

```bash
npm install -g pm2
cd /opt/yunhuan-edu/backend
pm2 start dist/index.js --name yunhuan-api
pm2 startup
pm2 save
```

#### 7. 更新部署

```bash
cd /opt/yunhuan-edu
git pull origin master

# 更新后端
cd backend && pnpm install && npx prisma generate && npx tsc && pm2 restart yunhuan-api

# 更新前端
cd ../frontend && pnpm install && pnpm build
```

---

### 方式二：Docker 部署

```yaml
# docker-compose.yml
version: '3.8'

services:
  mysql:
    image: mysql:5.7
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: your_secure_password
      MYSQL_DATABASE: yunhuan
      MYSQL_CHARACTER_SET_SERVER: utf8mb4
      MYSQL_COLLATION_SERVER: utf8mb4_unicode_ci
    volumes:
      - mysql_data:/var/lib/mysql
      - ./yunhuan.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      DATABASE_URL: mysql://root:your_secure_password@mysql:3306/yunhuan
      PORT: 3000
      UPLOAD_DIR: uploads
    volumes:
      - upload_data:/app/uploads
      - old_uploads:/app/public/Uploads
    ports:
      - "3000:3000"
    depends_on:
      - mysql

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
      - ./frontend/dist:/usr/share/nginx/html
    depends_on:
      - backend

volumes:
  mysql_data:
  upload_data:
  old_uploads:
```

---

## 历史数据迁移

从旧版 ThinkPHP 系统迁移数据时，需要注意：

1. **表名兼容**：Prisma 使用 `@@map("dc_xxx")` 映射到旧 `dc_` 前缀表
2. **编码修复**：旧数据可能存在 UTF-8 双重编码，后端提供 `encoding.ts` 工具自动修复
3. **图片路径**：旧版图片在 `/Uploads/` 目录，已配置兼容路由
4. **时间格式**：旧版使用 Unix 时间戳（秒），新版保持一致

导入旧数据后，如遇中文乱码，可在 MySQL 中执行编码修复：

```sql
-- 修复双重编码的文章标题
UPDATE dc_article SET title = IFNULL(CONVERT(CAST(CONVERT(title USING latin1) AS BINARY) USING utf8), title);
-- 其他字段类似处理
```

## 常见问题

**Q: 后台上传的图片存在哪里？**
A: 新上传存储在 `backend/uploads/`，旧版图片在 `backend/public/Uploads/`。生产环境建议配置 OSS。

**Q: 导入旧数据库后中文显示乱码？**
A: 旧 ThinkPHP 可能产生 UTF-8 双重编码。执行"历史数据迁移"中的 SQL 修复语句即可。

**Q: 如何修改网站配色和字体？**
A: 编辑 `frontend/src/index.css` 中的 CSS 变量（如 `--primary`、`--font-family`），所有页面会自动生效。

**Q: 如何添加新的页面？**
A: 1) 在 `frontend/src/pages/` 创建新页面组件；2) 在 `App.tsx` 添加路由；3) 在 `Header.tsx` 添加导航链接。

## License

Copyright 2024 云幻教育科技股份有限公司. All rights reserved.
