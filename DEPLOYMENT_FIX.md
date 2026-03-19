# 🔧 Railway 部署修复指南

## ✅ 已修复的问题

刚刚推送了以下修复：

1. **添加了 Railway 配置文件**
   - `backend/railway.json` - Railway 部署配置
   - `backend/nixpacks.toml` - Nixpacks 构建配置

2. **修复了 package.json**
   - 修改构建脚本顺序：先生成 Prisma，再构建 NestJS
   - 将 `prisma migrate dev` 改为 `prisma migrate deploy`（生产环境）

3. **优化了 Dockerfile**
   - 使用多阶段构建，减小镜像体积
   - 确保生产环境只安装必要的依赖

---

## 🚀 在 Railway 上重新部署

### 方式 1：自动重新部署
Railway 检测到 GitHub 推送后会自动重新部署（约 1-2 分钟）。

### 方式 2：手动触发重新部署

1. **访问 Railway 项目**
   - 打开：https://railway.app/project

2. **找到你的项目**
   - 点击 `crm-demo`

3. **重新部署**
   - 进入 **"Deployments"** 标签页
   - 点击 **"..."** → **"Redeploy"**
   - 或者点击 **"Deployments"** → **"Deploy manual"**

---

## 📋 部署步骤检查清单

### ✅ 步骤 1：确认 PostgreSQL 数据库已添加
- [ ] 项目中应该有 PostgreSQL 服务
- [ ] 已自动生成 `DATABASE_URL` 环境变量

### ✅ 步骤 2：确认后端服务配置
- [ ] Root Directory: `backend`
- [ ] Build Command: `npm install && npm run prisma:generate && npx prisma migrate deploy`
- [ ] Start Command: `npm run start:prod`

### ✅ 步骤 3：确认环境变量
在 **"Variables"** 标签页检查以下变量：
- [ ] `DATABASE_URL`（从 PostgreSQL 服务自动获取）
- [ ] `JWT_SECRET=demo-secret-key-change-in-production`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`

### ✅ 步骤 4：运行数据库迁移
部署成功后，打开 Shell 执行：
```bash
npx prisma db seed
```

---

## 🔍 监控部署状态

### 查看构建日志
1. 点击 **"Deployments"** 标签页
2. 点击最新的部署记录
3. 查看实时日志

**期望的日志输出：**
```
> crm-backend@1.0.0 build
> npm run prisma:generate && nest build

> crm-backend@1.0.0 prisma:generate
> prisma generate

Prisma Client successfully generated!

Build completed successfully!
```

### 查看运行日志
部署成功后，查看启动日志：
```
🚀 Application is running on: http://0.0.0.0:3000
```

---

## 🧪 测试部署

### 测试 1：健康检查
```bash
curl https://<your-railway-url>.up.railway.app/api/health
```

### 测试 2：登录 API
```bash
curl https://<your-railway-url>.up.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sales@demo.com","password":"demo123"}'
```

**期望响应：**
```json
{
  "code": 0,
  "data": {
    "accessToken": "eyJhbGc...",
    "expiresIn": 86400,
    "user": {
      "id": 1,
      "name": "李销售",
      "email": "sales@demo.com",
      "role": "SALES"
    }
  }
}
```

---

## ❌ 如果仍然失败

### 错误 1：找不到模块
```
Error: Cannot find module '@prisma/client'
```

**解决方案：**
```bash
# 在 Railway Shell 中执行
npm install @prisma/client
npm run prisma:generate
```

### 错误 2：数据库连接失败
```
Error: Can't reach database server at `xxx.railway.app:5432`
```

**解决方案：**
1. 确认 PostgreSQL 服务正在运行
2. 检查 `DATABASE_URL` 环境变量是否正确
3. 确保 DATABASE_URL 格式：`postgresql://user:password@host:port/database`

### 错误 3：迁移失败
```
Error: Prisma migrate failed
```

**解决方案：**
```bash
# 重置数据库（仅开发环境）
npx prisma migrate reset
# 或者
npx prisma db push
```

---

## 📞 获取帮助

如果问题仍未解决：

1. **查看 Railway 文档**
   - https://docs.railway.com

2. **检查 Railway 状态**
   - https://status.railway.com

3. **联系 Railway 支持**
   - https://station.railway.com

4. **项目 Issues**
   - https://github.com/franklinghu/crm-demo/issues

---

## 🎉 部署成功后

1. 复制后端 URL（如：`https://crm-demo-production.up.railway.app`）
2. 继续部署 Vercel 前端
3. 配置前端环境变量 `VITE_API_URL`

**下一步：部署前端到 Vercel！** 🚀
