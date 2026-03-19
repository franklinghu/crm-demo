# 🚀 Railway 一键部署指南

## ⚡ 快速部署（3 步完成）

### 步骤 1：点击部署按钮

**[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/franklinghu/crm-demo)**

或者直接访问：
https://railway.app/new?repo=https://github.com/franklinghu/crm-demo

---

### 步骤 2：配置项目

1. **选择仓库**
   - 选择 `franklinghu/crm-demo`
   - Railway 会自动检测 `backend` 目录

2. **添加数据库**
   - 点击 **"+ New"**
   - 选择 **"Database"** → **"PostgreSQL"**
   - Railway 会自动创建数据库并设置 `DATABASE_URL`

3. **配置环境变量**
   在 Variables 中添加：
   ```
   JWT_SECRET=demo-secret-key-change-in-production
   NODE_ENV=production
   PORT=3000
   ```

---

### 步骤 3：等待部署完成

Railway 会自动：
1. 安装依赖
2. 生成 Prisma Client
3. 构建项目
4. 启动服务

**部署时间：约 3-5 分钟**

---

## 🔍 部署成功后

### 1. 获取后端 URL
在 Railway 项目页面找到你的 URL：
```
https://crm-demo-xxxx.up.railway.app
```

### 2. 运行数据库种子
打开 Railway Shell 执行：
```bash
npx prisma db seed
```

### 3. 测试 API
```bash
curl https://<your-url>/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"sales@demo.com","password":"demo123"}'
```

---

## ❌ 故障排除

### 问题 1：构建失败
**错误：** `npm run build failed`

**解决方案：**
1. 检查 Logs 查看详细错误
2. 确认 `backend/package.json` 存在
3. 重新部署：Deployments → ... → Redeploy

### 问题 2：数据库连接失败
**错误：** `Can't reach database server`

**解决方案：**
1. 确认已添加 PostgreSQL 服务
2. 检查 `DATABASE_URL` 环境变量
3. 等待数据库初始化完成（约 1 分钟）

### 问题 3：启动失败
**错误：** `Cannot find module`

**解决方案：**
```bash
# 在 Railway Shell 中执行
npm install
npm run prisma:generate
npm run build
```

---

## 📞 需要帮助？

1. **查看部署日志**
   - Railway Dashboard → Deployments → View Logs

2. **Railway 文档**
   - https://docs.railway.com

3. **项目 Issues**
   - https://github.com/franklinghu/crm-demo/issues

---

**🎉 部署完成后，继续部署前端到 Vercel！**
