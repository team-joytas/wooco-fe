'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { message } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import Header from '@/src/widgets/header'
import { CoursePlanPlaceType } from '@/src/entities/place/type'
import type { CoursePayloadType } from '@/src/entities/course/type'
import FormSections from '@/src/features/course/form-course'
import { useForm } from 'react-hook-form'
import {
  useCreateCourse,
  useGetCourse,
  useUpdateCourse,
} from '@/src/entities/course/query'
import {
  useCreatePlan,
  useGetPlan,
  useUpdatePlan,
} from '@/src/entities/plan/query'
import { PlanPayloadType } from '@/src/entities/plan/type'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
} as const

const LEVEL_TYPE = {
  add: 'add' as const,
  update: 'update' as const,
}

type LayoutType = keyof typeof LAYOUT_TYPE
type LevelType = keyof typeof LEVEL_TYPE

interface InputFormData {
  title: string
  primary_region: string
  secondary_region: string
  categories: string[]
  contents: string
  place_ids: string[]
  visit_date: string
}

interface CoursePlanFormLayoutProps {
  type: LayoutType
  level: LevelType
  id?: string
}

export default function CoursePlanFormLayout({
  type,
  level,
  id,
}: CoursePlanFormLayoutProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<CoursePlanPlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [isButtonClick, setIsButtonClick] = useState<boolean>(false)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  type PayloadType = LayoutType extends 'plan'
    ? PlanPayloadType
    : CoursePayloadType

  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<InputFormData>({
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

  const courseData = id && type === LAYOUT_TYPE.course ? useGetCourse(id) : null
  const planData = id && type === LAYOUT_TYPE.plan ? useGetPlan(id) : null

  useEffect(() => {
    if (level === LEVEL_TYPE.update) {
      const data =
        type === LAYOUT_TYPE.course ? courseData?.data : planData?.data

      if (data) {
        setValue('title', data.title)
        setValue('primary_region', data.primary_region)
        setValue('secondary_region', data.secondary_region)
        setValue('categories', data.categories)
        setValue('contents', data.contents)
        setValue('visit_date', data.visit_date)

        setPlaces(data.places || [])
        setIsDataLoaded(true)
      }
    }
  }, [level, type, courseData?.data, planData?.data])

  const { mutate: courseMutate } = useCreateCourse()
  const { mutate: planMutate } = useCreatePlan()
  const { mutate: courseUpdateMutate } = useUpdateCourse(id || '')
  const { mutate: planUpdateMutate } = useUpdatePlan(id || '')
  const mutateMap = {
    [LAYOUT_TYPE.plan]: {
      [LEVEL_TYPE.add]: planMutate,
      [LEVEL_TYPE.update]: planUpdateMutate,
    },
    [LAYOUT_TYPE.course]: {
      [LEVEL_TYPE.add]: courseMutate,
      [LEVEL_TYPE.update]: courseUpdateMutate,
    },
  }

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

      const mutateFunction = mutateMap[type][level]
      const routePrefix = type === LAYOUT_TYPE.plan ? 'plans' : 'courses'

      mutateFunction(data, {
        onSuccess: (result) => {
          level === LEVEL_TYPE.add
            ? router.push(`/${routePrefix}/${result.id}`)
            : router.push(`/${routePrefix}/${id}`)
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
        {(level === LEVEL_TYPE.update && isDataLoaded) ||
        level === LEVEL_TYPE.add ? (
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
        ) : null}

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
