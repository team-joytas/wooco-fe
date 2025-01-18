'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { DatePicker, message } from 'antd'
import type { DatePickerProps } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import RegionCascader from '@/src/shared/ui/RegionCascader'
import DragPlace from '@/src/widgets/drag-place'
import Header from '@/src/widgets/header'
import { CoursePlaceType } from '@/src/entities/place/type'
import type { CoursePayloadType } from '@/src/entities/course/type'
import { postCourse } from '@/src/entities/course/api'
import { useForm, UseFormRegister } from 'react-hook-form'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
} as const

type LayoutType = keyof typeof LAYOUT_TYPE

interface AddCoursePlanProps {
  type: LayoutType
}

interface SectionProps {
  title: string
  children: React.ReactNode
  padding?: boolean
}

export default function AddCoursePlan({ type }: AddCoursePlanProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<CoursePlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  console.log(places)
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CoursePayloadType>({
    defaultValues: {
      title: '',
      primary_region: '',
      secondary_region: '',
      categories: [],
      contents: '',
      place_ids: [],
      visit_date: '',
    },
  })

  const pageType = type === LAYOUT_TYPE.course ? '코스' : '플랜'
  const headerTitle =
    type === LAYOUT_TYPE.course
      ? '나만의 코스 작성하기'
      : '좋아하는 장소로 채우는 나의 플랜'

  const toast = (type: 'success' | 'error', content: string) => {
    messageApi.open({
      type,
      content,
      duration: 1,
    })
  }

  useEffect(() => {
    setValue(
      'place_ids',
      places.map((place) => place.id.toString())
    )
  }, [places])

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    setValue('visit_date', dateString as string)
  }

  const onChangeRegion = (value: string[]) => {
    if (value) {
      setValue('primary_region', value[0] as string)
      setValue('secondary_region', value[1] as string)
    }
  }

  const onSubmit = async (data: CoursePayloadType) => {
    try {
      setValue(
        'place_ids',
        places.map((place) => place.id.toString())
      )
      const result = await postCourse(data)
      router.push(`/courses/${result.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeCategories = (categories: string[]) => {
    setValue('categories', categories)
  }

  const handleEditPlace = (id: number) => {
    console.log(id)
  }

  const handleClickSearchPlace = () => {
    const selectRegion = getValues('secondary_region')
    if (selectRegion) {
      setOpenSearchPlace(true)
    } else {
      toast('error', '지역을 선택해주세요.')
    }
  }

  const region = `${getValues('primary_region')} ${getValues(
    'secondary_region'
  )}`

  return (
    <div className='relative h-100% flex flex-col'>
      <Header title={headerTitle} isBack />
      <Spacer height={25} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSections
          pageType={pageType}
          register={register}
          onChangeRegion={onChangeRegion}
          onChangeDate={onChangeDate}
          places={places}
          setPlaces={setPlaces}
          setCategories={handleChangeCategories}
          handleClickSearchPlace={handleClickSearchPlace}
        />
        <SubmitButton disabled={places.length === 0} />
      </form>
      {openSearchPlace && (
        <SearchPlace
          region={region}
          setOpenSearchPlace={setOpenSearchPlace}
          setPlaces={setPlaces}
        />
      )}
      {contextHolder}
    </div>
  )
}

function FormSections({
  pageType,
  register,
  onChangeRegion,
  onChangeDate,
  places,
  setPlaces,
  handleClickSearchPlace,
  setCategories,
}: {
  pageType: string
  register: UseFormRegister<CoursePayloadType>
  onChangeRegion: (value: string[]) => void
  onChangeDate: DatePickerProps['onChange']
  places: CoursePlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
  handleClickSearchPlace: () => void
  setCategories: (categories: string[]) => void
}) {
  return (
    <>
      <Section title={`${pageType} 제목을 만들어주세요.`} padding>
        <input
          {...register('title')}
          maxLength={20}
          className='rounded-full focus:outline-container-light-blue focus:outline-[0.5px] text-middle h-[35px] border-0 bg-bright-gray px-[10px]'
        />
      </Section>
      <Divider />
      <Section title={`${pageType} 지역을 선택하세요.`} padding>
        <RegionCascader
          setRegion={onChangeRegion}
          placeholder='지역을 선택해주세요.'
        />
      </Section>
      <Divider />
      <PlacesSection
        pageType={pageType}
        places={places}
        setPlaces={setPlaces}
        onClickAdd={handleClickSearchPlace}
      />
      <Divider />
      <Section title={`${pageType} 설명을 적어주세요.`} padding>
        <textarea
          {...register('contents')}
          className='rounded-[10px] h-[150px] focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-bright-gray p-[10px] text-middle'
          maxLength={200}
        />
      </Section>
      <Divider />
      <Section title='방문 날짜를 등록하세요.' padding>
        <DatePicker
          {...register('visit_date')}
          onChange={onChangeDate}
          allowClear
          placeholder='날짜를 선택해주세요.'
        />
      </Section>
      <Divider />
      <Section title='관련 태그를 눌러 주세요.' padding>
        <SelectCategories setCategories={setCategories} />
      </Section>
      <Spacer height={25} />
    </>
  )
}

function PlacesSection({
  pageType,
  places,
  setPlaces,
  onClickAdd,
}: {
  pageType: string
  places: CoursePlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
  onClickAdd: () => void
}) {
  return (
    <Section title={`${pageType} 장소를 선택하세요.`}>
      <div className='px-[20px] w-full flex flex-col gap-[15px] padding'>
        {places.length > 0 && <KakaoMap places={places} id={1} />}
        <DragPlace places={places} setPlaces={setPlaces} onEdit={() => {}} />
        <button
          type='button'
          onClick={onClickAdd}
          className='w-full h-[40px] text-[15px] cursor-pointer rounded-full flex items-center justify-center bg-container-light-blue'
        >
          <Plus size={20} strokeWidth={3} stroke='#ffffff' />
        </button>
      </div>
    </Section>
  )
}

function Section({ title, children, padding }: SectionProps) {
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

function SubmitButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      type='submit'
      className={`w-full text-[12px] h-[54px] flex items-center justify-center bg-blue-100 text-white ${
        disabled ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
      }`}
      disabled={disabled}
    >
      완료
    </button>
  )
}
