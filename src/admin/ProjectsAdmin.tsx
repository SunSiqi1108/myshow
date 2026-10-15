import { useState } from 'react'
import { getProjects, saveProjects } from '../api/projects'
import { fileToBase64 } from '../api/storage'
import type { Project } from '../types'
import { btnDanger, btnGhost, btnPrimary, cardClass, inputClass } from './ui'

interface ProjectForm {
  title: string
  desc: string
  tags: string // 逗号分隔
  link: string
  cover: string // base64，可为空
}

const EMPTY_FORM: ProjectForm = { title: '', desc: '', tags: '', link: '', cover: '' }

// 项目管理：列表 + 新增/编辑/删除 + 封面上传（可选）
export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>(() => getProjects())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  const persist = (list: Project[]) => {
    setProjects(list)
    saveProjects(list)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim() || !form.desc.trim()) {
      setError('标题和描述不能为空')
      return
    }
    // 标签按逗号分隔并去除空白项
    const tags = form.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean)
    if (editingId) {
      persist(
        projects.map((p) =>
          p.id === editingId
            ? { ...p, title: form.title.trim(), desc: form.desc.trim(), tags, link: form.link.trim(), cover: form.cover }
            : p,
        ),
      )
    } else {
      persist([
        ...projects,
        {
          id: crypto.randomUUID(),
          title: form.title.trim(),
          desc: form.desc.trim(),
          tags,
          link: form.link.trim(),
          cover: form.cover,
          date: new Date().toISOString().slice(0, 10),
        },
      ])
    }
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  const startEdit = (p: Project) => {
    setEditingId(p.id)
    setForm({ title: p.title, desc: p.desc, tags: p.tags.join(', '), link: p.link, cover: p.cover })
    setShowForm(true)
    setError('')
  }

  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除该项目吗？')) return
    persist(projects.filter((p) => p.id !== id))
  }

  // 封面上传：转 base64，超 2MB 报错
  const handleCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const base64 = await fileToBase64(file)
      setForm((f) => ({ ...f, cover: base64 }))
      setError('')
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <button
          type="button"
          onClick={() => {
            setShowForm((v) => !v)
            setEditingId(null)
            setForm(EMPTY_FORM)
            setError('')
          }}
          className={btnPrimary}
        >
          {showForm ? '收起' : '新增项目'}
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
            <label className="block text-sm text-muted" htmlFor="desc">描述</label>
            <textarea
              id="desc"
              rows={3}
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className={`${inputClass} mt-2 resize-y`}
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
                placeholder="React, TypeScript"
              />
            </div>
            <div>
              <label className="block text-sm text-muted" htmlFor="link">链接</label>
              <input
                id="link"
                type="text"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          {/* 封面上传（可选） */}
          <div className="flex items-center gap-4">
            {form.cover && (
              <img src={form.cover} alt="封面预览" className="h-16 w-24 rounded-xl object-cover" />
            )}
            <label className={`${btnGhost} cursor-pointer`}>
              {form.cover ? '更换封面' : '上传封面（可选）'}
              <input type="file" accept="image/*" className="hidden" onChange={handleCover} />
            </label>
            {form.cover && (
              <button type="button" onClick={() => setForm({ ...form, cover: '' })} className={btnDanger}>
                移除封面
              </button>
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
              }}
              className={btnGhost}
            >
              取消
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 space-y-3">
        {projects.map((p) => (
          <li key={p.id} className={`${cardClass} flex flex-wrap items-center gap-3`}>
            {p.cover ? (
              <img src={p.cover} alt="" className="h-12 w-16 rounded-lg object-cover" />
            ) : (
              <span className="flex h-12 w-16 items-center justify-center rounded-lg bg-accent/20 text-lg text-accent">
                {p.title.charAt(0)}
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="font-medium">{p.title}</p>
              <p className="mt-0.5 truncate text-sm text-muted">{p.desc}</p>
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
