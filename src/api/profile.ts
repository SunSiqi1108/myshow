// 个人信息 API：localStorage 读写，首次启动写入默认数据
import { readJSON, writeJSON } from './storage'
import type { Profile } from '../types'

const KEY = 'profile'

// 默认个人信息（avatar/resume/email 待站长补充，后台可编辑）
const DEFAULT_PROFILE: Profile = {
  name: '孙思琦',
  title: '大连海事大学计算机科学与技术专业学生',
  bio: '热衷AI应用与前端开发',
  avatar: '',
  resume: '',
  email: '',
  github: 'https://github.com/SunSiqi1108',
}

/**
 * 读取个人信息；首次访问时把默认数据写入 localStorage
 */
export function getProfile(): Profile {
  const existing = readJSON<Profile | null>(KEY, null)
  if (existing === null) {
    writeJSON(KEY, DEFAULT_PROFILE)
    return DEFAULT_PROFILE
  }
  return existing
}

/**
 * 保存个人信息（后台编辑后调用）
 */
export function saveProfile(profile: Profile): void {
  writeJSON(KEY, profile)
}
