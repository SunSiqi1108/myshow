import { useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { isLoggedIn, logout } from '../api/auth'

// 侧边栏菜单配置
const MENU = [
  { to: '/admin', label: '仪表盘', end: true },
  { to: '/admin/profile', label: '个人信息' },
  { to: '/admin/skills', label: '技能' },
  { to: '/admin/projects', label: '项目' },
  { to: '/admin/posts', label: '博客' },
]

// 后台布局：路由守卫 + 侧边栏 + 顶栏，未登录跳登录页
export default function AdminLayout() {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // 路由守卫：未登录访问任何 /admin 子页面都跳登录页
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-fast block rounded-xl px-4 py-2.5 text-sm ${
      isActive ? 'bg-accent/15 text-accent' : 'text-muted hover:bg-white/5 hover:text-ink'
    }`

  // 侧边栏内容（桌面固定栏与移动端抽屉共用）
  const sidebarBody = (
    <>
      <div className="px-4 py-5 text-lg font-bold">管理后台</div>
      <nav className="flex-1 space-y-1 px-3">
        {MENU.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={linkClass}
            onClick={() => setDrawerOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/5 p-3">
        <Link
          to="/"
          className="transition-fast block rounded-xl px-4 py-2.5 text-sm text-muted hover:bg-white/5 hover:text-ink"
        >
          ← 返回前台
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="transition-fast block w-full rounded-xl px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-400/10"
        >
          退出登录
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen">
      {/* 桌面端固定侧边栏 */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-white/5 bg-card md:flex">
        {sidebarBody}
      </aside>

      {/* 移动端抽屉侧边栏 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute left-0 top-0 flex h-full w-56 flex-col bg-card">
            {sidebarBody}
          </aside>
        </div>
      )}

      {/* 右侧：顶栏 + 内容区 */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-white/5 bg-base/70 px-4 backdrop-blur-md">
          {/* 移动端汉堡按钮 */}
          <button
            type="button"
            aria-label="打开菜单"
            onClick={() => setDrawerOpen(true)}
            className="transition-fast rounded-xl p-2 text-ink hover:bg-white/5 md:hidden"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold">孙思琦 · 个人网站管理</span>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
