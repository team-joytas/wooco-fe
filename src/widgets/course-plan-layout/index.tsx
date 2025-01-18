import Spacer from '@/src/shared/ui/Spacer'
import PlaceCollapse from '@/src/shared/ui/PlaceCollapse'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import type { CourseType } from '@/src/entities/course/type'
import { formatDateToYYYYMMDD } from '@/src/shared/utils/date'
import { CATEGORY } from '@/src/shared/entities/type'
import { OptionHeader } from '@/src/widgets/header'

const COURSE_PLAN = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type CoursePlanType = keyof typeof COURSE_PLAN

interface CoursePlanLayoutProps {
  type: CoursePlanType
  id: number
  children: React.ReactNode
  data: CourseType | null
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
      <OptionHeader
        title={data?.title || ''}
        type={type}
        id={id}
        showLike={true}
        isLiked={true}
        isMine={true}
      />
      <div className='w-full px-[20px] flex flex-col'>
        <div className='w-full items-center justify-center inline-flex gap-[5px] py-[8px]'>
          {data?.categories?.map((category, index) => {
            return (
              <span
                key={index}
                className='px-[10px] py-[5px] text-[12px] text-white border rounded-[15px] bg-container-light-blue'
              >
                {CATEGORY[category]}
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
          {/* TODO: visit_date로 변경 */}
          <span className='text-middle flex items-center justify-center px-[14px] py-[10px] bg-bright-gray rounded-[10px] opacity-80'>
            {formatDateToYYYYMMDD(data?.created_at || '')}
          </span>
        </section>
        <Spacer height={16} />
      </div>
      {children}
      <Spacer height={25} />
    </>
  )
}
