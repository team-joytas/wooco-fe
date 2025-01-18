'use client'

import Link from 'next/link'
import DefaultHeader from '@/src/widgets/default-header'

export default function Error() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-110px)]'>
      <h2 className='text-[20px] text-bold mb-4'>
        요청하신 페이지는 없는 페이지입니다.
      </h2>
      <Link
        className='px-[20px] py-[10px] text-[15px] bg-brand text-white rounded-full'
        href={'/'}
      >
        홈으로 이동하기
      </Link>
    </div>
  )
}
