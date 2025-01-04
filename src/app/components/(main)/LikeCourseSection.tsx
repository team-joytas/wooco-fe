'use client'

import Link from 'next/link'
import Spacer from '../Spacer'
import LikeCourseItem from './LikeCourseItem'

export default function LikeCourseSection() {
  return (
    <section
      className={'w-full h-fit py-[22px] border-b-[1px] border-header-line'}
    >
      <div className={'px-[20px] flex items-center justify-between'}>
        <div className={'flex flex-col'}>
          <p>
            <span className={'text-headline text-brand font-bold'}>
              홍인데유
            </span>
            <span className={'text-main font-bold'}>&nbsp;님의 관심코스</span>
          </p>
          <span className={'text-sub text-black opacity-50'}>
            관심있는 지역/장소들을 내 코스로 만들어봐요
          </span>
        </div>
        <Link href='/notices'>더보기</Link>
      </div>
      <Spacer height={12} />
      <div
        className={
          'w-full h-fit overflow-x-auto scrollbar-hide py-[10px] px-[20px]'
        }
      >
        <div className={'w-fit flex gap-[22px]'}>
          <LikeCourseItem />
          <LikeCourseItem />
          <LikeCourseItem />
          <LikeCourseItem />
        </div>
      </div>
    </section>
  )
}
