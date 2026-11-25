# Naya Corp Website

现代化科技企业官网全栈项目，面向 B 端客户展示公司介绍、业务服务、项目案例、核心团队、博客资讯与联系方式。项目采用深蓝与浅紫商务科技视觉，支持响应式布局、浅色/暗色主题与克制的滚动动效。

前端所有业务内容均通过 API 获取；联系表单会写入 PostgreSQL，并可通过配置切换为真实 SMTP 邮件通知。项目不包含后台管理系统。

## 技术栈

| 端       | 技术                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| 前端     | Next.js 14（App Router）、React 18、TypeScript、Tailwind CSS 3、shadcn/ui 风格组件、Lucide Icons、Framer Motion、Axios |
| 后端     | Node.js、NestJS、TypeScript、Prisma ORM、PostgreSQL                                                                    |
| 工程化   | pnpm workspace、ESLint、Prettier、Swagger / OpenAPI                                                                    |
| 通用能力 | 统一响应包装、全局异常过滤、DTO 校验、分页、软删除、请求日志、限流、邮件通知                                           |

## 目录结构

```text

naya-website/
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── home/
│   │   │   ├── service/
│   │   │   ├── case/
│   │   │   ├── team/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── common/
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── seed.ts
│   │   ├── main.ts
│   │   └── app.module.ts
│   ├── .env.example
│   ├── package.json
│   └── nest-cli.json
├── frontend/
│   ├── app/
│   │   ├── (layout)/
│   │   │   ├── page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── cases/page.tsx
│   │   │   ├── team/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── blog/[slug]/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── shared/
│   ├── lib/
│   ├── public/
│   ├── tailwind.config.ts
│   └── package.json
├── .gitignore
├── LICENSE
├── README.md
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

## 环境要求

- Node.js 22 LTS（最低 20.19）
- pnpm 10
- PostgreSQL 15 或更高版本

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动 PostgreSQL

如果本机已有 PostgreSQL，可跳过此步骤。也可以使用 Docker：

```bash
docker run --name nova-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=nova_corp \
  -p 5432:5432 \
  -d postgres:16
```

### 3. 配置环境变量

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

默认后端地址为 `http://localhost:3002/api`，前端地址为 `http://localhost:3003`。如果修改端口或使用域名，请同步调整两侧配置。

### 4. 初始化数据库与示例内容

```bash
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```

种子数据包含完整的首页文案、6 项服务、6 个案例、6 位团队成员和 8 篇博客。重复执行 seed 不会产生重复数据。

### 5. 启动项目

同时启动前后端：

```bash
pnpm dev
```

也可以分别启动：

```bash
# 终端一：后端
pnpm --filter ./backend dev
#从 backend 文件夹直接打开终端
pnpm dev

# 终端二：前端
pnpm --filter ./frontend dev
#从 frontend 文件夹直接打开终端
pnpm dev -p 3003
```

启动后访问：

- 官网：<http://localhost:3003>
- Swagger 文档：<http://localhost:3002/api/docs>
- 健康检查：<http://localhost:3002/api/health>

## 常用命令

```bash
pnpm build          # 构建前后端
pnpm start          # 以生产模式同时启动
pnpm lint           # ESLint 检查
pnpm typecheck      # TypeScript 严格类型检查
pnpm format         # Prettier 格式化
pnpm format:check   # 格式检查

pnpm --filter ./backend dev
pnpm --filter ./frontend dev
pnpm --filter ./backend build
pnpm --filter ./frontend build
```

## 环境变量说明

### 后端 `backend/.env`

| 变量              | 说明                                       | 默认值 / 示例           |
| ----------------- | ------------------------------------------ | ----------------------- |
| `NODE_ENV`        | 运行环境                                   | `development`           |
| `PORT`            | 后端端口                                   | `3001`                  |
| `API_PREFIX`      | API 全局前缀                               | `api`                   |
| `FRONTEND_URL`    | 前端地址，用于邮件与跨域配置               | `http://localhost:3000` |
| `CORS_ORIGIN`     | 允许的跨域来源，多个来源用逗号分隔         | `http://localhost:3000` |
| `DATABASE_URL`    | PostgreSQL 连接字符串                      | 见 `.env.example`       |
| `SWAGGER_ENABLED` | 是否启用 Swagger                           | `true`                  |
| `THROTTLE_TTL`    | 限流时间窗口（毫秒）                       | `60000`                 |
| `THROTTLE_LIMIT`  | 时间窗口内请求上限                         | `120`                   |
| `LOG_LEVEL`       | 应用日志级别                               | `debug`                 |
| `MAIL_ENABLED`    | 开启真实 SMTP 邮件；关闭时仅记录 mock 通知 | `false`                 |
| `SMTP_HOST`       | SMTP 服务器                                | 留空                    |
| `SMTP_PORT`       | SMTP 端口                                  | `587`                   |
| `SMTP_SECURE`     | 是否使用 TLS 直连                          | `false`                 |
| `SMTP_USER`       | SMTP 用户名                                | 留空                    |
| `SMTP_PASS`       | SMTP 密码 / 授权码                         | 留空                    |
| `MAIL_FROM`       | 发件地址                                   | 留空                    |
| `MAIL_TO`         | 联系通知收件地址                           | 留空                    |

