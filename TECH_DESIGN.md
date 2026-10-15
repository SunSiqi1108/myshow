\# TECH\_DESIGN.md 技术设计文档



\## 一、技术栈

| 层 | 选型 | 理由 |

|---|---|---|

| 框架 | React 18 + TypeScript | 组件化+类型安全 |

| 构建 | Vite | 快，生态成熟 |

| 样式 | Tailwind CSS | 快速开发，风格统一 |

| 路由 | React Router v6 | 前后台路由隔离+守卫 |

| 存储 | localStorage（封装src/api/） | 纯前端要求，可日后替换后端 |



\## 二、目录结构

src/

├── main.tsx / App.tsx      # 入口与路由

├── index.css               # Tailwind + 全局深色变量

├── api/                    # 统一数据层（localStorage实现）

│   ├── storage.ts          # 读写封装（含base64上传工具）

│   ├── profile.ts          # 个人信息API

│   ├── skills.ts           # 技能API

│   ├── projects.ts         # 项目API

│   └── posts.ts            # 博客API

├── types/                  # TS类型定义

├── components/             # 公共组件（Navbar/Footer/StarBg等）

├── pages/                  # 前台页面（Home/About/Projects/Blog/Contact）

└── admin/                  # 后台（Login/Dashboard/Profile/Skills/Projects/Posts）

&#x20;   └── AdminLayout.tsx     # 侧边栏+顶栏布局



\## 三、数据模型

\- Profile { name, title, bio, avatar(base64), resume(base64), email, socials }

\- Skill { id, category, name, level(1-5), icon }

\- Project { id, title, desc, cover(base64), tags\[], link, date }

\- Post { id, title, excerpt, tags\[], date, content(Markdown) }

默认数据：首次启动写入一份真实默认数据（站长本人信息+3个真实项目+2篇博客）



\## 四、关键技术点

1\. Canvas星空：requestAnimationFrame粒子循环，滚动视差，prefers-reduced-motion降级，移动端按屏幕面积减少粒子数

2\. 文件上传：FileReader转base64存localStorage（单文件<2MB提示），简历PDF用Blob+URL.createObjectURL提供下载

3\. 路由守卫：AdminLayout内检查localStorage登录态，未登录Navigate到/login

4\. 构建部署：npm run build输出dist/，纯静态可托管Cloudflare Pages/Vercel/GitHub Pages

