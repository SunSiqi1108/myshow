import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPost } from '../api/posts'

// 博客详情页：按 id 渲染 Markdown 正文
export default function PostDetail() {
  const { id } = useParams<{ id: string }>()
  const post = id ? getPost(id) : undefined

  // 文章不存在时的兜底提示
  if (!post) {
    return (
      <div className="mx-auto max-w-site px-4 py-20 text-center sm:px-6">
        <p className="text-muted">文章不存在或已被删除。</p>
        <Link
          to="/blog"
          className="transition-fast mt-6 inline-block text-accent hover:underline"
        >
          ← 返回博客列表
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        to="/blog"
        className="transition-fast text-sm text-muted hover:text-accent"
      >
        ← 返回博客列表
      </Link>

      <h1 className="mt-6 text-3xl font-bold leading-snug sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
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

      {/* Markdown 正文：排版样式见 index.css 的 .markdown-body */}
      <div className="markdown-body mt-10">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  )
}
