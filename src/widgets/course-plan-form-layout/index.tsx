'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect, useMemo } from 'react'
import { message } from 'antd'
import Spacer from '@/src/shared/ui/Spacer'
import SearchPlace from '@/src/views/search-place'
import Header from '@/src/widgets/header'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import type { CoursePayloadType } from '@/src/entities/course'
import {
  PLAN_QUERY_KEY,
  usePostPlan,
  useGetPlan,
  useUpdatePlan,
} from '@/src/entities/plan'
import FormSections from '@/src/features/course/form-course'
import { useForm } from 'react-hook-form'
import {
  COURSE_QUERY_KEY,
  useGetCourse,
  usePostCourse,
  useUpdateCourse,
} from '@/src/entities/course'
import { PlanPayloadType } from '@/src/entities/plan'
import { useQueryClient } from '@tanstack/react-query'

const LAYOUT_TYPE = {
  course: 'course' as const,
  plan: 'plan' as const,
}

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
  const queryClient = useQueryClient()
  const [places, setPlaces] = useState<CoursePlanPlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
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

  const { data: courseData } = useGetCourse(id || '')
  const { data: planData } = useGetPlan(id || '')
  const fetchData = useMemo(() => {
    return type === LAYOUT_TYPE.course
      ? courseData
      : type === LAYOUT_TYPE.plan
      ? planData
      : null
  }, [type, courseData, planData])

  useEffect(() => {
    if (level !== LEVEL_TYPE.update || isDataLoaded || !fetchData) return

    const {
      title,
      primary_region,
      secondary_region,
      contents,
      visit_date,
      places,
    } = fetchData

    setValue('title', title)
    setValue('primary_region', primary_region)
    setValue('secondary_region', secondary_region)
    setValue('contents', contents)
    setValue('visit_date', visit_date)
    setPlaces(places || [])
    setIsDataLoaded(true)

    if (type === LAYOUT_TYPE.course && 'categories' in fetchData) {
      setValue('categories', fetchData.categories as string[])
    }
  }, [level, type, fetchData, isDataLoaded])

  const isCourseSessionStored =
    typeof window !== 'undefined' ? !!sessionStorage.getItem('course') : false

  useEffect(() => {
    let storedData: string | null = null

    if (
      level === LEVEL_TYPE.add &&
      type === LAYOUT_TYPE.course &&
      typeof window !== 'undefined' &&
      !isDataLoaded
    ) {
      storedData = sessionStorage.getItem('course')
    } else if (
      level === LEVEL_TYPE.add &&
      type === LAYOUT_TYPE.plan &&
      typeof window !== 'undefined' &&
      !isDataLoaded
    ) {
      storedData = sessionStorage.getItem('plan')
    }
    console.log(storedData)

    if (storedData) {
      const sharedData = JSON.parse(storedData)
      setValue('primary_region', sharedData.primary_region)
      setValue('secondary_region', sharedData.secondary_region)
      setValue('visit_date', sharedData.visit_date)
      setPlaces(sharedData.places || [])
      setIsDataLoaded(true)
    }

    return () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('course')
        sessionStorage.removeItem('plan')
      }
    }
  }, [level, type, isDataLoaded])

  const { mutate: courseMutate } = usePostCourse()
  const { mutate: planMutate } = usePostPlan()
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

      if (type === LAYOUT_TYPE.course && getValues('categories').length === 0) {
        return
      }

      const mutateFunction = mutateMap[type][level]
      const routePrefix = type === LAYOUT_TYPE.plan ? 'plans' : 'courses'

      mutateFunction(data, {
        onSuccess: (result) => {
          const redirectPath =
            level === LEVEL_TYPE.add
              ? `/${routePrefix}/${result.id}`
              : `/${routePrefix}/${id}`
          router.push(redirectPath)
          queryClient.refetchQueries({
            queryKey: LAYOUT_TYPE.course
              ? COURSE_QUERY_KEY.post
              : PLAN_QUERY_KEY.all,
          })
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

  const shouldRenderForm = (() => {
    if (level === LEVEL_TYPE.update) {
      return isDataLoaded
    }

    if (level === LEVEL_TYPE.add) {
      if (type === LAYOUT_TYPE.plan) {
        return true
      }

      if (type === LAYOUT_TYPE.course) {
        return !isCourseSessionStored || (isCourseSessionStored && isDataLoaded)
      }
    }

    return false
  })()

  return (
    <div className='relative h-100% flex flex-col'>
      <Header title={headerTitle} isBack />
      <Spacer height={25} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {shouldRenderForm && (
          <FormSections
            pageType={pageType}
            register={register}
            places={places}
            setPlaces={setPlaces}
            getValues={getValues}
            handleClickSearchPlace={handleClickSearchPlace}
            setValue={setValue}
            errors={errors}
            isSubmitted={isSubmitted}
          />
        )}
        <button
          type='submit'
          onClick={() => setIsSubmitted(true)}
          className={`w-full h-[54px] flex items-center justify-center bg-light-gray text-brand text-main font-bold hover:bg-brand hover:text-white transition-all duration-300 ${
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
