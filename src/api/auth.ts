// 后台登录态 API：账号密码校验 + token 存取（纯前端演示用）
import { readJSON, writeJSON, removeKey } from './storage'

const KEY = 'adminToken'

// 演示账号：纯前端校验，无后端
const ACCOUNT = { username: 'admin', password: 'admin123' }

/**
 * 校验账号密码，成功则写入 token 并返回 true
 */
export function login(username: string, password: string): boolean {
  if (username === ACCOUNT.username && password === ACCOUNT.password) {
    writeJSON(KEY, `token-${Date.now()}`)
    return true
  }
  return false
}

export function logout(): void {
  removeKey(KEY)
}

export function isLoggedIn(): boolean {
  return readJSON<string | null>(KEY, null) !== null
}
