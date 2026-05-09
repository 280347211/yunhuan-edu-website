# 后端项目说明

云幻教育科技股份有限公司企业官网 - 后端 API 服务

## 技术栈

- **Express 4** + TypeScript - Web 框架
- **Prisma 5** - ORM（类型安全的数据库查询）
- **PostgreSQL** - 关系型数据库
- **Multer** - 文件上传
- **Zod** - 运行时参数校验
- **dotenv** - 环境变量管理

## 目录结构

```
backend/
├── .env                  # 环境变量（不入库）
├── .env.example          # 环境变量模板
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma     # 数据库模型定义（3张表）
│   └── seed.ts           # 初始化数据脚本
├── uploads/              # 图片上传目录（gitignore）
└── src/
    ├── index.ts          # 服务入口 + 路由挂载
    ├── config/
    │   ├── db.ts         # Prisma 客户端单例
    │   └── env.ts        # 环境变量校验（Zod）
    └── modules/
        ├── article.ts     # 文章 CRUD 路由
        ├── image.ts       # 图片上传/删除路由
        └── site-config.ts # 网站配置路由
```

## 环境变量

| 变量 | 必填 | 默认值 | 说明 |
|------|------|--------|------|
| `DATABASE_URL` | 是 | - | PostgreSQL 连接串 |
| `PORT` | 否 | 3000 | 服务监听端口 |
| `UPLOAD_DIR` | 否 | uploads | 图片上传目录 |

`.env` 示例：

```env
DATABASE_URL="postgres://postgres:password@localhost:5432/yunhuan_edu?schema=public"
PORT=3000
UPLOAD_DIR=uploads
```

## API 接口详情

### 文章管理 `/api/articles`

**GET /api/articles**

获取文章列表，支持筛选。

查询参数：
| 参数 | 类型 | 说明 |
|------|------|------|
| category | string | 按分类筛选：news / policy / industry / media |
| published | string | 按发布状态筛选：true / false |

响应示例：
```json
[
  {
    "id": 1,
    "title": "云幻教育荣获2024年度教育科技创新奖",
    "content": "正文内容...",
    "summary": "摘要",
    "cover": null,
    "category": "news",
    "published": true,
    "createdAt": "2024-12-15T00:00:00.000Z",
    "updatedAt": "2024-12-15T00:00:00.000Z"
  }
]
```

**POST /api/articles**

创建文章。

请求体：
```json
{
  "title": "文章标题",
  "content": "文章正文",
  "summary": "摘要（可选）",
  "cover": "/uploads/xxx.jpg（可选）",
  "category": "news",
  "published": true
}
```

**PUT /api/articles/:id**

更新文章，请求体同创建（字段可选）。

**DELETE /api/articles/:id**

删除文章。

---

### 图片管理 `/api/images`

**GET /api/images**

获取所有图片。

响应示例：
```json
[
  {
    "id": 1,
    "filename": "1704xxx-abc123.jpg",
    "original": "公司大楼.jpg",
    "path": "/uploads/1704xxx-abc123.jpg",
    "alt": "公司外观",
    "category": "about",
    "createdAt": "2024-12-15T00:00:00.000Z"
  }
]
```

**POST /api/images**

上传图片。

请求格式：`multipart/form-data`

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| file | File | 是 | 图片文件（支持 jpg/png/gif/webp/svg，最大 10MB） |
| alt | string | 否 | 图片描述 |
| category | string | 否 | 分类：general/banner/product/case/about |

**DELETE /api/images/:id**

删除图片（同时删除磁盘文件和数据库记录）。

---

### 网站配置 `/api/site-config`

**GET /api/site-config**

获取所有配置，返回 key-value 对象。

响应示例：
```json
{
  "company_name": "云幻教育科技股份有限公司",
  "phone": "400-888-8888",
  "hero_title_1": "科技赋能教育"
}
```

**PUT /api/site-config/:key**

更新或创建单项配置。

请求体：`{ "value": "新的值" }`

**POST /api/site-config/batch**

批量更新配置。

请求体：
```json
{
  "configs": {
    "company_name": "新公司名",
    "phone": "400-999-9999"
  }
}
```

---

### 健康检查

**GET /api/health**

响应：`{ "status": "ok", "timestamp": "2024-12-15T00:00:00.000Z" }`

## 数据库模型

### Article（文章表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | Int | PK, 自增 | 主键 |
| title | String | NOT NULL | 标题 |
| content | String | NOT NULL | 正文 |
| summary | String | 可选 | 摘要 |
| cover | String | 可选 | 封面图路径 |
| category | String | 默认 "news" | 分类 |
| published | Boolean | 默认 false | 是否发布 |
| createdAt | DateTime | 自动 | 创建时间 |
| updatedAt | DateTime | 自动 | 更新时间 |

### Image（图片表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | Int | PK, 自增 | 主键 |
| filename | String | NOT NULL | 存储文件名 |
| original | String | NOT NULL | 原始文件名 |
| path | String | NOT NULL | 访问路径 |
| alt | String | 可选 | 图片描述 |
| category | String | 可选 | 分类 |
| createdAt | DateTime | 自动 | 上传时间 |

### SiteConfig（网站配置表）

| 字段 | 类型 | 约束 | 说明 |
|------|------|------|------|
| id | Int | PK, 自增 | 主键 |
| key | String | UNIQUE | 配置键名 |
| value | String | NOT NULL | 配置值 |

## 初始化数据

运行 `npx tsx prisma/seed.ts` 会插入：

- 4 篇示例新闻文章（已发布状态）
- 16 项网站配置（公司信息、联系方式、首页横幅内容）

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器（带热重载）
pnpm dev

# 构建 TypeScript
pnpm build

# 生产环境运行
pnpm start

# 数据库操作
npx prisma db push          # 推送 schema 到数据库
npx prisma db pull          # 从数据库拉取 schema
npx prisma migrate dev      # 创建迁移（生产推荐）
npx prisma studio           # 打开数据库可视化界面
npx tsx prisma/seed.ts      # 填充初始化数据

# Prisma Client 生成
npx prisma generate         # 根据 schema 生成类型代码
```

## 生产环境注意事项

1. **数据库连接**：修改 `.env` 中的 `DATABASE_URL` 为生产数据库地址
2. **图片存储**：当前使用本地磁盘存储，生产环境建议替换为云存储（OSS/COS/S3）
3. **CORS**：`index.ts` 中 `app.use(cors())` 允许所有来源，生产环境应限制为前端域名
4. **进程管理**：使用 PM2 管理进程，确保服务自动重启
5. **上传目录**：确保 `uploads/` 目录有写入权限
