import Link from 'next/link'
import ImageWithIndex from '@/src/shared/ui/ImageWithIndex'
import { CourseType } from '@/src/entities/course/type'

// TODO: 실제 데이터로 변경
export default function CardCourse({ course }: { course: CourseType }) {
  return (
    <Link
      href={'/courses/1'}
      className='w-full h-[100px] flex items-center rounded-[10px] bg-white drop-shadow-[0_0_4px_rgba(0,0,0,0.15)]'
    >
      <div className='ml-[10px] w-[138px] h-fit flex flex-col'>
        <span className='text-sub text-black opacity-50'>2024-12-24</span>
        <span className='text-sub text-black font-semibold'>서울 / 강남</span>
        <p className='text-main text-black font-bold break-keep mt-[4px]'>
          먹고 구경하고 먹고 강남 한바퀴!
        </p>
      </div>
      <div className='flex-1  h-full overflow-x-auto flex items-center gap-[9px] scrollbar-hide pr-[10px]'>
        <div className='w-fit h-[58px] flex gap-[9px]'>
          {course.places.map((place, index) => (
            <ImageWithIndex
              key={place.id}
              src={place.thumbnail_url || ''}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
