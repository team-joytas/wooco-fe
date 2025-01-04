'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-110px)]'>
      <h2 className='text-[20px] text-bold mb-4'>
        예상치 못한 오류가 발생했습니다.
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
