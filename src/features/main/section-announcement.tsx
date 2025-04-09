'use client'

import { Spacer } from '@/src/shared/ui'
import { CardAnnouncement } from './card-announcement'

export function SectionAnnouncement() {
  return (
    <section className='w-full h-fit py-[14px] px-[20px] border-b-[1px] border-container-blue'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <p className='text-headline text-brand font-semibold'>공지사항</p>
          <span className='text-sub text-black opacity-50'>
            우코를 사용하실 때, 알고 있으면 좋아요
          </span>
        </div>
        {/* TODO: 공지사항 관련 api 추가 후 더보기 버튼 추가
        <Link href='/notices'>더보기</Link> */}
      </div>
      <Spacer height={22} />
      <div className='flex flex-col gap-[10px]'>
        <CardAnnouncement />
      </div>
      <Spacer height={22} />
    </section>
  )
}
