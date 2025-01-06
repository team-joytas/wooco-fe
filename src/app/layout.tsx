import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/components/(layout)/Header'
import Footer from '@/app/components/(layout)/Footer'
import LayoutSpacer from '@/app/components/(layout)/LayoutSpacer'

export const metadata: Metadata = {
  title: 'WOOCO - 우코',
  description: '우리들의 코스',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='kr' className='h-full'>
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
