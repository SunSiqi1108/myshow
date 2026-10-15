// 技能数据 API：localStorage 读写，首次启动写入默认数据
import { readJSON, writeJSON } from './storage'
import type { Skill } from '../types'

const KEY = 'skills'

// 默认技能数据（与前台原硬编码一致）
const DEFAULT_SKILLS: Skill[] = [
  { id: 'c', category: '编程语言', name: 'C', level: 4 },
  { id: 'java', category: '编程语言', name: 'Java', level: 4 },
  { id: 'ts', category: '编程语言', name: 'TypeScript', level: 4 },
  { id: 'react', category: '前端', name: 'React', level: 4 },
  { id: 'tailwind', category: '前端', name: 'Tailwind CSS', level: 4 },
  { id: 'vite', category: '前端', name: 'Vite', level: 3 },
  { id: 'cursor', category: 'AI 工具', name: 'Cursor', level: 5 },
  { id: 'trae', category: 'AI 工具', name: 'Trae', level: 5 },
  { id: 'claude-code', category: 'AI 工具', name: 'Claude Code', level: 4 },
  { id: 'mcp-skills', category: 'AI 工具', name: 'MCP / Skills 配置', level: 4 },
  { id: 'git', category: '其他', name: 'Git / GitHub', level: 4 },
  { id: 'pm', category: '其他', name: '项目管理', level: 3 },
]

/**
 * 读取技能列表；首次访问时把默认数据写入 localStorage
 */
export function getSkills(): Skill[] {
  const existing = readJSON<Skill[] | null>(KEY, null)
  if (existing === null) {
    writeJSON(KEY, DEFAULT_SKILLS)
    return DEFAULT_SKILLS
  }
  return existing
}

/**
 * 全量保存技能列表（后台增删改后调用）
 */
export function saveSkills(list: Skill[]): void {
  writeJSON(KEY, list)
}
