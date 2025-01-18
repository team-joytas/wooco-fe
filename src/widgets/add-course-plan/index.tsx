'use client'

import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { message } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import DragPlace from '@/src/widgets/drag-place'
import Header from '@/src/widgets/header'
import { CoursePlaceType } from '@/src/entities/place/type'
import type { CoursePayloadType } from '@/src/entities/course/type'
import { postCourse } from '@/src/entities/course/api'
import {
  useForm,
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
} from 'react-hook-form'
import {
  FormTitle,
  FormContents,
  FormDate,
  FormCategories,
  FormRegion,
} from '@/src/features/course/form-course'

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
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false)

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
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
          places={places}
          setPlaces={setPlaces}
          handleClickSearchPlace={handleClickSearchPlace}
          setValue={setValue}
          errors={errors}
          handleEditPlace={handleEditPlace}
          isButtonClick={isButtonClick}
        />
        <button
          type='submit'
          onClick={() => setIsButtonClick(true)}
          className={`w-full text-[12px] h-[54px] flex items-center justify-center bg-blue-100 text-white ${
            isSubmitting ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
          }`}
          disabled={isSubmitting}
        >
          완료
        </button>
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
  places,
  setPlaces,
  handleClickSearchPlace,
  setValue,
  errors,
  handleEditPlace,
  isButtonClick,
}: {
  pageType: string
  register: UseFormRegister<CoursePayloadType>
  places: CoursePlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
  handleClickSearchPlace: () => void
  setValue: UseFormSetValue<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
  handleEditPlace: (id: number) => void
  isButtonClick: boolean
}) {
  return (
    <>
      <Section title={`${pageType} 제목을 만들어주세요.`} padding>
        <FormTitle register={register} errors={errors} />
      </Section>
      <Divider />
      <Section title={`${pageType} 지역을 선택하세요.`} padding>
        <FormRegion setValue={setValue} isButtonClick={isButtonClick} />
      </Section>
      <Divider />
      <Section title={`${pageType} 장소를 선택하세요.`}>
        <div
          className='px-[20px] w-full flex flex-col gap-[15px] padding'
          {...register('place_ids', {
            validate: (value) => value.length > 0 || '장소를 선택해주세요.',
          })}
        >
          {places.length > 0 && <KakaoMap places={places} id={1} />}
          <DragPlace
            places={places}
            setPlaces={setPlaces}
            onEdit={handleEditPlace}
          />
          <button
            type='button'
            onClick={handleClickSearchPlace}
            className='w-full h-[40px] text-[15px] cursor-pointer rounded-full flex items-center justify-center bg-container-light-blue'
          >
            <Plus size={20} strokeWidth={3} stroke='#ffffff' />
          </button>
          {isButtonClick && places.length === 0 && (
            <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
              장소를 선택해주세요.
            </span>
          )}
        </div>
      </Section>
      <Divider />
      <Section title={`${pageType} 설명을 적어주세요.`} padding>
        <FormContents register={register} errors={errors} />
      </Section>
      <Divider />
      <Section title='방문 날짜를 등록하세요.' padding>
        <FormDate
          register={register}
          setValue={setValue}
          isButtonClick={isButtonClick}
        />
      </Section>
      <Divider />
      <Section title='관련 태그를 눌러 주세요.' padding>
        <FormCategories setValue={setValue} isButtonClick={isButtonClick} />
      </Section>
      <Spacer height={25} />
    </>
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
