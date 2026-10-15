// 时间线条目类型（后续迁移到 api/profile 层的经历数据）
interface TimelineItem {
  date: string
  title: string
  desc: string
}

// 经历时间线数据：按时间先后排列
const TIMELINE: TimelineItem[] = [
  {
    date: '2023.9 — 至今',
    title: '大连海事大学 · 计算机科学与技术（本科在读）',
    desc: '主修计算机科学与技术，系统学习编程、数据结构与专业核心课程。',
  },
  {
    date: '在校期间',
    title: '班级学习委员 · 副班长',
    desc: '担任班级学习委员与副班长，协助学风建设，组织学习活动，服务同学。',
  },
  {
    date: '2026 年',
    title: 'AI 编程课程与独立实战',
    desc: '系统完成 AI 编程课程，独立完成浏览器插件开发并部署上线。',
  },
]

// 关于页：个人简介 + 经历时间线 + 教育背景
export default function About() {
  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">关于我</h1>

      {/* 个人简介：第一人称一段话 */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-accent">个人简介</h2>
        <p className="mt-4 max-w-3xl leading-loose text-muted">
          我是一名计算机科学与技术专业的学生，热衷AI应用与前端开发，喜欢用AI工具把想法快速变成真实作品。从浏览器插件到全栈摘要工具，我做过多个AI辅助的实战项目，并在一次次从0到1的实践中，持续打磨自己的工程能力与产品思维。
        </p>
      </section>

      {/* 经历时间线：左侧竖线 + 圆点，卡片悬浮微浮起 */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-accent">经历时间线</h2>
        <div className="relative ml-3 mt-8 space-y-8 border-l border-white/10 pl-8">
          {TIMELINE.map((item) => (
            <div key={item.title} className="relative">
              {/* 圆点：压在线上，ring 用背景色制造“断开”视觉效果 */}
              <span
                aria-hidden="true"
                className="absolute -left-[38px] top-2 h-3 w-3 rounded-full bg-accent ring-4 ring-base"
              />
              <time className="text-sm font-medium text-accent">
                {item.date}
              </time>
              <div className="transition-fast mt-2 rounded-2xl border border-white/5 bg-card p-5 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 教育背景卡片 */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-accent">教育背景</h2>
        <div className="transition-fast mt-6 flex flex-col gap-4 rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">大连海事大学</h3>
            <p className="mt-1 text-muted">计算机科学与技术 · 本科</p>
          </div>
          <span className="w-fit rounded-xl border border-accent/30 px-4 py-2 text-sm text-accent">
            2023 — 2027
          </span>
        </div>
      </section>
    </div>
  )
}
