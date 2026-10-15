// 全局页脚
export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-site flex-col items-center gap-2 px-4 text-sm text-muted sm:px-6">
        <p>© {new Date().getFullYear()} 孙思琦 · 保留所有权利</p>
        <p className="text-xs">基于 React + Vite + Tailwind CSS 构建</p>
      </div>
    </footer>
  )
}
