'use client'

import { Spacer, Divider, SkeletonDiv } from '@/src/shared/ui'
import { CoursePlanHeader } from '@/src/widgets'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN

interface CoursePlanDetailLayoutProps {
  type: CoursePlanType
}

export function SkeletonCoursePlanDetailLayout({
  type,
}: CoursePlanDetailLayoutProps) {
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'
  const isCourse = type === COURSE_PLAN.course

  return (
    <>
      <CoursePlanHeader
        title={''}
        type={type}
        id={''}
        showLike={false}
        isLiked={false}
        isMine={false}
      />
      <div
        className={`w-full flex flex-col ${
          isCourse ? 'px-[30px]' : 'min-h-[calc(100vh-194px)]'
        }`}
      >
        <div className='w-full items-center justify-center inline-flex gap-[5px] py-[8px]'>
          {Array.from({ length: 3 }, (_, index) => (
            <SkeletonDiv
              key={index}
              height={30}
              width={50}
              className='px-[10px] py-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
            />
          ))}
        </div>

        <SkeletonDiv height={180} width={315} className='rounded-[10px]' />
        <Spacer height={16} />

        <div className='flex flex-row text-sub text-[rgba(0,0,0,0.8)]'>
          <SkeletonDiv height={20} width={30} />
          &nbsp;
          {isCourse ? '님의 코스 제안이에요.' : '님이 선택한 장소들이에요.'}
        </div>

        <Spacer height={10} />
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonDiv
            key={index}
            height={30}
            width={315}
            className='my-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
          />
        ))}

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <div className='flex flex-row text-sub'>
            <SkeletonDiv height={20} width={30} />
            &nbsp;님의 {typeName} 설명이에요.
          </div>
          <SkeletonDiv height={100} width={315} className='rounded-[10px]' />
        </section>

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <div className='flex flex-row text-sub'>
            <SkeletonDiv height={20} width={30} />
            &nbsp;님이 {visit} 날짜에요.
          </div>
          <SkeletonDiv height={40} width={315} className='rounded-full' />
        </section>
        <Spacer height={16} />
      </div>

      <Spacer height={25} />
    </>
  )
}
