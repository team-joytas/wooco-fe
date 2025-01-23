'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { message } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import Header from '@/src/widgets/header'
import { CoursePlanPlaceType } from '@/src/entities/place/type'
import type { CoursePayloadType } from '@/src/entities/course/type'
import FormSections from '@/src/features/course/form-course'
import { useForm } from 'react-hook-form'
import { useCreateCourse } from '@/src/entities/course/query'
import { PlanPayloadType } from '@/src/entities/plan/type'
import { useCreatePlan } from '@/src/entities/plan/query'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
} as const

type LayoutType = keyof typeof LAYOUT_TYPE

interface CoursePlanFormLayoutProps {
  type: LayoutType
}

export default function CoursePlanFormLayout({
  type,
}: CoursePlanFormLayoutProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<CoursePlanPlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false)

  type PayloadType = LayoutType extends 'plan'
    ? PlanPayloadType
    : CoursePayloadType

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<PayloadType>({
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

  const { mutate: courseMutate } = useCreateCourse()
  const { mutate: planMutate } = useCreatePlan()

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

  const onSubmit = async (data: PayloadType) => {
    try {
      setValue(
        'place_ids',
        places.map((place) => place.id.toString())
      )

      if (getValues('categories').length === 0) {
        return
      }

      const mutateFunction =
        type === LAYOUT_TYPE.plan ? planMutate : courseMutate
      const routePrefix = type === LAYOUT_TYPE.plan ? 'plans' : 'courses'

      mutateFunction(data, {
        onSuccess: (result) => {
          router.push(`/${routePrefix}/${result.id}`)
        },
      })
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
      <Header title={headerTitle} isBack />
      <Spacer height={25} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSections
          pageType={pageType}
          register={register}
          places={places}
          setPlaces={setPlaces}
          getValues={getValues}
          handleClickSearchPlace={handleClickSearchPlace}
          setValue={setValue}
          errors={errors}
          isButtonClick={isButtonClick}
        />
        <button
          type='submit'
          onClick={() => setIsButtonClick(true)}
          className={`w-full text-[12px] h-[54px] flex items-center justify-center bg-light-gray text-brand hover:bg-brand hover:text-white transition-all duration-300 ${
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
