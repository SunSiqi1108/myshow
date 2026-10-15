import { useState } from 'react'
import { saveMessage } from '../api/messages'

// 联系方式常量：占位数据，后续接入 Profile（后台可编辑）
const EMAIL = 'sunsq@example.com'
const GITHUB_URL = 'https://github.com/'

// 联系页：邮箱复制卡片 + GitHub 链接卡片 + 留言表单
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', content: '' })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  // 复制邮箱到剪贴板，成功提示 2 秒
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setCopyFailed(false)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 剪贴板不可用（如非安全上下文）时提示手动复制
      setCopyFailed(true)
      setTimeout(() => setCopyFailed(false), 2000)
    }
  }

  // 提交留言：校验非空 → 存 localStorage → 提示并清空表单
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.content.trim()) {
      setError('请完整填写姓名、邮箱和留言内容')
      return
    }
    saveMessage({
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      content: form.content.trim(),
      date: new Date().toISOString(),
    })
    setForm({ name: '', email: '', content: '' })
    setError('')
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputClass =
    'transition-fast w-full rounded-xl border border-white/10 bg-base px-4 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none'

  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">联系</h1>
      <p className="mt-4 text-muted">欢迎通过邮箱或 GitHub 联系我，也可以直接留言。</p>

      {/* 邮箱 + GitHub 卡片 */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <div className="transition-fast rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
          <h2 className="text-lg font-semibold text-accent">邮箱</h2>
          <p className="mt-3 break-all text-ink">{EMAIL}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="transition-fast mt-4 rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-base hover:opacity-90"
          >
            复制邮箱
          </button>
          {/* 复制结果反馈 */}
          {copied && (
            <p className="mt-3 text-sm text-accent" role="status">
              已复制到剪贴板
            </p>
          )}
          {copyFailed && (
            <p className="mt-3 text-sm text-muted" role="alert">
              复制失败，请手动选择复制
            </p>
          )}
        </div>

        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-fast block rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
        >
          <h2 className="text-lg font-semibold text-accent">GitHub</h2>
          <p className="mt-3 text-muted">查看我的开源项目与代码</p>
          <span className="transition-fast mt-4 inline-block text-sm text-accent hover:underline">
            前往 GitHub →
          </span>
        </a>
      </div>

      {/* 留言表单：受控组件 + 非空校验 */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-2xl border border-white/5 bg-card p-6"
        noValidate
      >
        <h2 className="text-lg font-semibold text-accent">给我留言</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="姓名"
            aria-label="姓名"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="邮箱"
            aria-label="邮箱"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass}
          />
        </div>
        <textarea
          placeholder="留言内容"
          aria-label="留言内容"
          rows={5}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className={`${inputClass} mt-4 resize-y`}
        />
        {error && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
        {saved && (
          <p className="mt-3 text-sm text-accent" role="status">
            留言已保存到本地
          </p>
        )}
        <button
          type="submit"
          className="transition-fast mt-5 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-base hover:opacity-90"
        >
          提交留言
        </button>
      </form>
    </div>
  )
}
