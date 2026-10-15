import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../api/posts'

// 博客列表页：文章卡片（标题 + 日期 + 标签 + 摘要）
export default function Blog() {
  // 首次访问会写入默认文章，之后直接读 localStorage
  const posts = useMemo(() => getPosts(), [])

  return (
    <div className="mx-auto max-w-site px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="text-3xl font-bold sm:text-4xl">博客</h1>
      <p className="mt-4 text-muted">记录学习与实战中的思考。</p>

      <div className="mt-10 space-y-6">
        {posts.map((post) => (
          <article
            key={post.id}
            className="transition-fast rounded-2xl border border-white/5 bg-card p-6 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg"
          >
            <Link to={`/blog/${post.id}`} className="block">
              <h2 className="transition-fast text-xl font-semibold hover:text-accent">
                {post.title}
              </h2>
            </Link>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted">
              <time>{post.date}</time>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-accent/30 px-2 py-0.5 text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {post.excerpt}
            </p>
            <Link
              to={`/blog/${post.id}`}
              className="transition-fast mt-4 inline-block text-sm text-accent hover:underline"
            >
              阅读全文 →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
