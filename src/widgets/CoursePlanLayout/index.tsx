import Spacer from '@/src/shared/ui/Spacer'
import PlaceCollapse from '@/src/shared/ui/PlaceCollapse'
import { EllipsisVertical, ChevronLeft } from 'lucide-react'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import { CourseType } from '@/src/entities/course/type'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN

interface CoursePlanLayoutProps {
  type: CoursePlanType
  id: number
  children: React.ReactNode
  data: CourseType
}

export default function CoursePlanLayout({
  type,
  id,
  children,
  data,
}: CoursePlanLayoutProps) {
  const typeName = type === COURSE_PLAN.course ? '코스' : '플랜'
  const visit = type === COURSE_PLAN.course ? '방문한' : '방문할'

  return (
    <>
      <div className='w-full px-[20px] flex flex-col'>
        <Spacer height={14} />
        <section className='justify-between items-center flex'>
          <ChevronLeft size={24} strokeWidth={1.5} />
          <p className='border-b font-semibold text-[13px] text-white px-[20px] py-[8px] rounded-[20px] bg-container-blue'>
            {data.name}
          </p>
          <EllipsisVertical size={24} strokeWidth={1.5} />
        </section>
        <Spacer height={14} />
        <section className='w-full items-center justify-center inline-flex gap-[5px]'>
          {data.categories.map((category, index) => {
            return (
              <span
                key={index}
                className='px-[10px] py-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
              >
                {category}
              </span>
            )
          })}
        </section>
        <KakaoMap places={data.places} id={Number(id)} />
        <Spacer height={16} />
        <p className='px-[20px]'>
          <span className='text-sub text-brand font-semibold'>
            {data.user.name}
          </span>
          &nbsp;님의 {typeName} 제안이에요.
        </p>
        <PlaceCollapse />
        <Spacer height={16} />
        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />
        <section className='w-full flex flex-col gap-[10px]'>
          <p className='px-[20px]'>
            <span className='text-sub text-brand font-semibold'>
              {data.user.name}
            </span>
            &nbsp;님의 {typeName} 설명이에요.
          </p>
          <span className='text-middle px-[14px] py-[10px] bg-bright-gray rounded-[10px]'>
            {data.content}
          </span>
        </section>
        <Spacer height={16} />
        <Spacer height={8} className='bg-bright-gray' />
        <Spacer height={16} />
        <section className='w-full flex flex-col gap-[10px]'>
          <p className='px-[20px]'>
            <span className='text-sub text-brand font-semibold'>
              {data.user.name}
            </span>
            &nbsp;님이 {visit} 날짜에요.
          </p>
          <span className='text-middle flex items-center justify-center px-[14px] py-[10px] bg-bright-gray rounded-[10px] opacity-80'>
            {data.created_at}
          </span>
        </section>
        <Spacer height={16} />
      </div>
      {children}
      <Spacer height={25} />
    </>
  )
}
