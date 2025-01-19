import Spacer from '@/src/shared/ui/Spacer'
import PlaceCollapse from '@/src/shared/ui/PlaceCollapse'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import type { CourseType } from '@/src/entities/course/type'
import { CATEGORY } from '@/src/entities/category/type'
import { OptionHeader } from '@/src/widgets/header'
import useUserStore from '@/src/shared/store/userStore'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN

interface CoursePlanLayoutProps {
  type: CoursePlanType
  id: string
  children: React.ReactNode
  data: CourseType | null
}

export default function CoursePlanLayout({
  type,
  id,
  children,
  data,
}: CoursePlanLayoutProps) {
  const userId = useUserStore((state) => state.user?.user_id)
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'
  const isMine = userId === data?.writer.id

  return (
    <>
      <OptionHeader
        title={data?.title || ''}
        type={type}
        id={id}
        showLike={!isMine}
        isLiked={data?.is_liked || false}
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
            {data?.writer.name || ''}
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
              {data?.writer.name || ''}
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
              {data?.writer.name || ''}
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
    </>
  )
}
