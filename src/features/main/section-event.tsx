'use client'

import Link from 'next/link'
import Spacer from '@/src/shared/ui/Spacer'
import CardEvent from '@/src/features/main/card-event'

export default function SectionEvent() {
  return (
    <section className='w-full h-fit py-[22px]'>
      <div className='flex items-center justify-between px-[20px]'>
        <div className='flex flex-col'>
          <p className='text-headline text-brand font-bold'>이벤트</p>
          <span className='text-sub text-black opacity-50'>
            새로운 이벤트, 놓치지 말고 챙기세요
          </span>
        </div>
        <Link href='/events'>더보기</Link>
      </div>
      <Spacer height={22} />
      <div className='w-full h-fit overflow-x-auto scrollbar-hide px-[20px]'>
        <div className='w-fit flex gap-[14px]'>
          <CardEvent />
          <CardEvent />
          <CardEvent />
          <CardEvent />
        </div>
      </div>
    </section>
  )
}
