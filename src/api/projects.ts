// 项目数据 API：localStorage 读写，首次启动写入默认数据
import { readJSON, writeJSON } from './storage'
import type { Project } from '../types'

const KEY = 'projects'

// 默认项目数据：GitHub 地址待站长补充（后台可编辑）
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'imagegrab',
    title: '图提取 ImageGrab',
    desc: 'Chrome 扩展：电商详情页一键提取、批量下载商品图片。',
    cover: '',
    tags: ['React', 'TypeScript', 'Manifest V3', 'GitHub Pages'],
    link: '',
    date: '',
  },
  {
    id: 'wudu',
    title: '雾读',
    desc: '网页 AI 摘要工具：输入网址，自动生成中文摘要。',
    cover: '',
    tags: ['Next.js', 'DeepSeek API'],
    link: '',
    date: '',
  },
  {
    id: 'word-daily',
    title: '每日背单词小站',
    desc: '单词卡片学习应用，随时随地记单词。',
    cover: '',
    tags: ['AI 零代码平台'],
    link: '',
    date: '',
  },
  {
    id: 'water-tracker',
    title: '喝水打卡小助手',
    desc: '健康习惯打卡工具，提醒自己按时喝水。',
    cover: '',
    tags: ['AI 零代码平台'],
    link: '',
    date: '',
  },
]

/**
 * 读取项目列表；首次访问时把默认数据写入 localStorage
 */
export function getProjects(): Project[] {
  const existing = readJSON<Project[] | null>(KEY, null)
  if (existing === null) {
    writeJSON(KEY, DEFAULT_PROJECTS)
    return DEFAULT_PROJECTS
  }
  return existing
}

/**
 * 全量保存项目列表（后台增删改后调用）
 */
export function saveProjects(list: Project[]): void {
  writeJSON(KEY, list)
}
