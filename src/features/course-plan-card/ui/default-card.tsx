import Link from 'next/link'
import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import { CourseType } from '@/src/entities/course'
import { PlanType } from '@/src/entities/plan'

interface CoursePlanCardProps {
  data: CourseType | PlanType
}

export function CoursePlanCard({ data }: CoursePlanCardProps) {
  const to = 'course_id' in data ? `/courses/${data.id}` : `/plans/${data.id}`

  return (
    <Link
      href={to}
      className='w-full h-[100px] py-[11px] gap-[2px] flex items-center rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'
    >
      <div className='ml-[10px] h-full w-[138px] h-fit flex flex-col gap-[4px] leading-4'>
        <span className='text-sub text-black opacity-80 font-light'>
          {data.visit_date}
        </span>
        <span className='text-sub text-black font-normal'>
          {data.primary_region} / {data.secondary_region}
        </span>
        <p className='text-main text-black font-bold break-words line-clamp-2'>
          {data.title}
        </p>
      </div>
      <div className='h-full overflow-x-auto flex-1 items-center justify-end gap-[9px] scrollbar-hide pr-[10px]'>
        <div className='w-fit h-full flex items-center gap-[9px]'>
          {data.places.map((place, index) => (
            <ImageWithIndex
              key={place.id}
              src={place.thumbnail_url}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
