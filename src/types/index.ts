// 全局类型定义，与 TECH_DESIGN.md 数据模型一致

export interface Profile {
  name: string
  title: string
  bio: string
  avatar: string // base64
  resume: string // base64 PDF
  email: string
  socials: { label: string; url: string }[]
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
