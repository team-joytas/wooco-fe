'use client'

import { Plus } from 'lucide-react'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import RegionCascader from '@/src/shared/ui/RegionCascader'
import DragPlace from '@/src/widgets/drag-place'
import { getMockCourse } from '@/src/entities/course/api'
import Header from '@/src/widgets/header'
import { PlaceType } from '@/src/entities/place/type'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type LayoutType = keyof typeof LAYOUT_TYPE

interface AddCoursePlanProps {
  type: LayoutType
}

export default function AddCoursePlan({ type }: AddCoursePlanProps) {
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)

  const pageType = type === LAYOUT_TYPE.course ? '코스' : '플랜'

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMockCourse(1)
      setPlaces(data.places)
    }
    fetchData()
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('날짜 선택')
  }

  const headerTitle =
    type === LAYOUT_TYPE.course
      ? '나만의 코스 작성하기'
      : '좋아하는 장소로 채우는 나의 플랜'

  return (
    <div className='relative h-100% flex flex-col'>
      <Header title={headerTitle} isBack />
      <Spacer height={25} />
      <Section title={`${pageType} 제목을 만들어주세요.`} padding>
        <Input
          allowClear
          maxLength={20}
          className='rounded-full h-[35px] border-0 bg-bright-gray'
        />
      </Section>
      <Divider />
      <Section title={`${pageType} 지역을 선택하세요.`} padding>
        <RegionCascader
          placeholder='지역을 선택해주세요.'
          setSelectedRegion={setSelectedRegion}
        />
      </Section>
      <Divider />
      <Section title={`${pageType} 장소를 선택하세요.`}>
        <div className='px-[20px] w-full flex flex-col gap-[15px] padding'>
          {/*{places.length > 0 && <KakaoMap places={places} id={1} />}*/}
          <DragPlace places={places} setPlaces={setPlaces} />
          <button
            onClick={() => setOpenSearchPlace(true)}
            className='w-full h-[40px] text-[15px] cursor-pointer rounded-full flex items-center justify-center bg-container-light-blue'
          >
            <Plus size={20} strokeWidth={3} stroke={'#ffffff'} />
          </button>
        </div>
        {openSearchPlace && (
          <SearchPlace
            setOpenSearchPlace={setOpenSearchPlace}
            setPlaces={setPlaces}
          />
        )}
      </Section>
      <Divider />
      <Section title={`${pageType} 설명을 적어주세요.`} padding>
        <Input.TextArea allowClear showCount autoSize maxLength={200} />
      </Section>
      <Divider />
      <Section title='방문 날짜를 등록하세요.' padding>
        <DatePicker
          onChange={onChange}
          allowClear
          placeholder='날짜를 선택해주세요.'
        />
      </Section>
      <Divider />
      <Section title='관련 태그를 눌러 주세요.' padding>
        <SelectCategories />
      </Section>
      <Spacer height={25} />
      <button
        className={`w-full text-[12px] h-[54px] flex items-center justify-center bg-blue-100 text-white ${
          places.length === 0 ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
        }`}
        disabled={places.length === 0}
      >
        완료
      </button>
    </div>
  )
}

function Section({
  title,
  children,
  padding,
}: {
  title: string
  children: React.ReactNode
  padding?: boolean
}) {
  return (
    <div
      className={`w-full flex flex-col gap-[15px] ${
        padding ? 'px-[20px]' : ''
      }`}
    >
      <span className={`text-main font-semibold ${padding ? '' : 'px-[20px]'}`}>
        {title}
      </span>
      {children}
    </div>
  )
}

function Divider() {
  return (
    <>
      <Spacer height={25} />
      <Spacer height={8} className='bg-bright-gray' />
      <Spacer height={25} />
    </>
  )
}
