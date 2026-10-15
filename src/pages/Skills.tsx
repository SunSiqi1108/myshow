import { useMemo } from 'react'
import { getSkills } from '../api/skills'
import type { Skill } from '../types'

// 熟练度等级对应的文字描述
const LEVEL_LABELS = ['入门', '了解', '掌握', '熟练', '精通']

// 技能页：分类卡片网格 + 熟练度进度条，数据经 api 层读取
export default function Skills() {
  // 首次访问会写入默认数据，之后直接读 localStorage
  const skills = useMemo(() => getSkills(), [])

  // 按分类分组（保持数据中的原始顺序）
  const groups = useMemo(() => {
    const map = new Map<string, Skill[]>()
    for (const s of skills) {
      const arr = map.get(s.category) ?? []
      arr.push(s)
      map.set(s.category, arr)
    }
    return [...map.entries()].map(([category, items]) => ({ category, items }))
  }, [skills])

  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">技能</h1>
      <p className="mt-4 text-muted">我使用的技术栈与工具，以及对应的熟练程度。</p>

      {/* 分类卡片网格：<640px 单列，≥640px 两列 */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <section
            key={group.category}
            className="transition-fast rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-accent">
              {group.category}
            </h2>
            <ul className="mt-5 space-y-4">
              {group.items.map((skill) => (
                <li key={skill.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <span className="text-muted">
                      {LEVEL_LABELS[skill.level - 1]}
                    </span>
                  </div>
                  {/* 熟练度进度条：等级 1-5 映射为百分比宽度 */}
                  <div
                    className="mt-2 h-2 rounded-full bg-white/10"
                    role="progressbar"
                    aria-label={`${skill.name} 熟练度`}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    aria-valuenow={skill.level}
                  >
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
