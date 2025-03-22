'use client'

import Spacer from '@/src/shared/ui/Spacer'
import PlaceCollapse from '@/src/shared/ui/PlaceCollapse'
import ActiveKakaoMap from '@/src/shared/ui/KakaoMap'
import type { CourseType } from '@/src/entities/course'
import { CATEGORY } from '@/src/entities/course'
import { OptionHeader } from '@/src/widgets/header'
import useUserStore from '@/src/shared/store/userStore'
import { PlanType } from '@/src/entities/plan/type'
import { Share2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { message } from 'antd'
import { FloatingMenuButton } from '@/src/widgets/floating-write-btn'

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

export default function CoursePlanDetailLayout({
  type,
  id,
  children,
  data,
}: CoursePlanDetailLayoutProps) {
  const userId = useUserStore((state) => state.user?.user_id)
  const userName = useUserStore((state) => state.user?.name)
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'
  const router = useRouter()

  const isCourseType = (data: CourseType | PlanType) =>
    'writer' in data && 'is_liked' in data

  const isCourse = useMemo(() => isCourseType(data), [data])
  const isMine = useMemo(
    () => (isCourse ? userId === (data as CourseType).writer.id : true),
    [isCourse, userId, data]
  )

  const [isClicked, setIsClicked] = useState(false)
  const handleClick = (path: string) => {
    setIsClicked(!isClicked)
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    router.push(path)
  }

  const [messageApi, contextHolder] = message.useMessage()
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      messageApi.success({
        content: '링크가 클립보드에 복사되었습니다.',
        duration: 1,
      })
    })
    setIsClicked(!isClicked)
  }

  const handleClickShareCourse = () => {
    setIsClicked(!isClicked)

    const { primary_region, secondary_region, places, visit_date } = data
    const filteredData = {
      primary_region,
      secondary_region,
      places,
      visit_date,
    }

    sessionStorage.setItem('course', JSON.stringify(filteredData))
    handleClick('/courses/new')
  }

  const renderFloatingButtons = () =>
    isClicked && (
      <div className='flex flex-col gap-[5px] absolute bottom-[120px]'>
        <FloatingMenuButton onClick={copyToClipboard} text='링크 복사' />
        <FloatingMenuButton onClick={handleClickShareCourse} text='코스 작성' />
      </div>
    )

  return (
    <>
      <OptionHeader
        title={data?.title || ''}
        type={type}
        id={id}
        showLike={!isMine}
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
            <ActiveKakaoMap places={data?.places || []} />
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
        <PlaceCollapse places={data?.places || []} />
        <Spacer height={16} />

        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />
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

        <Spacer height={16} />
        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />

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
          className='w-full max-w-[375px] h-[54px] text-brand font-bold text-main flex items-center justify-center bg-light-gray cursor-pointer gap-[10px] hover:bg-brand hover:text-white transition-all duration-200 fixed bottom-60'
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? (
            <>
              <X size={24} strokeWidth={1.5} />
              닫기
            </>
          ) : (
            <>
              <Share2 size={24} strokeWidth={1.5} />
              공유하기
            </>
          )}
        </button>
      )}
      {isClicked && renderFloatingButtons()}
      {contextHolder}
    </>
  )
}
