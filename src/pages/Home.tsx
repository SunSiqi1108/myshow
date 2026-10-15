import { Link } from 'react-router-dom'

// 首页 Hero：头像 + 姓名 + 职位 + 一句话介绍 + 三个 CTA，垂直居中近一屏高
export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-site flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      {/* 头像占位：120px 圆形 + 发光边框，后续从 Profile 读取 base64 头像 */}
      <div
        className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-2 border-accent bg-card text-4xl font-bold text-accent shadow-glow"
        role="img"
        aria-label="孙思琦的头像占位"
      >
        琦
      </div>

      <h1 className="mt-8 text-4xl font-bold tracking-wide sm:text-5xl">
        孙思琦
      </h1>
      <p className="mt-3 text-lg text-muted">
        大连海事大学 · 计算机科学与技术专业
      </p>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        热衷AI应用与前端开发，做过多个AI辅助的实战项目
      </p>

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
