# 🚀 快速启动指南

## 方式一：本地开发（推荐）

### 1. 环境要求
- Node.js 20+
- npm 或 yarn
- Docker（可选，用于数据库）

### 2. 克隆项目
```bash
git clone https://github.com/your-username/crm-demo.git
cd crm-demo
```

### 3. 启动数据库（使用 Docker）
```bash
docker run -d \
  --name crm-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=crm \
  -p 5432:5432 \
  postgres:15-alpine
```

### 4. 启动后端
```bash
cd backend

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env

# 生成 Prisma 客户端
npm run prisma:generate

# 数据库迁移
npm run prisma:migrate

# 种子数据（创建演示账号）
npm run prisma:seed

# 启动开发服务器
npm run start:dev
```

后端将运行在：http://localhost:3000

### 5. 启动前端（新终端）
```bash
cd frontend

# 安装依赖
npm install

# 复制环境变量
cp .env.example .env

# 启动开发服务器
npm run dev
```

前端将运行在：http://localhost:5173

### 6. 访问系统
打开浏览器访问：http://localhost:5173

**演示账号：**
- 销售：sales@demo.com / demo123
- 主管：manager@demo.com / demo123
- 运营：operation@demo.com / demo123

---

## 方式二：Docker Compose 一键启动

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 数据库迁移和种子数据
docker-compose exec backend npm run prisma:migrate
docker-compose exec backend npm run prisma:seed
```

访问：http://localhost:5173

---

## 方式三：部署到云端

### 部署后端到 Railway

1. 访问 [Railway](https://railway.app)
2. 创建新项目，选择 "Deploy from GitHub repo"
3. 选择 `crm-demo` 仓库
4. 添加 PostgreSQL 数据库
5. 设置环境变量：
   - `DATABASE_URL`（Railway 自动生成）
   - `JWT_SECRET=demo-secret-key`
6. 部署完成后获取后端 URL

### 部署前端到 Vercel

1. 访问 [Vercel](https://vercel.com)
2. Import GitHub Repository
3. 选择 `crm-demo/frontend`
4. 设置环境变量：
   - `VITE_API_URL=https://your-backend.railway.app/api/v1`
5. 部署完成

---

## 常见问题

### Q: 数据库连接失败
A: 确保 PostgreSQL 正在运行，检查 `DATABASE_URL` 配置

### Q: 前端无法访问后端 API
A: 检查 `VITE_API_URL` 配置，确保 CORS 设置正确

### Q: 种子数据失败
A: 确保数据库迁移已完成：`npm run prisma:migrate`

---

## 下一步

- [ ] 修改演示数据
- [ ] 自定义品牌标识
- [ ] 集成真实 AI 服务
- [ ] 添加更多功能

**🎉 开始使用吧！**
