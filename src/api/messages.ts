// 留言数据 API：localStorage 读写
import { readJSON, writeJSON } from './storage'
import type { Message } from '../types'

const KEY = 'messages'

/**
 * 读取全部留言（无留言时返回空数组）
 */
export function getMessages(): Message[] {
  return readJSON<Message[]>(KEY, [])
}

/**
 * 追加一条留言
 */
export function saveMessage(msg: Message): void {
  writeJSON(KEY, [...getMessages(), msg])
}
