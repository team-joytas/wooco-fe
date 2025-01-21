import Spacer from '@/src/shared/ui/Spacer'
import PlaceCollapse from '@/src/shared/ui/PlaceCollapse'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import type { CourseType } from '@/src/entities/course/type'
import { CATEGORY } from '@/src/entities/category/type'
import { OptionHeader } from '@/src/widgets/header'
import useUserStore from '@/src/shared/store/userStore'
import { PlanType } from '@/src/entities/plan/type'
import { PenLine, Share2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { message } from 'antd'
import { FloatingMenuButton } from '@/src/widgets/floating-write-btn'
import Link from 'next/link'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN
type DataType = CourseType | PlanType

interface CoursePlanLayoutProps {
  type: CoursePlanType
  id: string
  children?: React.ReactNode
  data: CourseType | PlanType
}

export default function CoursePlanLayout({
  type,
  id,
  children,
  data,
}: CoursePlanLayoutProps) {
  const userId = useUserStore((state) => state.user?.user_id)
  const userName = useUserStore((state) => state.user?.name)
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'
  const router = useRouter()

  const { isCourseType, isMine } = useMemo(() => {
    const isCourseType = (data: DataType): data is CourseType => {
      return 'writer' in data && 'is_liked' in data
    }
    const isMine = isCourseType(data) ? userId === data.writer.id : true

    return { isCourseType, isMine }
  }, [data, userId])

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

  const renderFloatingButtons = () =>
    isClicked && (
      <div className='flex flex-col gap-[5px] absolute bottom-[120px]'>
        <FloatingMenuButton onClick={copyToClipboard} text='링크 복사' />
        <FloatingMenuButton
          onClick={() => handleClick('/courses/new')}
          text='코스 작성'
        />
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
      <div className='w-full px-[20px] flex flex-col'>
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
        {data?.places && data?.places.length > 0 && (
          <KakaoMap places={data?.places || []} id={Number(id)} />
        )}
        <Spacer height={16} />
        <p className='px-[20px]'>
          <span className='text-sub text-brand font-semibold'>
            {isCourseType(data) ? data.writer.name : userName}
          </span>
          &nbsp;님의 {typeName} 제안이에요.
        </p>
        <PlaceCollapse places={data?.places || []} />
        <Spacer height={16} />
        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />
        <section className='w-full flex flex-col gap-[10px]'>
          <p className='px-[20px]'>
            <span className='text-sub text-brand font-semibold'>
              {isCourseType(data) ? data.writer.name : userName}
            </span>
            &nbsp;님의 {typeName} 설명이에요.
          </p>
          <span className='text-middle px-[14px] py-[10px] bg-bright-gray rounded-[10px]'>
            {data?.contents || ''}
          </span>
        </section>
        <Spacer height={16} />
        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />
        <section className='w-full flex flex-col gap-[10px]'>
          <p className='px-[20px]'>
            <span className='text-sub text-brand font-semibold'>
              {isCourseType(data) ? data.writer.name : userName}
            </span>
            &nbsp;님이 {visit} 날짜에요.
          </p>
          <span className='text-middle flex items-center justify-center px-[14px] py-[10px] bg-bright-gray rounded-[10px] opacity-80'>
            {data?.visit_date || ''}
          </span>
        </section>
        <Spacer height={16} />
      </div>
      {children}
      <Spacer height={25} />

      <div className='w-full h-[54px] flex flex-row gap-[2px] text-brand font-bold text-main'>
        <button
          className='w-[187px] h-full flex items-center justify-center bg-light-gray   cursor-pointer gap-[10px] hover:bg-brand hover:text-white transition-all duration-200'
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
        <Link
          className='w-[187px] h-full flex items-center justify-center bg-light-gray gap-[10px] cursor-pointer hover:bg-brand hover:text-white transition-all duration-200'
          href={`/${type}s/${id}/update`}
        >
          <PenLine size={24} strokeWidth={1.5} />
          수정하기
        </Link>
      </div>

      {isClicked && renderFloatingButtons()}
      {contextHolder}
    </>
  )
}
