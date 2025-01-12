'use client'

import { ChevronLeft, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Spacer from '@components/(layout)/Spacer'
import { Place } from '@components/SearchPlace'
import SearchPlace from '@components/SearchPlace'
import SelectCategories from '@components/SelectCategories'
import { useEffect, useState } from 'react'
import { Input } from 'antd'
import SortableList from '@components/SortableList'
import getData from '@/app/schedules/getData'
import KakaoMap from '@components/KakaoMap'
import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import RegionCascader from '@components/RegionCascader'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
}

type LayoutType = keyof typeof LAYOUT_TYPE

export default function CoursePlanNewLayout({ type }: { type: LayoutType }) {
  const router = useRouter()
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)

  const pageType = type === LAYOUT_TYPE.course ? '코스' : '플랜'

  useEffect(() => {
    const data = getData()
    setPlaces(data.courses[0].places)
  }, [])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log('날짜 선택')
  }

  const onChangePlaces = (place: Place) => {
    setPlaces((prevPlaces) => [...prevPlaces, place])
  }

  const headerTitle =
    type === LAYOUT_TYPE.course
      ? '나만의 코스 작성하기'
      : '좋아하는 장소로 채우는 나의 플랜'

  return (
    <div className='relative h-100% flex flex-col'>
      <Header title={headerTitle} onBack={() => router.back()} />
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
          {places.length > 0 && <KakaoMap places={places} id={1} />}
          <SortableList places={places} setPlaces={setPlaces} />
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
            onChangePlaces={onChangePlaces}
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

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <header className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
      <button onClick={onBack}>
        <ChevronLeft size={24} color='black' strokeWidth={1.5} />
      </button>
      <p className='font-semibold text-[17px]'>{title}</p>
      <div className='w-[24px] h-[24px]'></div>
    </header>
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
