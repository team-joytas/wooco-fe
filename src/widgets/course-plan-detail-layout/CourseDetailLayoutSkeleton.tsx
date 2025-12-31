import { Spacer, Divider, DivSkeleton } from '@/src/shared/ui'
import { CourseHeader } from '../header'

export function CourseDetailLayoutSkeleton() {
  return (
    <>
      <CourseHeader title={''} id={''} isLiked={false} isMine={false} />
      <div className='w-full flex flex-col px-[30px]'>
        <div className='w-full items-center justify-center inline-flex gap-[5px] py-[8px]'>
          {Array.from({ length: 3 }, (_, index) => (
            <DivSkeleton
              key={index}
              height={30}
              width={50}
              className='px-[10px] py-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
            />
          ))}
        </div>

        <DivSkeleton height={180} width={315} className='rounded-[10px]' />
        <Spacer height={16} />

        <div className='flex flex-row text-sub text-[rgba(0,0,0,0.8)]'>
          <DivSkeleton height={20} width={30} />
          &nbsp; 님의 코스 제안이에요.
        </div>

        <Spacer height={10} />
        {Array.from({ length: 3 }, (_, index) => (
          <DivSkeleton
            key={index}
            height={30}
            width={315}
            className='my-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
          />
        ))}

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <div className='flex flex-row text-sub'>
            <DivSkeleton height={20} width={30} />
            &nbsp;님의 코스 설명이에요.
          </div>
          <DivSkeleton height={100} width={315} className='rounded-[10px]' />
        </section>

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <div className='flex flex-row text-sub'>
            <DivSkeleton height={20} width={30} />
            &nbsp;님이 방문한 날짜에요.
          </div>
          <DivSkeleton height={40} width={315} className='rounded-full' />
        </section>
        <Spacer height={16} />
      </div>

      <Spacer height={25} />
    </>
  )
}
