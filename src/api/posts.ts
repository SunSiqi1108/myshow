// 博客文章 API：localStorage 读写，首次启动写入默认文章
import { readJSON, writeJSON } from './storage'
import type { Post } from '../types'

const KEY = 'posts'

// 预置文章（Markdown 正文）
const DEFAULT_POSTS: Post[] = [
  {
    id: 'ai-chrome-extension',
    title: '我用AI从零做了一个Chrome插件',
    excerpt:
      'AI 编程课程的实战作业：在 AI 辅助下，用不到一周时间完成 Chrome 插件「图提取」的开发与上线。',
    tags: ['AI 编程', 'Chrome 扩展', '实战'],
    date: '2026-09-28',
    content: `## 缘起

这学期修了 AI 编程课程，期末作业是独立做一个真实可用的作品。我选择了做一款 Chrome 插件——「图提取 ImageGrab」，用来在电商详情页一键提取并批量下载商品图片。

## 开发过程

我几乎没有手写插件的经验，整个过程都是和 AI 结对完成的：

- **需求拆解**：先让 AI 帮我梳理 Manifest V3 的核心概念，明确 content script 与 popup 的分工；
- **界面搭建**：popup 用 React + TypeScript 实现，AI 生成初版后我再逐行调整；
- **图片提取**：通过 content script 扫描页面图片节点，过滤尺寸过小的图标，按清晰度排序；
- **批量下载**：调用 chrome.downloads API 逐张保存，并处理重名与失败重试。

## 部署上线

最后用 GitHub Pages 托管了介绍页，插件也打包发布。第一次体验从想法到上线的完整闭环，只花了不到一周。

## 心得

AI 并没有替我"自动完成"，而是把查文档、写样板代码的时间压缩到最低，让我能把精力放在产品逻辑和细节打磨上。这种"AI 辅助实战"的方式，我会一直用下去。`,
  },
  {
    id: 'mcp-skills-first-try',
    title: 'MCP与Skills初体验',
    excerpt:
      '给 AI 编程助手安装 context7 与 frontend-design 两个技能，并实际调用验证效果的学习记录。',
    tags: ['MCP', 'Skills', '学习笔记'],
    date: '2026-10-10',
    content: `## 什么是 MCP 和 Skills

最近研究了一个新玩法：通过 MCP（Model Context Protocol）给 AI 编程助手"装技能"。简单说，MCP 是一套让 AI 连接外部工具和数据源的协议，而 Skills 则是把特定领域知识打包成可调用的能力模块。

## 安装 context7

我装的第一个是 context7。它能把各种框架、库的官方文档实时喂给 AI。配置很简单，在配置文件里加一段 server 声明即可。装好之后问 AI 一个 React 问题，它会先调用 context7 拉取最新文档再回答，明显感觉答案更准、更新。

## 安装 frontend-design

第二个是 frontend-design 技能，专注前端视觉规范。调用后它会输出设计 token、配色、圆角、间距等建议，并能直接变成可落地的 Tailwind 类名，对我这种"能写代码但审美一般"的人非常友好。

## 一点思考

MCP + Skills 的组合让 AI 从"通用问答"变成"可扩展的工作台"。以后遇到新领域，第一反应可能不是搜教程，而是先找个对应的技能装上。这个趋势值得持续关注。`,
  },
]

/**
 * 读取文章列表；首次访问时把默认文章写入 localStorage
 */
export function getPosts(): Post[] {
  const existing = readJSON<Post[] | null>(KEY, null)
  if (existing === null) {
    writeJSON(KEY, DEFAULT_POSTS)
    return DEFAULT_POSTS
  }
  return existing
}

/**
 * 按 id 读取单篇文章
 */
export function getPost(id: string): Post | undefined {
  return getPosts().find((p) => p.id === id)
}

/**
 * 全量保存文章列表（后台增删改后调用）
 */
export function savePosts(list: Post[]): void {
  writeJSON(KEY, list)
}
