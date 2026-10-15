import { useState } from 'react'
import { getProfile, saveProfile } from '../api/profile'
import { fileToBase64 } from '../api/storage'
import type { Profile } from '../types'
import { btnDanger, btnGhost, btnPrimary, cardClass, inputClass } from './ui'

// 个人信息管理：基础信息表单 + 头像/简历上传（base64）
export default function ProfileAdmin() {
  const [profile, setProfile] = useState<Profile>(() => getProfile())
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  // 局部更新表单状态
  const update = (patch: Partial<Profile>) => {
    setProfile((p) => ({ ...p, ...patch }))
    setMsg('')
  }

  // 文件上传通用处理：转 base64 写入对应字段，超 2MB 报错提示
  const handleFile =
    (field: 'avatar' | 'resume') =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = '' // 允许重复选择同一文件
      if (!file) return
      try {
        const base64 = await fileToBase64(file)
        update({ [field]: base64 })
        setError('')
      } catch (err) {
        setError((err as Error).message)
      }
    }

  // 保存到 localStorage
  const handleSave = () => {
    if (!profile.name.trim()) {
      setError('姓名不能为空')
      return
    }
    saveProfile(profile)
    setError('')
    setMsg('已保存，前台刷新后生效')
  }

  // 下载简历：base64 data URL 直接作为下载链接
  const downloadResume = () => {
    const a = document.createElement('a')
    a.href = profile.resume
    a.download = `${profile.name || '我的'}-简历.pdf`
    a.click()
  }

  // 清除简历：立即更新并持久化
  const clearResume = () => {
    if (!window.confirm('确定清除已上传的简历吗？')) return
    const next = { ...profile, resume: '' }
    setProfile(next)
    saveProfile(next)
    setMsg('简历已清除')
  }

  const field = (
    label: string,
    key: 'name' | 'title' | 'bio' | 'email' | 'github',
    placeholder = '',
  ) => (
    <div>
      <label className="block text-sm text-muted" htmlFor={key}>
        {label}
      </label>
      <input
        id={key}
        type="text"
        value={profile[key]}
        placeholder={placeholder}
        onChange={(e) => update({ [key]: e.target.value })}
        className={`${inputClass} mt-2`}
      />
    </div>
  )

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">个人信息</h1>

      <div className={`${cardClass} mt-6 space-y-4`}>
        {field('姓名', 'name')}
        {field('职位', 'title', '如：大连海事大学计算机科学与技术专业学生')}
        {field('一句话介绍', 'bio')}
        {field('邮箱', 'email')}
        {field('GitHub 链接', 'github', 'https://github.com/xxx')}
      </div>

      {/* 头像上传 */}
      <div className={`${cardClass} mt-6`}>
        <h2 className="font-semibold">头像</h2>
        <div className="mt-4 flex items-center gap-4">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt="头像预览"
              className="h-20 w-20 rounded-full border-2 border-accent object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent/40 text-xl text-accent">
              {profile.name.charAt(0) || '？'}
            </div>
          )}
          <label className={`${btnGhost} cursor-pointer`}>
            选择图片
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile('avatar')}
            />
          </label>
          {profile.avatar && (
            <button type="button" onClick={() => update({ avatar: '' })} className={btnDanger}>
              移除头像
            </button>
          )}
        </div>
        <p className="mt-2 text-xs text-muted">图片将转为 base64 存储，单个文件不超过 2MB。</p>
      </div>

      {/* 简历上传/下载/清除 */}
      <div className={`${cardClass} mt-6`}>
        <h2 className="font-semibold">简历 PDF</h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className={`${btnGhost} cursor-pointer`}>
            选择 PDF
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFile('resume')}
            />
          </label>
          {profile.resume ? (
            <>
              <span className="text-sm text-accent">已上传简历</span>
              <button type="button" onClick={downloadResume} className={btnPrimary}>
                下载简历
              </button>
              <button type="button" onClick={clearResume} className={btnDanger}>
                清除简历
              </button>
            </>
          ) : (
            <span className="text-sm text-muted">未上传</span>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
      {msg && (
        <p className="mt-4 text-sm text-accent" role="status">
          {msg}
        </p>
      )}

      <button type="button" onClick={handleSave} className={`${btnPrimary} mt-6`}>
        保存
      </button>
    </div>
  )
}
