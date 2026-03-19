# 🔧 Prisma 版本问题修复

## ❌ 问题
Railway 安装了 Prisma 7.5.0，该版本不再支持 `schema.prisma` 中的 `url` 属性。

## ✅ 解决方案

### 1. 固定 Prisma 版本为 5.22.0
```json
{
  "dependencies": {
    "@prisma/client": "5.22.0",
    "prisma": "5.22.0"
  }
}
```

### 2. 从 devDependencies 移除 prisma
确保只在 dependencies 中保留 prisma。

### 3. 使用 --legacy-peer-deps 安装
避免依赖冲突。

## 🚀 Railway 部署

推送后 Railway 会自动重新部署。

**如果还是失败，请手动触发：**
1. 访问 Railway 项目
2. Deployments → ... → Redeploy

## 📊 期望的日志

```
> npx prisma generate@5.22.0
Prisma schema loaded from prisma/schema.prisma.
Prisma Client successfully generated!
```
