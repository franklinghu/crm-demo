# 🚀 Railway 部署完整指南

## ⚠️ 重要提示

由于安全原因，Railway 需要手动进行 GitHub OAuth 授权。请按照以下步骤操作：

---

## 📝 步骤 1：登录 Railway

1. **访问 Railway**
   - 打开浏览器访问：https://railway.app
   - 或点击：[https://railway.app/login](https://railway.app/login)

2. **使用 GitHub 登录**
   - 点击 **"Continue with GitHub"** 按钮
   - 授权 Railway 访问你的 GitHub 账号
   - 登录成功后会进入 Railway 控制台

---

## 📦 步骤 2：创建新项目

1. **创建新项目**
   - 点击 **"+ New Project"** 按钮
   - 选择 **"Deploy from GitHub repo"**

2. **选择仓库**
   - 找到 `franklinghu/crm-demo`
   - 点击选择

---

## 🗄️ 步骤 3：添加 PostgreSQL 数据库

1. **添加数据库**
   - 在项目页面点击 **"+ New"**
   - 选择 **"Database"** → **"PostgreSQL"**
   - Railway 会自动创建数据库

2. **获取 DATABASE_URL**
   - 点击刚创建的 PostgreSQL 服务
   - 进入 **"Variables"** 标签页
   - 复制 `DATABASE_URL` 的值（格式类似：`postgresql://postgres:xxx@xxx.railway.app:5432/railway`）

---

## ⚙️ 步骤 4：配置后端服务

1. **添加后端服务**
   - 点击 **"+ New"** → **"GitHub Repo"**
   - 选择 `franklinghu/crm-demo`

2. **配置服务**
   - **Root Directory**: `backend`
   - **Start Command**: `npm run start:prod`

3. **添加环境变量**
   在 **"Variables"** 标签页添加以下变量：

   ```
   DATABASE_URL=<从步骤 3 复制的值>
   JWT_SECRET=demo-secret-key-change-in-production
   NODE_ENV=production
   PORT=3000
   ```

---

## 🔧 步骤 5：运行数据库迁移

1. **打开部署日志**
   - 点击 **"Deployments"** 标签页
   - 点击当前部署记录
   - 点击 **"View Logs"**

2. **打开 Shell**
   - 在日志页面右上角点击 **"Shell"** 按钮

3. **执行迁移命令**
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma db seed
   ```

4. **验证种子数据**
   ```bash
   npx prisma db seed
   ```
   应该看到输出：
   ```
   🌱 开始种子数据...
   ✅ 创建用户：3
   ✅ 创建客户：3
   ✅ 创建线索：2
   ✅ 创建跟进记录：2
   ✅ 创建提醒：2
   🎉 种子数据完成！
   ```

---

## 🌐 步骤 6：获取后端 URL

1. **查看公共 URL**
   - 返回项目主页
   - 点击后端服务
   - 进入 **"Settings"** 标签页
   - 找到 **"Public Networking"** 或 **"Domains"**
   - 复制生成的 URL，格式类似：
     ```
     https://crm-demo-production.up.railway.app
     ```

2. **测试 API**
   在浏览器或终端测试：
   ```bash
   curl https://<your-railway-url>/api/v1/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"sales@demo.com","password":"demo123"}'
   ```

   应该返回包含 accessToken 的 JSON。

---

## ✅ 验证部署

访问 Railway 提供的 URL，应该能看到 API 响应。

**测试账号：**
- 邮箱：sales@demo.com
- 密码：demo123

---

## 📊 步骤 7：配置自动部署（可选）

Railway 会自动检测 GitHub 推送并重新部署。如果需要手动触发：

1. 进入 **"Deployments"** 标签页
2. 点击 **"..."** → **"Redeploy"**

---

## 🔗 下一步：部署前端到 Vercel

获得 Railway 后端 URL 后，继续部署前端：

1. 访问 https://vercel.com
2. 使用 GitHub 登录
3. 导入 `franklinghu/crm-demo` 仓库
4. 配置 Root Directory 为 `frontend`
5. 添加环境变量：
   ```
   VITE_API_URL=https://<你的 Railway 后端 URL>/api/v1
   ```
6. 点击 Deploy

---

## 💡 常见问题

### Q: 部署失败，提示数据库连接错误
**A**: 确保 `DATABASE_URL` 环境变量已正确配置，并且 PostgreSQL 服务正在运行。

### Q: 种子数据失败
**A**: 先运行 `npx prisma migrate deploy`，再运行 `npx prisma db seed`。

### Q: 如何查看日志
**A**: 在 Railway 项目页面点击 **"Deployments"** → 点击部署记录 → **"View Logs"**。

### Q: 如何重新部署
**A**: 推送代码到 GitHub 后，Railway 会自动重新部署。或者在 Railway 页面点击 **"Deployments"** → **"..."** → **"Redeploy"**。

### Q: 如何停止服务
**A**: 在 Railway 项目页面点击 **"..."** → **"Delete Project"**。

---

## 📞 需要帮助？

- Railway 文档：https://docs.railway.com
- Railway Discord: https://discord.gg/railway
- 项目 Issues: https://github.com/franklinghu/crm-demo/issues

---

**🎉 部署完成后，继续部署 Vercel 前端！**
