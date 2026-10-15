/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 主题色集中定义，禁止在组件里硬编码色值
        base: '#0B0F1A', // 全局背景
        card: '#121828', // 卡片背景
        ink: '#E6EAF2', // 主文字
        muted: '#9AA4B8', // 次要文字
        accent: '#6C8CFF', // 强调色（后续可配置）
      },
      borderRadius: {
        xl2: '14px', // 圆角规范 12-16px 之间的中间值
      },
      maxWidth: {
        site: '1200px', // 内容最大宽度
      },
    },
  },
  plugins: [],
}
