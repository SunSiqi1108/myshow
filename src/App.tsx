import { Route, Routes } from 'react-router-dom'
import FrontLayout from './components/FrontLayout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import PostDetail from './pages/PostDetail'
import Contact from './pages/Contact'
import Login from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ProfileAdmin from './admin/ProfileAdmin'
import SkillsAdmin from './admin/SkillsAdmin'
import ProjectsAdmin from './admin/ProjectsAdmin'
import PostsAdmin from './admin/PostsAdmin'

// 路由：前台（FrontLayout）与后台（AdminLayout 守卫）相互隔离
export default function App() {
  return (
    <Routes>
      {/* 前台 */}
      <Route element={<FrontLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<PostDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* 后台登录页（无守卫） */}
      <Route path="/admin/login" element={<Login />} />

      {/* 后台（AdminLayout 内做登录守卫） */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="posts" element={<PostsAdmin />} />
      </Route>
    </Routes>
  )
}
