'use client'

import Link from 'next/link'
import CardCourse from '@/src/features/course/card-course'
import Spacer from '@/src/shared/ui/Spacer'

export default function SectionNewCourse() {
  return (
    <section className='w-full h-fit px-[20px] py-[22px]'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-headline text-brand font-bold'>New</p>
          <span className='text-sub text-black opacity-50'>
            이번 주 새로운 공유된 코스들을 구경하고 저장해보세요
          </span>
        </div>
        <Link href='/notices'>더보기</Link>
      </div>
      <Spacer height={22} />
      <div className='flex flex-col gap-[15px]'>
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
      </div>
    </section>
  )
}
