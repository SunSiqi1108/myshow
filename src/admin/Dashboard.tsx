import { getProfile } from '../api/profile'
import { getSkills } from '../api/skills'
import { getProjects } from '../api/projects'
import { getPosts } from '../api/posts'
import { getMessages } from '../api/messages'
import { cardClass } from './ui'

// 仪表盘：内容统计概览
export default function Dashboard() {
  // 每次进入仪表盘重新统计（数据量小，直接读取 localStorage）
  const profile = getProfile()
  const stats = [
    { label: '技能', value: getSkills().length },
    { label: '项目', value: getProjects().length },
    { label: '博客文章', value: getPosts().length },
    { label: '留言', value: getMessages().length },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold">仪表盘</h1>
      <p className="mt-2 text-sm text-muted">
        你好，{profile.name}！这里是内容概览。
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className={cardClass}>
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-accent">{s.value}</p>
          </div>
        ))}
      </div>

      <div className={`${cardClass} mt-6`}>
        <h2 className="font-semibold">快捷提示</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>在左侧菜单管理个人信息、技能、项目和博客文章。</li>
          <li>所有改动保存在浏览器 localStorage，前台刷新立即生效。</li>
          <li>头像、简历等文件请控制在 2MB 以内。</li>
        </ul>
      </div>
    </div>
  )
}
