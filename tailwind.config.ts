import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      spacing: {
        10: '10px',
        20: '20px',
        24: '24px',
        25: '25px',
        40: '40px',
        50: '50px',
      },
      boxShadow: {
        custom: '0 -2px 4px rgba(0, 0, 0, 0.1)', // 위쪽 그림자 추가
      },
    },
  },
  plugins: [],
}
export default config
