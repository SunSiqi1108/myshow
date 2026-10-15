import { useMemo } from 'react'
import { getProjects } from '../api/projects'
import type { Project } from '../types'

// 封面占位渐变色组合（均使用主题色，按项目序号轮换）
const COVER_GRADIENTS = [
  'bg-gradient-to-br from-accent/60 to-accent/10',
  'bg-gradient-to-tr from-accent/40 to-white/5',
  'bg-gradient-to-bl from-white/10 to-accent/30',
  'bg-gradient-to-br from-accent/70 to-card',
]

// 单个项目卡片：封面占位 + 名称 + 描述 + 标签 + GitHub 链接
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const gradient = COVER_GRADIENTS[index % COVER_GRADIENTS.length]

  return (
    <article className="transition-fast flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-card hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
      {/* 封面占位：渐变底 + 项目首字符，后续替换为 base64 封面图 */}
      <div
        className={`flex h-40 items-center justify-center text-5xl font-bold text-ink/80 ${gradient}`}
        role="img"
        aria-label={`${project.title} 封面占位`}
      >
        {project.title.charAt(0)}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.desc}
        </p>

        {/* 技术标签 */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg border border-accent/30 px-2.5 py-1 text-xs text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* GitHub 链接：未填写时显示置灰占位 */}
        <div className="mt-5 border-t border-white/5 pt-4">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-fast inline-flex items-center gap-2 text-sm text-muted hover:text-accent"
            >
              <GitHubIcon />
              GitHub
            </a>
          ) : (
            <span
              className="inline-flex cursor-not-allowed items-center gap-2 text-sm text-muted/50"
              title="链接待补充"
            >
              <GitHubIcon />
              GitHub 链接待补充
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

// GitHub 图标（内联 SVG，避免引入图标库）
function GitHubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

// 项目页：卡片网格，数据经 api 层读取
export default function Projects() {
  // 首次访问会写入默认数据，之后直接读 localStorage
  const projects = useMemo(() => getProjects(), [])

  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">项目</h1>
      <p className="mt-4 text-muted">我做过的实战项目，从浏览器插件到 AI 应用。</p>

      {/* 卡片网格：<640px 单列 / 640-1024px 两列 / >1024px 三列 */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  )
}
