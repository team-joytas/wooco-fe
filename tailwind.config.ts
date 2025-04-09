import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: '#5A59F2',
        'header-line': '#737CC4',
        'container-blue': '#9997F2',
        'container-light-blue': '#B3BAF1',
        'dark-gray': '#D9D9D9',
        'light-gray': '#F0F0F0',
        'bright-gray': '#F7F7F7',
        kakao: '#FFDC00',
        'search-gray': '#747474',
        description: 'rgba(0, 0, 0, 0.5)',
        more: 'rgba(0, 0, 0, 0.7)',
        black13: 'rgba(0, 0, 0, 0.13)',

        'gray-300': '#F2F2F2',
        'gray-500': '#A9A9A9',
        'gray-600': '#757575',
        'gray-700': '#3A3A3A',
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
        'floating-button': '0 0 5.1px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
