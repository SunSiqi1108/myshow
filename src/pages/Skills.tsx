// 技能分组数据（后续迁移到 api/skills 层，由后台管理）
interface SkillItem {
  name: string
  level: 1 | 2 | 3 | 4 | 5 // 熟练度 1-5
}

interface SkillGroup {
  category: string
  items: SkillItem[]
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: '编程语言',
    items: [
      { name: 'C', level: 4 },
      { name: 'Java', level: 4 },
      { name: 'TypeScript', level: 4 },
    ],
  },
  {
    category: '前端',
    items: [
      { name: 'React', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Vite', level: 3 },
    ],
  },
  {
    category: 'AI 工具',
    items: [
      { name: 'Cursor', level: 5 },
      { name: 'Trae', level: 5 },
      { name: 'Claude Code', level: 4 },
      { name: 'MCP / Skills 配置', level: 4 },
    ],
  },
  {
    category: '其他',
    items: [
      { name: 'Git / GitHub', level: 4 },
      { name: '项目管理', level: 3 },
    ],
  },
]

// 熟练度等级对应的文字描述
const LEVEL_LABELS = ['入门', '了解', '掌握', '熟练', '精通']

// 技能页：分类卡片网格 + 熟练度进度条
export default function Skills() {
  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">技能</h1>
      <p className="mt-4 text-muted">我使用的技术栈与工具，以及对应的熟练程度。</p>

      {/* 分类卡片网格：<640px 单列，≥640px 两列 */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {SKILL_GROUPS.map((group) => (
          <section
            key={group.category}
            className="transition-fast rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
          >
            <h2 className="text-lg font-semibold text-accent">
              {group.category}
            </h2>
            <ul className="mt-5 space-y-4">
              {group.items.map((skill) => (
                <li key={skill.name}>
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