### 前端 `frontend/.env`

| 变量                    | 说明              | 默认值 / 示例               |
| ----------------------- | ----------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL`   | 后端 API 基础地址 | `http://localhost:3001/api` |
| `NEXT_PUBLIC_SITE_URL`  | 官网公开地址      | `http://localhost:3000`     |
| `NEXT_PUBLIC_SITE_NAME` | 站点名称          | `Nova Corp`                 |

所有 `.env` 文件已被 `.gitignore` 排除。生产环境请通过部署平台的 Secret 管理功能注入敏感配置，不要将数据库密码或 SMTP 凭据提交到仓库。

## API 概览

所有业务接口使用 `/api` 前缀，并返回统一结构：

```json
{
  "success": true,
  "message": "请求成功",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 6,
    "total": 8,
    "totalPages": 2,
    "hasNextPage": true,
    "hasPreviousPage": false
  },
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

| 方法   | 路径                   | 说明                                           |
| ------ | ---------------------- | ---------------------------------------------- |
| `GET`  | `/api/health`          | 健康检查                                       |
| `GET`  | `/api/home`            | 首页聚合内容                                   |
| `GET`  | `/api/services`        | 服务列表                                       |
| `GET`  | `/api/services/:slug`  | 服务详情                                       |
| `GET`  | `/api/cases`           | 案例列表                                       |
| `GET`  | `/api/cases/:slug`     | 案例详情                                       |
| `GET`  | `/api/team`            | 团队成员                                       |
| `GET`  | `/api/blog`            | 博客分页列表，支持 `page`、`limit`、`category` |
| `GET`  | `/api/blog/categories` | 博客分类                                       |
| `GET`  | `/api/blog/:slug`      | 博客详情                                       |
| `POST` | `/api/contact`         | 提交联系表单                                   |

错误响应统一为：

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数校验失败",
    "details": []
  },
  "timestamp": "2026-01-01T00:00:00.000Z",
  "path": "/api/contact"
}
```

详细请求 Schema 与在线调试入口请访问 `/api/docs`。生产环境建议将 `SWAGGER_ENABLED` 设为 `false`，或通过网关限制文档访问。

## 数据与内容管理

- Prisma 模型：`HomeContent`、`Service`、`Case`、`TeamMember`、`BlogPost`、`ContactMessage`。
- 所有模型包含 `deletedAt` 软删除字段；公开查询只返回未删除且已发布的内容。
- 公开接口不提供联系记录的读取能力，避免泄露访客隐私。
- 联系记录通过状态字段区分新消息、已读与归档。
- 博客正文使用 Markdown 富文本格式，由 `react-markdown` 安全渲染，不执行原始 HTML。
- 示例图片使用 `picsum.photos`，可在种子数据中替换为自有图片地址或 `/public` 下的本地资源。

## 生产部署

```bash
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm --filter ./backend exec prisma migrate deploy
pnpm prisma:seed
pnpm build
pnpm start
```

建议将 `/api` 反向代理到 NestJS 服务，其余请求转发到 Next.js 服务，从而让前端通过同源 `/api` 访问接口，避免跨域配置。部署时设置：

```dotenv
# frontend/.env
NEXT_PUBLIC_API_URL=https://example.com/api
NEXT_PUBLIC_SITE_URL=https://example.com
```

数据库迁移、日志收集、SMTP 凭据和限流参数应根据实际生产环境调整。联系表单已集成限流与蜜罐字段；面向公网部署时，仍建议在网关层增加适当的防护与监控。

## 安全说明

- 使用 `class-validator` 校验所有外部输入，并拒绝未声明字段。
- 使用 `helmet` 设置安全响应头，CORS 来源可配置。
- 统一异常过滤器不会向客户端返回内部堆栈。
- 日志不记录表单正文、密码或 SMTP 凭据。
- 邮件发送失败不会影响联系记录入库，但会记录服务端错误日志。

### 固定 Next.js 14 版本的安全提示

本项目严格按照需求使用 Next.js 14.2.35。当前安全审计中，部分 Next.js 上游告警仅在 Next.js 15.5 及更高版本修复，因此不能通过升级其他依赖消除这些版本级告警。

项目未使用 Server Actions、动态 rewrites、i18n 或 WebSocket；图片优化仅允许 `picsum.photos`，并禁用 AVIF 与 SVG 优化以降低相关攻击面。生产环境应部署在受控的 Linux 环境中，并在网关限制图片优化端点与异常流量。

如果项目用于高风险公网生产环境，建议在获得技术栈变更批准后升级到已修复的 Next.js 版本；在本项目固定技术栈约束下，不应将审计告警视为已自动消除。

## 开源声明

本项目基于 [MIT License](LICENSE) 开源，可自由用于个人学习、企业内部系统与商业项目。保留版权与许可声明即可。
