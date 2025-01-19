'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { message } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import Header from '@/src/widgets/header'
import { CoursePlaceType } from '@/src/entities/place/type'
import type { CoursePayloadType } from '@/src/entities/course/type'
import { useUpdateCourse } from '@/src/entities/course/query'
import type { CourseType } from '@/src/entities/course/type'
import FormSections from '@/src/features/course/form-course'
import { useForm } from 'react-hook-form'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
} as const

type LayoutType = keyof typeof LAYOUT_TYPE

interface UpdateCourseProps {
  id: string
  data: CourseType
  type: LayoutType
}

export default function UpdateCourse({ id, data, type }: UpdateCourseProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<CoursePlaceType[]>(data.places)
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false)

  const place_ids = data.places.map((place) => place.id.toString())

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<CoursePayloadType>({
    defaultValues: {
      title: data.title,
      primary_region: data.primary_region,
      secondary_region: data.secondary_region,
      categories: data.categories,
      contents: data.contents,
      place_ids: place_ids,
      visit_date: data.visit_date,
    },
  })

  const { mutate } = useUpdateCourse(id)

  const pageType = type === LAYOUT_TYPE.course ? '코스' : '플랜'

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
      mutate(
        { id, data },
        {
          onSuccess: () => {
            router.replace(`/courses/${id}`)
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
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
      <Header title={data.title} isBack isBlue />
      <Spacer height={25} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSections
          pageType={pageType}
          register={register}
          places={places}
          setPlaces={setPlaces}
          handleClickSearchPlace={handleClickSearchPlace}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
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
