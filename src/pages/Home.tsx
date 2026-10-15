import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getProfile } from '../api/profile'

// 首页 Hero：头像 + 姓名 + 职位 + 一句话介绍 + 三个 CTA，垂直居中近一屏高
// 数据来自 profile API（localStorage），后台修改后刷新即生效
export default function Home() {
  const profile = useMemo(() => getProfile(), [])

  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-site flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      {/* 头像：有 base64 头像则显示图片，否则显示默认占位 */}
      {profile.avatar ? (
        <img
          src={profile.avatar}
          alt={`${profile.name}的头像`}
          className="h-[120px] w-[120px] rounded-full border-2 border-accent object-cover shadow-glow"
        />
      ) : (
        <div
          className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-accent bg-card text-4xl font-bold text-accent shadow-glow"
          role="img"
          aria-label={`${profile.name}的头像占位`}
        >
          {profile.name.charAt(0)}
        </div>
      )}

      <h1 className="mt-8 text-4xl font-bold tracking-wide sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-lg text-muted">{profile.title}</p>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">{profile.bio}</p>

      {/* CTA 按钮组：主按钮实心、次按钮描边、第三按钮文字链接 */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/projects"
          className="transition-fast rounded-xl bg-accent px-6 py-3 text-sm font-medium text-base hover:opacity-90"
        >
          查看项目
        </Link>
        <Link
          to="/contact"
          className="transition-fast rounded-xl border border-accent/50 px-6 py-3 text-sm font-medium text-ink hover:bg-white/5"
        >
          联系我
        </Link>
        {/* 简历下载占位：后续接入 Profile.resume 的 base64 下载 */}
        <a
          href="#"
          className="transition-fast px-2 py-3 text-sm text-muted underline underline-offset-4 hover:text-accent"
        >
          下载简历
        </a>
      </div>
    </section>
  )
}
