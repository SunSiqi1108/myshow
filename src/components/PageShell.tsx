// 占位页面通用容器：统一最大宽度与留白
function PageShell({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="mx-auto max-w-site px-4 py-20 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-4 text-muted">{desc}</p>
      <div className="mt-10 rounded-2xl border border-white/5 bg-card p-10 text-center text-muted">
        内容建设中，敬请期待
      </div>
    </section>
  )
}

export default PageShell
