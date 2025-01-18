'use client'

import { useEffect, useState } from 'react'
import { Input } from 'antd'
import DragPlace from '@/src/widgets/drag-place'
import SearchPlace from '@/src/views/search-place'
import { categories } from '@/src/entities/category/type'
import Spacer from '@/src/shared/ui/Spacer'
import Header from '@/src/widgets/header'
import { PlaceType } from '@/src/entities/place/type'
import { useForm } from 'react-hook-form'

export default function AddCoursePlan() {
  const [clickedCategory, setClickedCategory] = useState<number[]>([])
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const handleCategoryClick = (id: number) => {
    setClickedCategory((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    )
  }

  const handleEdit = (id: number) => {
    console.log(id)
  }

  return (
    <>
      <Header title='나만의 코스 작성하기' isBack />
      <Spacer height={8} />
      <div className='px-[20px] w-full flex flex-col justify-between'>
        <div className='w-full flex flex-col items-end'>
          <div className='w-full flex flex-col gap-[5px]'>
            <span className='text-main font-semibold'>
              코스 제목을 만들어주세요
            </span>
            <Input
              allowClear
              maxLength={20}
              className='rounded-full h-[35px] border-0 bg-bright-gray'
            />
            <Spacer height={15} />
            <Spacer height={8} className='bg-bright-gray' />
          </div>
          <Spacer height={25} />
          <div className='w-full flex flex-col gap-[5px]'>
            <span className='text-main font-semibold'>
              코스 지역을 검색하세요.
            </span>
            <Input.TextArea allowClear showCount autoSize maxLength={200} />
          </div>
          <div className='w-full mt-[10px] flex flex-col'>
            <span className='text-[15px]'>코스 카테고리</span>
            <div className='mt-[5px] inline-flex flex-wrap gap-[5px]'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`text-[12px] py-[5px] px-[13px] border rounded-[10px] transition-all duration-200 cursor-pointer ${
                    clickedCategory.includes(category.id)
                      ? 'bg-blue-100 border-blue-100'
                      : 'border-gray-300'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.value}
                </button>
              ))}
            </div>
          </div>
          <div className='w-full mt-[20px] mb-[20px] h-[2px] bg-gray-100' />
          <div className='w-full flex flex-col gap-[10px]'>
            <span className='text-[15px]'>코스 내 장소 정보</span>
            <DragPlace
              places={places}
              setPlaces={setPlaces}
              onEdit={handleEdit}
            />
            <button
              onClick={() => setOpenSearchPlace(true)}
              className='w-full h-[40px] text-[15px] rounded-[5px] border border-blue-100 flex items-center justify-center'
            >
              +
            </button>
            {openSearchPlace && (
              <SearchPlace
                setOpenSearchPlace={setOpenSearchPlace}
                setPlaces={setPlaces}
              />
            )}
          </div>
        </div>
        <button
          className={`w-full rounded-[5px] mt-[40px] text-[12px] h-[40px] flex items-center justify-center bg-blue-100 text-white ${
            places.length === 0 ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
          }`}
          disabled={places.length === 0}
        >
          완료
        </button>
      </div>
    </>
  )
}
