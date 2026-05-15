# AI Trading Dashboard - 部署指南

## 项目状态：本地开发服务器已运行 ✅
访问地址：http://localhost:3000

---

## 第一步：安装 Git（你需要操作）

1. 打开浏览器访问：https://git-scm.com/download/win
2. 下载 Windows 安装版（64-bit Git for Windows Setup）
3. 双击安装，一路 Next 即可（默认选项即可）
4. 安装完成后，关闭所有 CMD 窗口，重新打开 CMD
5. 输入 `git --version`，如果显示版本号说明安装成功

## 第二步：上传代码到 GitHub（你需要操作）

打开 CMD，依次输入以下命令：

```
cd C:\Users\ThinkPad\WorkBuddy\2026-05-15-task-9\ai-trading-dashboard
git init
git remote add origin https://github.com/mingshan-ai/Ai-trading-dasgboard.git
git add .
git commit -m "AI Trading Dashboard v1.0 - Mingshan Capital"
git branch -M main
git push -u origin main
```

注意：push时会弹出GitHub登录窗口，用你的GitHub账号登录即可。

## 第三步：部署到 Vercel（你需要操作）

1. 打开浏览器访问：https://vercel.com
2. 点击 **"Sign Up"** → 选择 **"Continue with GitHub"**
3. 登录你的 GitHub 账号
4. 登录后，点击 **"Add New"** → **"Project"**
5. 在仓库列表中找到 **"Ai-trading-dasgboard"** → 点击 **"Import"**
6. Framework Preset 选择 **"Next.js"**
7. 直接点击 **"Deploy"**
8. 等待 2-3 分钟
9. 部署完成后，你会获得一个在线网址，类似：
   https://ai-trading-dasgboard.vercel.app

## 当前已实现的功能

| 页面 | 路径 | 功能 |
|------|------|------|
| 仪表盘 | / | 市场三层结构、关键指标、策略推荐、板块轮动 |
| 行情监控 | /stocks | 15只标的实时行情卡片、分层过滤、排序 |
| 期权链 | /options | Call/Put期权链表格、IV解读 |
| 希腊值 | /greeks | Delta/Gamma/Theta/Vega可视化、IV vs HV对比图 |
| AI策略 | /strategy | Call推荐、观察名单、Put信号、核心策略规则 |
| 每日复盘 | /review | 5月11日完整复盘、各标的分析、5月12日预览 |
| 绩效分析 | /performance | 累计收益曲线、月度收益、胜率趋势、目标跟踪 |

## 技术栈
- Next.js 16 + TypeScript + Tailwind CSS 4
- Recharts（图表）
- Lucide React（图标）
- 深色主题，中国股市配色（红涨绿跌）

## 注意事项
- 启动本地开发服务器：在 ai-trading-dashboard 目录下运行 `corepack npm run dev`
- 你的Node.js版本是v24.15.0，npm有兼容性问题，需用 `corepack npm` 代替 `npm`
- 部署到Vercel时不需要管这个，Vercel会自动处理
