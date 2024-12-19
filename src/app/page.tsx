'use client'

import { Carousel, Cascader, CascaderProps, GetProp } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import SectionDivider from './components/SectionDivider'
import { categories } from '@/types/Categories'
import getData from './getData'
import { useRouter } from 'next/navigation'

type DefaultOptionType = GetProp<CascaderProps, 'options'>[number]

export default function Page() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [selectedCatetories, setSelectedCategories] = useState<number[]>([])

  const onChange = (value: string[]) => {
    setSelectedRegion(value[1])
  }

  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some(
      (option) =>
        (option.label as string)
          .toLowerCase()
          .indexOf(inputValue.toLowerCase()) > -1
    )

  const handleTagClick = (category: number) => {
    if (selectedCatetories.includes(category)) {
      setSelectedCategories((prev) => prev.filter((tag) => tag !== category))
    } else {
      setSelectedCategories((prev) => [...prev, category])
    }
  }

  const handleSearch = () => {
    router.push('/courses')
  }

  return (
    <div className='flex items-center flex-col'>
      <div className='flex flex-col w-full mt-[20px] px-[10px] gap-[10px]'>
        <span className='text-2xl'>어디로 가볼까요?</span>
        <Cascader
          options={getData()}
          placeholder='지역을 선택해 주세요'
          onChange={onChange}
          size='large'
          showSearch={{ filter }}
          style={{ width: '100%' }}
        />
        <span className='text-[10px] text-gray-400'>
          * 원하는 태그를 눌러보세요. 딱 맞는 코스만 골라 드릴게요!
        </span>
        <div className='flex flex-wrap gap-[8px]'>
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleTagClick(category.id)}
              className={`text-[12px] py-[5px] px-[13px] border rounded-[10px] transition-all duration-200 cursor-pointer ${
                selectedCatetories.includes(category.id)
                  ? 'bg-blue-100 border-blue-100'
                  : 'border-gray-300'
              }`}
            >
              <span>{category.value}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleSearch}
          className='w-full h-[30px] mt-[10px] border border-[#364d79]-200 text-[#364d79] text-[12px] rounded-md'
        >
          코스 보러가기
        </button>
      </div>

      <SectionDivider />

      <div className='w-full h-[185px] my-[20px] bg-[#364d79]'>
        <Carousel autoplay>
          <div className='leading-[185px] text-center text-white'>
            <span>서비스 소개</span>
          </div>
          <div className='leading-[185px] text-center text-white'>
            <span>서비스 소개2</span>
          </div>
        </Carousel>
      </div>

      <div className='flex flex-col text-[10px] w-full mt-[20px] px-[10px] gap-[2px] text-gray-300'>
        <span>(주) 우코</span>
        <span>대표이사 김지홍 | 사업자등록번호 000-00-00000 </span>
        <span>통신판매업신고번호: 제 0000-0000호 </span>
        <span>대표전화: 000-0000-0000 </span>
        <span>서울특별시 어쩌구</span>

        <div className='flex flex-row gap-[5px] text-gray-600 mt-[5px]'>
          <Link href='/terms'>서비스 이용약관</Link>
          <span> | </span>
          <Link href='/privacy'>개인정보 처리방침</Link>
        </div>
      </div>
    </div>
  )
}
