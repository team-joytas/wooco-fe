'use client'

import { Share2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ShareModal, PlaceCollapse } from '@/src/features'
import type { CourseType } from '@/src/entities/course'
import { CATEGORY } from '@/src/entities/course'
import { CoursePlanHeader } from '@/src/widgets'
import useUserStore from '@/src/shared/store/userStore'
import { PlanType } from '@/src/entities/plan'
import { Spacer, ActiveKakaoMap, Divider } from '@/src/shared/ui'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN

interface CoursePlanDetailLayoutProps {
  type: CoursePlanType
  id: string
  children?: React.ReactNode
  data: CourseType | PlanType
}

export function CoursePlanDetailLayout({
  type,
  id,
  children,
  data,
}: CoursePlanDetailLayoutProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userId = useUserStore((state) => state.user?.user_id)
  const userName = useUserStore((state) => state.user?.name)
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'

  const isCourseType = (data: CourseType | PlanType) =>
    'writer' in data && 'is_liked' in data

  const isCourse = useMemo(() => isCourseType(data), [data])
  const isMine = useMemo(
    () => (isCourse ? userId === (data as CourseType).writer.id : true),
    [isCourse, userId, data]
  )

  return (
    <>
      <CoursePlanHeader
        title={data?.title || ''}
        type={type}
        id={id}
        isLiked={isCourseType(data) ? data.is_liked : false}
        isMine={isMine}
      />
      <div
        className={`w-full flex flex-col ${
          isCourse ? '' : 'min-h-[calc(100vh-194px)]'
        }`}
      >
        {isCourseType(data) && (
          <div className='w-full items-center justify-center inline-flex gap-[5px] py-[8px]'>
            {data?.categories?.map((category, index) => {
              return (
                <span
                  key={index}
                  className='px-[10px] py-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
                >
                  {CATEGORY[category as keyof typeof CATEGORY]}
                </span>
              )
            })}
          </div>
        )}

        {data?.places && data?.places.length > 0 && (
          <div className='px-[30px]'>
            <ActiveKakaoMap
              places={data?.places || []}
              activeIndex={activeIndex}
            />
          </div>
        )}
        <Spacer height={16} />

        <p className='px-[50px] text-sub text-[rgba(0,0,0,0.8)]'>
          <span className='text-brand font-normal'>
            {isCourseType(data) ? data.writer.name : userName}
          </span>
          &nbsp;
          {isCourse ? '님의 코스 제안이에요.' : '님이 선택한 장소들이에요.'}
        </p>

        <Spacer height={10} />
        <PlaceCollapse
          places={data?.places || []}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <p className='px-[50px] text-sub'>
            <span className='text-brand font-normal'>
              {isCourseType(data) ? data.writer.name : userName}
            </span>
            &nbsp;님의 {typeName} 설명이에요.
          </p>
          <span className='text-middle mx-[30px] px-[14px] py-[10px] bg-bright-gray rounded-[10px]'>
            {data?.contents || ''}
          </span>
        </section>

        <Divider margin={16} />

        <section className='w-full flex flex-col gap-[10px] text-[rgba(0,0,0,0.8)]'>
          <p className='px-[50px] text-sub'>
            <span className='text-brand font-normal'>
              {isCourseType(data) ? data.writer.name : userName}
            </span>
            &nbsp;님이 {visit} 날짜에요.
          </p>
          <span className='text-middle flex items-center justify-center mx-[30px] px-[14px] py-[10px] bg-bright-gray rounded-full opacity-80'>
            {data?.visit_date || ''}
          </span>
        </section>
        <Spacer height={16} />
      </div>

      {children}

      <Spacer height={25} />
      {!isCourse && (
        <button
          className='group w-full max-w-[375px] h-[54px] text-gray-600 font-bold text-main flex items-center justify-center bg-light-gray gap-[10px] hover:bg-brand hover:text-white transition-all duration-200 fixed bottom-60'
          onClick={() => setIsModalOpen(true)}
        >
          <Share2
            size={24}
            strokeWidth={1.5}
            className='fill-gray-600 group-hover:fill-white transition-colors duration-200'
          />
          공유하기
        </button>
      )}

      <ShareModal
        type='plan'
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        data={data}
      />
    </>
  )
}
