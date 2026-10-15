import { useState } from 'react'
import { getSkills, saveSkills } from '../api/skills'
import type { Skill } from '../types'
import { btnDanger, btnGhost, btnPrimary, cardClass, inputClass } from './ui'

const LEVEL_LABELS = ['入门', '了解', '掌握', '熟练', '精通']

interface SkillForm {
  category: string
  name: string
  level: number
}

const EMPTY_FORM: SkillForm = { category: '', name: '', level: 3 }

// 技能管理：列表 + 新增/编辑/删除
export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>(() => getSkills())
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<SkillForm>(EMPTY_FORM)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState('')

  // 持久化并同步本地状态
  const persist = (list: Skill[]) => {
    setSkills(list)
    saveSkills(list)
  }

  // 提交表单：新增或保存编辑
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.category.trim() || !form.name.trim()) {
      setError('分类和名称不能为空')
      return
    }
    const level = Math.min(5, Math.max(1, form.level)) as Skill['level']
    if (editingId) {
      persist(
        skills.map((s) =>
          s.id === editingId
            ? { ...s, category: form.category.trim(), name: form.name.trim(), level }
            : s,
        ),
      )
    } else {
      persist([
        ...skills,
        {
          id: crypto.randomUUID(),
          category: form.category.trim(),
          name: form.name.trim(),
          level,
        },
      ])
    }
    setForm(EMPTY_FORM)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  // 载入编辑
  const startEdit = (skill: Skill) => {
    setEditingId(skill.id)
    setForm({ category: skill.category, name: skill.name, level: skill.level })
    setShowForm(true)
    setError('')
  }

  // 删除（弹确认框）
  const handleDelete = (id: string) => {
    if (!window.confirm('确定删除该技能吗？')) return
    persist(skills.filter((s) => s.id !== id))
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">技能管理</h1>
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
          {showForm ? '收起' : '新增技能'}
        </button>
      </div>

      {/* 新增/编辑表单 */}
      {showForm && (
        <form onSubmit={handleSubmit} className={`${cardClass} mt-4 space-y-4`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm text-muted" htmlFor="category">
                分类
              </label>
              <input
                id="category"
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="如：前端"
              />
            </div>
            <div>
              <label className="block text-sm text-muted" htmlFor="name">
                名称
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`${inputClass} mt-2`}
                placeholder="如：React"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-muted" htmlFor="level">
              熟练度：{form.level} / 5（{LEVEL_LABELS[form.level - 1]}）
            </label>
            <input
              id="level"
              type="range"
              min={1}
              max={5}
              step={1}
              value={form.level}
              onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
              className="mt-3 w-full accent-accent"
            />
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

      {/* 技能列表 */}
      <ul className="mt-6 space-y-3">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className={`${cardClass} flex flex-wrap items-center gap-3`}
          >
            <span className="rounded-lg border border-accent/30 px-2 py-0.5 text-xs text-accent">
              {skill.category}
            </span>
            <span className="flex-1 font-medium">{skill.name}</span>
            <span className="text-sm text-muted">
              {skill.level}/5 · {LEVEL_LABELS[skill.level - 1]}
            </span>
            <button type="button" onClick={() => startEdit(skill)} className={btnGhost}>
              编辑
            </button>
            <button type="button" onClick={() => handleDelete(skill.id)} className={btnDanger}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
