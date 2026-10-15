import { useEffect, useRef } from 'react'

// 星星粒子数据结构
interface Star {
  x: number // 横向位置（0~1 比例，乘以画布宽度）
  y: number // 纵向位置（px，通过取模实现无缝滚动）
  r: number // 半径
  base: number // 基础亮度（0~1）
  speed: number // 闪烁速度
  phase: number // 闪烁相位
  depth: number // 视差深度（0~1，越大随滚动移动越快）
}

// 全局星空背景：固定定位在页面底层，不响应鼠标事件
export default function StarBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let stars: Star[] = []
    let w = 0
    let h = 0
    // 限制 DPR 上限，避免高分屏过度消耗性能
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // 系统“减少动态效果”偏好：开启时只绘制一帧静态星空
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // 初始化粒子：数量按屏幕面积计算，移动端降低密度
    const initStars = () => {
      w = window.innerWidth
      h = window.innerHeight
      const isMobile = w < 640
      const divisor = isMobile ? 6000 : 11000
      const count = Math.max(30, Math.min(220, Math.floor((w * h) / divisor)))

      stars = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.4,
        base: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.0015 + 0.0005,
        phase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.5 + 0.1,
      }))
    }

    // 同步画布尺寸（含高分屏缩放）
    const resize = () => {
      initStars()
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // 绘制一帧：闪烁 + 滚动视差
    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h)
      const scrollY = window.scrollY
      const reduced = motionQuery.matches

      for (const s of stars) {
        // 视差：星星按各自深度随滚动偏移，取模保证无缝循环
        let y = (s.y - scrollY * s.depth) % h
        if (y < 0) y += h

        // 闪烁：亮度随时间正弦变化；减少动态时使用固定亮度
        const alpha = reduced
          ? s.base
          : s.base * (0.6 + 0.4 * Math.sin(time * s.speed + s.phase))

        ctx.globalAlpha = alpha
        ctx.fillStyle = '#E6EAF2'
        ctx.beginPath()
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const tick = (time: number) => {
      draw(time)
      raf = requestAnimationFrame(tick)
    }

    // 根据动态偏好启动动画循环或仅画静态帧
    const start = () => {
      cancelAnimationFrame(raf)
      if (motionQuery.matches) {
        draw(0)
      } else {
        raf = requestAnimationFrame(tick)
      }
    }

    const handleMotionChange = () => start()

    resize()
    start()
    window.addEventListener('resize', resize)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
