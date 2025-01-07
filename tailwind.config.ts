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
        brand: '#5A59F2',
        'header-line': '#737CC4',
        'container-blue': '#9997F2',
        'container-light-blue': '#B3BAF1',
        'light-gray': '#F0F0F0',
        'bright-gray': '#F7F7F7',
        kakao: '#FFDC00',
        'search-gray': '#747474',
        description: 'rgba(0, 0, 0, 0.5)',
        black13: 'rgba(0, 0, 0, 0.13)',
      },
      fontSize: {
        headline: '20px',
        main: '16px',
        middle: '14px',
        sub: '11px',
      },
      spacing: {
        10: '10px',
        16: '16px',
        20: '20px',
        24: '24px',
        25: '25px',
        32: '32px',
        40: '40px',
        50: '50px',
        60: '60px',
      },
      boxShadow: {
        custom: '0 -2px 4px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
export default config
