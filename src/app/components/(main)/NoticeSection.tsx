'use client'

import Link from 'next/link'
import Spacer from '../Spacer'
import NoticeItem from './NoticeItem'

export default function NoticeSection() {
  return (
    <section
      className={
        'w-full h-fit py-[22px] px-[20px] border-b-[1px] border-header-line'
      }
    >
      <div className={'flex items-center justify-between'}>
        <div className={'flex flex-col'}>
          <p className={'text-headline text-brand font-bold'}>공지사항</p>
          <span className={'text-sub text-black opacity-50'}>
            우코를 사용하실 때, 알고 있으면 좋아요
          </span>
        </div>
        <Link href='/notices'>더보기</Link>
      </div>
      <Spacer height={22} />
      <div className={'flex flex-col gap-[10px]'}>
        <NoticeItem />
        <NoticeItem />
        <NoticeItem />
        <NoticeItem />
      </div>
    </section>
  )
}
