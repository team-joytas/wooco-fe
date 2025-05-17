import type { Metadata } from 'next'
import './globals.css'
import { Spacer } from '@/src/shared/ui'
import { MainHeader } from '@/src/widgets'
import DefaultFooter from '@/src/widgets/default-footer'
import localFont from 'next/font/local'
import { AppProviders } from '@/src/shared/provider'

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
          <MainHeader />
          <div className='mx-auto flex-1 text-black h-full w-full max-w-[375px]'>
            {children}
            <Spacer height={60} notShowURLs={['/login']} />
          </div>
          <DefaultFooter />
        </AppProviders>
      </body>
    </html>
  )
}
