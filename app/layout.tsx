import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { Suspense } from 'react'
import { Spacer } from '@/src/shared/ui'
import { MainHeader, NavigationBar } from '@/src/widgets'
import { AppProviders } from '@/app/providers'

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
    <html lang='kr' className={`h-vh ${pretendard.variable}`}>
      <body
        className={`${pretendard.className} h-full flex items-center flex-col overflow-y-scroll`}
      >
        <AppProviders>
          <Suspense fallback={null}>
            <MainHeader />
          </Suspense>
          <div className='mx-auto flex-1 text-black h-full w-full max-w-[375px]'>
            {children}
            <Spacer height={60} notShowURLs={['/login']} />
          </div>
          <NavigationBar />
        </AppProviders>
      </body>
    </html>
  )
}
