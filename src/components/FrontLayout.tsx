import { Outlet } from 'react-router-dom'
import StarBg from './StarBg'
import Navbar from './Navbar'
import Footer from './Footer'

// 前台布局：星空背景 + 导航 + 内容 + 页脚
export default function FrontLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <StarBg />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
