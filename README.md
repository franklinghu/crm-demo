# 智能 CRM 演示系统

> 🦞 基于微信小程序的智能客户关系管理系统 - Demo 演示版

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/crm-demo)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/crm-demo)

## 📱 项目简介

这是一个**智能 CRM 系统的 Demo 演示版本**，专为 50 人销售团队设计，通过 AI 技术提升销售数据录入效率和客户管理体验。

**核心特性：**
- 🎤 **AI 语音录入** - 说话即可自动填写客户信息
- 🔔 **智能提醒** - AI 根据跟进记录自动提示下次联系时间
- 📊 **销售漏斗** - 可视化展示销售 Pipeline
- 📈 **业绩报表** - 个人/团队业绩实时查看
- 🔐 **权限管理** - 4 种角色，数据隔离

## 🌐 在线演示

**演示地址**: https://crm-demo.vercel.app

**测试账号：**
| 角色 | 账号 | 密码 |
|------|------|------|
| 销售 | sales@demo.com | demo123 |
| 主管 | manager@demo.com | demo123 |
| 运营 | operation@demo.com | demo123 |

> 💡 演示系统使用模拟数据，所有操作不会影响真实数据

## 🏗️ 技术架构

### 前端
- **框架**: React 18 + TypeScript
- **UI**: Ant Design Mobile
- **构建**: Vite
- **部署**: Vercel

### 后端
- **框架**: NestJS + TypeScript
- **数据库**: PostgreSQL (Railway)
- **ORM**: Prisma
- **部署**: Railway

### AI 服务
- **语音识别**: 浏览器 Web Speech API（演示版）
- **NLP 解析**: 模拟解析（演示版）

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-username/crm-demo.git
cd crm-demo

# 安装依赖
npm install

# 启动后端（端口 3000）
npm run dev:backend

# 启动前端（端口 5173）
npm run dev:frontend
```

### 一键部署

#### 1. 部署后端到 Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/your-username/crm-demo)

1. 点击按钮，连接 GitHub 仓库
2. Railway 自动创建 PostgreSQL 数据库
3. 设置环境变量（Railway 自动配置）
4. 部署完成，获取后端 URL

#### 2. 部署前端到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/crm-demo)

1. 点击按钮，导入 GitHub 仓库
2. 设置环境变量 `VITE_API_URL`（Railway 后端 URL）
3. 部署完成，获取前端 URL

## 📁 项目结构

```
crm-demo/
├── backend/              # 后端服务 (NestJS)
│   ├── src/
│   │   ├── modules/     # 功能模块
│   │   ├── prisma/      # 数据库 Schema
│   │   └── main.ts
│   ├── package.json
│   └── Dockerfile
├── frontend/             # 前端应用 (React)
│   ├── src/
│   │   ├── pages/       # 页面
│   │   ├── components/  # 组件
│   │   └── services/    # API 服务
│   ├── package.json
│   └── Dockerfile
├── .github/
│   └── workflows/       # GitHub Actions
│       ├── deploy-backend.yml
│       └── deploy-frontend.yml
├── docker-compose.yml   # 本地开发
└── README.md
```

## 🎯 功能清单

### MVP 功能（已实现）

- [x] 用户登录/注册
- [x] 客户列表/详情/添加/编辑/删除
- [x] AI 语音录入客户（演示版）
- [x] 线索列表/看板视图
- [x] 跟进记录管理
- [x] 销售漏斗可视化
- [x] 业绩报表
- [x] 提醒中心
- [x] 权限管理（4 种角色）

### 二期功能（计划中）

- [ ] CEO 预警功能
- [ ] 真实语音识别集成
- [ ] 工商信息 API 集成
- [ ] 微信服务通知
- [ ] 数据导出 Excel

## 📊 数据库设计

核心表：
- `User` - 用户表
- `Customer` - 客户表
- `Lead` - 线索表
- `Followup` - 跟进记录表
- `Reminder` - 提醒表
- `OperationLog` - 操作日志表

详细设计见：[数据库设计文档](./docs/crm-database-design.md)

## 🔧 配置说明

### 环境变量

**后端 (.env)**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/crm
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=3000
```

**前端 (.env)**
```env
VITE_API_URL=http://localhost:3000/api/v1
```

### GitHub Secrets

部署需要配置以下 Secrets：
- `RAILWAY_TOKEN` - Railway API Token
- `VERCEL_TOKEN` - Vercel API Token
- `RAILWAY_PROJECT_ID` - Railway 项目 ID

## 🧪 测试

```bash
# 后端测试
cd backend
npm run test

# 前端测试
cd frontend
npm run test
```

## 📝 开发规范

### 代码规范
- ESLint + Prettier
- TypeScript 严格模式
- Commit 规范：Conventional Commits

### 分支策略
- `main` - 生产分支
- `develop` - 开发分支
- `feature/*` - 功能分支

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License

## 📞 联系方式

- 项目地址：https://github.com/your-username/crm-demo
- 问题反馈：https://github.com/your-username/crm-demo/issues

---

**🎉 开始使用吧！**
