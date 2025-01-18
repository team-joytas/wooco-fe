import Spacer from '@/src/shared/ui/Spacer'
import { useState, useEffect } from 'react'
import { ChevronLeft, Search } from 'lucide-react'
import CardCourse from '@/src/features/course/card-course'
import type { CourseType } from '@/src/entities/course/type'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import { getCourses } from '@/src/entities/course/api'

// TODO: 실제 데이터 및 로직 구현 필요
export default function SearchCourse({
  isSearch,
  setIsSearch,
}: {
  isSearch: boolean
  setIsSearch: (isSearch: boolean) => void
}) {
  const [clickedCategory, setClickedCategory] = useState<string[]>([])
  const [courses, setCourses] = useState<CourseType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const courses = await getCourses()
      setCourses(courses)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (isSearch) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSearch])

  const handleCategoryClick = (categories: string[]) => {
    console.log(categories)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <ChevronLeft
          onClick={() => setIsSearch(false)}
          size={30}
          strokeWidth={1.5}
          className='cursor-pointer'
        />
        <div
          className={
            isSearch
              ? 'flex ml-[10px] w-full gap-[10px] bg-light-gray rounded-full px-[14px] py-[10px] items-center'
              : 'hidden'
          }
        >
          <Search size={15} strokeWidth={1.5} />
          <input
            type='text'
            className='bg-transparent flex h-full w-full focus:outline-none text-sub placeholder:text-sub placeholder:font-light'
            placeholder='궁금한 지역 검색해보세요! 딱 맞는 코스만 골라드릴게요'
          />
        </div>
      </div>
      <div className='w-[375px] h-[calc(100vh-55px)] overflow-y-auto bg-white fixed z-[999] top-[55px]'>
        <Spacer height={12} />
        <div className='flex flex-col items-center'>
          <p className='text-[12px] text-black opacity-50'>
            원하는 태그를 눌러주세요. 더 자세히 알려드려요
          </p>
          <Spacer height={14} />
          <div className='mt-[5px] justify-center inline-flex max-w-[306px] flex-wrap gap-[9px]'>
            <SelectCategories setCategories={handleCategoryClick} />
          </div>
          <Spacer height={14} />
          <Spacer height={8} className='bg-light-gray' />
          <Spacer height={22} />
          <div className='w-full px-[20px] flex flex-col gap-[15px]'>
            {courses.map((course) => (
              <CardCourse key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
