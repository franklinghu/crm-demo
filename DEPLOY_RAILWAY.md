# 🚀 Railway 部署指南

## 方式一：通过 GitHub 自动部署（推荐）

### 步骤 1：访问 Railway
打开 https://railway.app 并使用 GitHub 账号登录

### 步骤 2：创建新项目
1. 点击 **"New Project"**
2. 选择 **"Deploy from GitHub repo"**
3. 选择 `franklinghu/crm-demo` 仓库
4. 点击 **"Deploy Now"**

### 步骤 3：添加 PostgreSQL 数据库
1. 在项目页面点击 **"+ New"**
2. 选择 **"Database"** → **"PostgreSQL"**
3. Railway 会自动创建数据库并生成 `DATABASE_URL` 环境变量

### 步骤 4：配置后端服务
1. 点击 **"+ New"** → **"GitHub Repo"**
2. 选择 `franklinghu/crm-demo`
3. 在 **Root Directory** 填写：`backend`
4. 在 **Start Command** 填写：`npm run start:prod`

### 步骤 5：添加环境变量
在 Railway 的 **Variables** 标签页添加：

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Railway 自动生成（PostgreSQL 服务会提供） |
| `JWT_SECRET` | `demo-secret-key-change-in-production` |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |

### 步骤 6：运行数据库迁移
在 Railway 的 **Deployments** 标签页，点击 **"Deploy"** 旁边的 **"..."** → **"Open Logs"**

在日志页面点击 **"Shell"** 打开终端，执行：
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```

### 步骤 7：获取后端 URL
部署完成后，Railway 会分配一个公共 URL，格式类似：
```
https://crm-demo-production.up.railway.app
```

**复制这个 URL，部署前端时需要用到！**

---

## 方式二：使用 Railway CLI（本地推送）

### 安装 Railway CLI

**macOS/Linux:**
```bash
npm install -g @railway/cli
```

**或手动下载：**
访问 https://github.com/railwayapp/cli/releases 下载对应版本

### 登录 Railway
```bash
railway login
```

### 初始化项目
```bash
cd crm-demo/backend
railway init
```

### 创建项目
```bash
railway up
```

### 添加数据库
```bash
railway add postgresql
```

### 配置环境变量
```bash
railway variables set JWT_SECRET=demo-secret-key-change-in-production
railway variables set NODE_ENV=production
```

### 运行迁移
```bash
railway run npx prisma migrate deploy
railway run npx prisma db seed
```

---

## 验证部署

部署完成后，访问 Railway 提供的 URL，测试 API：

```bash
# 测试健康检查
curl https://<your-railway-url>/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sales@demo.com","password":"demo123"}'
```

应该返回：
```json
{
  "code": 0,
  "data": {
    "accessToken": "eyJhbGc...",
    "expiresIn": 86400,
    "user": {...}
  }
}
```

---

## 常见问题

### Q: 部署失败，提示数据库连接错误
A: 确保已添加 PostgreSQL 服务，并且 `DATABASE_URL` 环境变量已正确配置

### Q: 种子数据失败
A: 先运行 `npx prisma migrate deploy`，再运行 `npx prisma db seed`

### Q: 如何查看日志
A: 在 Railway 项目页面点击 **"Deployments"** → 点击部署记录 → **"View Logs"**

### Q: 如何重新部署
A: 推送代码到 GitHub 后，Railway 会自动重新部署。或者在 Railway 页面点击 **"Deployments"** → **"..."** → **"Redeploy"**

---

## 下一步

部署完成后，复制 Railway 提供的 URL，用于配置 Vercel 前端：
```
https://<your-app>.up.railway.app
```

然后继续部署前端到 Vercel！
