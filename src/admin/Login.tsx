import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { isLoggedIn, login } from '../api/auth'
import { btnPrimary, inputClass } from './ui'

// 后台登录页：账号密码校验，成功跳转 /admin
export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // 已登录则直接进入后台
  if (isLoggedIn()) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (login(username.trim(), password)) {
      navigate('/admin', { replace: true })
    } else {
      setError('账号或密码错误')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/5 bg-card p-8"
      >
        <h1 className="text-2xl font-bold">后台登录</h1>
        <p className="mt-2 text-sm text-muted">个人展示网站管理后台</p>

        <label className="mt-6 block text-sm text-muted" htmlFor="username">
          账号
        </label>
        <input
          id="username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${inputClass} mt-2`}
          placeholder="admin"
        />

        <label className="mt-4 block text-sm text-muted" htmlFor="password">
          密码
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${inputClass} mt-2`}
          placeholder="••••••••"
        />

        {error && (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={`${btnPrimary} mt-6 w-full`}>
          登录
        </button>
      </form>
    </div>
  )
}
