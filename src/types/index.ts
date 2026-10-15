// 全局类型定义，与 TECH_DESIGN.md 数据模型一致

export interface Profile {
  name: string
  title: string
  bio: string
  avatar: string // base64，为空时显示默认头像占位
  resume: string // base64 PDF，为空时下载按钮不可用
  email: string
  github: string
}

export interface Skill {
  id: string
  category: string
  name: string
  level: 1 | 2 | 3 | 4 | 5
  icon?: string
}

export interface Project {
  id: string
  title: string
  desc: string
  cover: string // base64
  tags: string[]
  link: string
  date: string
}

export interface Post {
  id: string
  title: string
  excerpt: string
  tags: string[]
  date: string
  content: string // Markdown
}

export interface Message {
  id: string
  name: string
  email: string
  content: string
  date: string // ISO 时间字符串
}
