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
