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

        'wooco_blue-tertiary': '#EFEEFE',
        'wooco_blue-primary-light': '#B3BAF1',
        'wooco_blue-secondary': '#9997F2',
        'wooco_blue-primary': '#5A59F2',
        'wooco_blue-primary-hover': '#5150DA',
        'wooco_blue-primary-active': '#4847C2',
        'wooco_blue-dark': '#4443B6',
        'wooco_blue-dark-hover': '#363591',
        'wooco_blue-dark-active': '#28286D',
        'wooco_blue-darker': '#1f1f55',

        'gray-100': '#F5F5F5',
        'gray-200': '#D9D9D9',
        'gray-300': '#CCCCCC',
        'gray-400': '#B3B3B3',
        'gray-500': '#8A8A8A',
        'gray-600': '#777777',
        'gray-700': '#666666',
        'gray-800': '#4E4E4E',
        'gray-900': '#2A2A2A',

        'black-20': 'rgba(0,0,0,0.2)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'black-70': 'rgba(0, 0, 0, 0.7)',
        'black-100': 'rgba(0, 0, 0, 1.0)',

        'white': '#FFFFFF',
        'error': '#FF3A3A',
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
        'floating-button': '0 0 5px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
