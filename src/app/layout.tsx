import type { Metadata } from 'next'
import './globals.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import LayoutSpacer from '@components/LayoutSpacer'
import localFont from 'next/font/local'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='kr' className={`h-full ${pretendard.variable}`}>
      <body className='h-full flex items-center flex-col overflow-y-scroll'>
        <Header />
        <div className='mx-auto flex-1 text-black w-full max-w-[375px]'>
          {children}
          <LayoutSpacer />
        </div>
        <Footer />
      </body>
    </html>
  )
}
