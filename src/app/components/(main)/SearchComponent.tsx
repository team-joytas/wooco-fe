import search from '@images/search.png'
import left from '@images/left.png'
import Image from 'next/image'
import Spacer from '../(layout)/Spacer'
import { categories } from '@/types/Categories'
import { useState, useEffect } from 'react'
import NewCourseItem from './NewCourseItem'
import LayoutSpacer from '../(layout)/LayoutSpacer'

// TODO: 실제 데이터 및 로직 구현 필요
export default function SearchComponent({
  isSearch,
  setIsSearch,
}: {
  isSearch: boolean
  setIsSearch: (isSearch: boolean) => void
}) {
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

  const [clickedCategory, setClickedCategory] = useState<number[]>([])
  const handleCategoryClick = (id: number) => {
    setClickedCategory((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center'>
        <button onClick={() => setIsSearch(false)}>
          <Image alt='close' src={left} className='w-[30px] ml-[5px] h-auto' />
        </button>
        <div
          className={
            isSearch
              ? 'flex ml-[10px] w-full gap-[10px] bg-light-gray rounded-full px-[14px] py-[10px] items-center'
              : 'hidden'
          }
        >
          <Image alt='search' src={search} className='w-[15px] h-auto' />
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
            {categories.map((category) => (
              <button
                key={category.id}
                className={`text-[13px] h-[28px] px-[15px] border border-container-blue rounded-full transition-all duration-200 cursor-pointer ${
                  clickedCategory.includes(category.id)
                    ? 'bg-container-blue text-white'
                    : 'border-container-blue text-search-gray'
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.value}
              </button>
            ))}
          </div>
          <Spacer height={14} />
          <Spacer height={8} className='bg-light-gray' />
          <Spacer height={22} />
          <div className='w-full px-[20px] flex flex-col gap-[15px]'>
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
            <NewCourseItem />
          </div>
          <LayoutSpacer />
        </div>
      </div>
    </div>
  )
}
