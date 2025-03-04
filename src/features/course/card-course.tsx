import Link from 'next/link'
import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import { CourseType } from '@/src/entities/course/type'

export default function CardCourse({ course }: { course: CourseType }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className='w-full h-[100px] flex items-center rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)] hover:border-brand border-[1px] transition-all'
    >
      <div className='ml-[10px] w-[138px] h-fit flex flex-col'>
        <span className='text-sub text-black opacity-50'>
          {course.visit_date}
        </span>
        <span className='text-sub text-black font-semibold'>
          {course.primary_region} / {course.secondary_region}
        </span>
        <p className='text-main text-black font-bold break-keep mt-[4px]'>
          {course.title}
        </p>
      </div>
      <div className='h-full overflow-x-auto flex-1 items-center justify-end gap-[9px] scrollbar-hide pr-[10px]'>
        <div className='w-fit h-full flex items-center gap-[9px]'>
          {course.places.map((place, index) => (
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
