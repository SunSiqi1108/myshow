import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

// 导航项集中配置，便于后续维护
const NAV_ITEMS = [
  { to: '/', label: '首页' },
  { to: '/about', label: '关于' },
  { to: '/projects', label: '项目' },
  { to: '/skills', label: '技能' },
  { to: '/blog', label: '博客' },
  { to: '/contact', label: '联系' },
]

// 吸顶毛玻璃导航栏，移动端汉堡菜单
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // 路由切换后自动收起移动端菜单
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-fast rounded-xl px-3 py-2 text-sm ${
      isActive ? 'text-accent' : 'text-muted hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-base/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-lg font-bold tracking-wide">
          孙思琦
        </Link>

        {/* 桌面端导航 */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 移动端汉堡按钮 */}
        <button
          type="button"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="transition-fast rounded-xl p-2 text-ink hover:bg-white/5 md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* 移动端下拉菜单 */}
      {open && (
        <ul className="border-t border-white/5 px-4 pb-4 pt-2 md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `transition-fast block rounded-xl px-3 py-3 text-base ${
                    isActive ? 'text-accent' : 'text-muted hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
