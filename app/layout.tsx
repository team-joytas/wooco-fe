import type { Metadata } from 'next'
import './globals.css'
import Spacer from '@/src/shared/ui/Spacer'
import DefaultHeader from '@/src/widgets/DefaultHeader'
import DefaultFooter from '@/src/widgets/DefaultFooter'
import localFont from 'next/font/local'
import { AnimatePresence } from 'framer-motion'
import { ConfigProvider } from 'antd'
import ReactQueryProvider from '@/src/shared/provider/ReactQueryProvider'

export const metadata: Metadata = {
  title: 'WOOCO - 우코',
  description: '우리들의 코스',
  icons: {
    icon: '/logo.png',
  },
}

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const theme = {
  token: {
    borderRadius: 20,
    colorPrimary: '#5A59F2',
    colorBgContainer: '#F7F7F7',
    colorBorder: '#ffffff',
    colorText: 'rgba(0, 0, 0, 0.5)',
    fontSize: 11,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='kr' className={`h-vh ${pretendard.variable}`}>
      <body className='h-full flex items-center flex-col overflow-y-scroll'>
        <ReactQueryProvider>
          <DefaultHeader />
          <ConfigProvider theme={theme}>
            <AnimatePresence>
              <div className='mx-auto flex-1 text-black w-full max-w-[375px]'>
                {children}
                <Spacer height={60} notShowURLs={['/login']} />
              </div>
            </AnimatePresence>
          </ConfigProvider>
        </ReactQueryProvider>
        <DefaultFooter />
      </body>
    </html>
  )
}
