// localStorage 统一读写封装：所有数据访问必须走这里，禁止页面直接碰 localStorage

const PREFIX = 'myshow:'

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    // 数据损坏时回退默认值，避免页面崩溃
    return fallback
  }
}

export function writeJSON<T>(key: string, value: T): void {
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

export function removeKey(key: string): void {
  localStorage.removeItem(PREFIX + key)
}

/**
 * 文件转 base64，超过 2MB 抛出错误（由调用方提示用户）
 */
export function fileToBase64(file: File, maxSizeMB = 2): Promise<string> {
  if (file.size > maxSizeMB * 1024 * 1024) {
    return Promise.reject(new Error(`文件超过 ${maxSizeMB}MB，请压缩后再上传`))
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('文件读取失败'))
    reader.readAsDataURL(file)
  })
}
