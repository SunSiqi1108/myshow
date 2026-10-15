import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getPosts, savePosts } from '../api/posts'
import type { Post } from '../types'
import { btnDanger, btnGhost, btnPrimary, cardClass, inputClass } from './ui'

interface PostForm {
  title: string
  excerpt: string
  tags: string // 逗号分隔
  date: string
  content: string
}

const EMPTY_FORM: PostForm = {
  title: '',
  excerpt: '',
  tags: '',
  date: new Date().toISOString().slice(0, 10),
  content: '',
}

// 博客管理：列表 + 新增/编辑/删除，编辑支持 Markdown 预览
export default function PostsAdmin() {
  const [posts, setPosts] = useState<Post[]>(() => getPosts())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PostForm>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [preview, setPreview] = useState(false)
  const [error, setError] = useState('')

  const persist = (list: Post[]) => {
    setPosts(list)
    savePosts(list)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      setError('标题和正文不能为空')
      return
    }
    const tags = form.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)
    if (editingId) {
      persist(
        posts.map((p) =>
          p.id === editingId
            ? {
                ...p,
                title: form.title.trim(),
                excerpt: form.excerpt.trim(),
                tags,
                date: form.date,
                content: form.content,
              }
            : p,
        ),
      )
    } else {
      persist([
        {
          id: crypto.randomUUID(),
          title: form.title.trim(),
          excerpt: form.excerpt.trim(),
          tags,
          date: form.date,
          content: form.content,
        },
        ...posts,
      ])
    }
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setPreview(false)
    setError('')
  }

  const startEdit = (p: Post) => {
    setEditingId(p.id)
    setForm({ title: p.title, excerpt: p.excerpt, tags: p.tags.join(', '), date: p.date, content: p.content })
    setShowForm(true)
    setPreview(false)
    setError('')
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除该文章吗？')) return
    persist(posts.filter((p) => p.id !== id))
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">博客管理</h1>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v)
            setEditingId(null)
            setForm(EMPTY_FORM)
            setPreview(false)
            setError('')
          }}
          className={btnPrimary}
        >
          {showForm ? '收起' : '新增文章'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={`${cardClass} mt-4 space-y-4`}>
          <div>
            <label className="block text-sm text-muted" htmlFor="title">标题</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`${inputClass} mt-2`}
            />
          </div>
          <div>
            <label className="block text-sm text-muted" htmlFor="excerpt">摘要</label>
            <input
              id="excerpt"
              type="text"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className={`${inputClass} mt-2`}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-muted" htmlFor="tags">标签（逗号分隔）</label>
              <input
                id="tags"
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className={`${inputClass} mt-2`}
              />
            </div>
            <div>
              <label className="block text-sm text-muted" htmlFor="date">日期</label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className={`${inputClass} mt-2`}
              />
            </div>
          </div>

          {/* 正文：编辑 / 预览切换 */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm text-muted" htmlFor="content">
                正文（Markdown）
              </label>
              <button
                type="button"
                onClick={() => setPreview((v) => !v)}
                className={btnGhost}
              >
                {preview ? '返回编辑' : '预览'}
              </button>
            </div>
            {preview ? (
              <div className="markdown-body mt-2 rounded-xl border border-white/10 bg-base p-4">
                {form.content.trim() ? (
                  <ReactMarkdown>{form.content}</ReactMarkdown>
                ) : (
                  <p className="text-muted">暂无内容</p>
                )}
              </div>
            ) : (
              <textarea
                id="content"
                rows={12}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className={`${inputClass} mt-2 resize-y font-mono`}
                placeholder="## 小标题&#10;&#10;支持 Markdown 语法"
              />
            )}
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button type="submit" className={btnPrimary}>
              {editingId ? '保存修改' : '确认新增'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setForm(EMPTY_FORM)
                setPreview(false)
              }}
              className={btnGhost}
            >
              取消
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.id} className={`${cardClass} flex flex-wrap items-center gap-3`}>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{p.title}</p>
              <p className="mt-0.5 text-sm text-muted">
                {p.date} · {p.tags.join(' / ') || '无标签'}
              </p>
            </div>
            <button type="button" onClick={() => startEdit(p)} className={btnGhost}>
              编辑
            </button>
            <button type="button" onClick={() => handleDelete(p.id)} className={btnDanger}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
