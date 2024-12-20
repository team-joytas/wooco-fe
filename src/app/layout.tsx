import type { Metadata } from 'next'
import './globals.css'
import Header from '@components/Header'
import Footer from '@components/Footer'

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
          <div className='h-[50px]'></div>
        </div>
        <Footer />
      </body>
    </html>
  )
}
