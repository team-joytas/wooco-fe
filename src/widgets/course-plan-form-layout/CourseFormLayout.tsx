'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Spacer } from '@/src/shared/ui'
import { ActionHeader, SearchPlace } from '@/src/widgets'
import type { CoursePlaceType } from '@/src/entities/place'
import type { CourseInputType, CoursePayloadType } from '@/src/entities/course'
import { CourseFormByStep } from '@/src/features'
import {
  COURSE_QUERY_KEY,
  useCourse,
  useCreateCourse,
  useUpdateCourse,
} from '@/src/entities/course'
import { useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/src/shared/providers'
import useUserStore from '@/src/shared/store/userStore'
import useRegionStore from '@/src/shared/store/regionStore'
import { ProgressBar } from '@/src/features/course-form/ProgressBar'

const LEVEL_TYPE = {
  add: 'add' as const,
  update: 'update' as const,
}

const STEP_INDEX = {
  first: 0,
  second: 1,
  preview: 2,
} as const

const STEPS = ['first', 'second', 'preview'] as const

type LevelType = keyof typeof LEVEL_TYPE

interface CourseFormLayoutProps {
  level: LevelType
  id?: string
}

export function CourseFormLayout({ level, id }: CourseFormLayoutProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { show } = useToast()
  const { setSelectedRegion } = useRegionStore()

  const [places, setPlaces] = useState<CoursePlaceType[]>([])
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)
  const [showValidationByStep, setShowValidationByStep] = useState<{
    first: boolean
    second: boolean
  }>({
    first: false,
    second: false,
  })
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<
    'first' | 'second' | 'preview'
  >('first')

  const methods = useForm<CourseInputType>({
    defaultValues: {
      title: '',
      primary_region: '',
      secondary_region: '',
      categories: [],
      contents: '',
      places: [],
      visit_date: '',
    },
  })
  const { getValues, handleSubmit, setValue } = methods

  const { data: courseData } = useCourse(id || '', !!id)

  useEffect(() => {
    if (level !== LEVEL_TYPE.update || isDataLoaded || !courseData) return

    const {
      title,
      primary_region,
      secondary_region,
      contents,
      visit_date,
      places,
      categories,
      writer,
    } = courseData

    const { user } = useUserStore.getState()
    if (writer && (!user || writer.id !== user?.user_id)) {
      router.push(`/courses/${id}`)
      show('warning', '수정 권한이 없습니다.')
      return
    }

    setValue('title', title)
    setValue('primary_region', primary_region)
    setValue('secondary_region', secondary_region)
    setValue('contents', contents)
    setValue('visit_date', visit_date)
    setValue('categories', categories as string[])
    setValue('places', places || [])
    setPlaces(places || [])
    setIsDataLoaded(true)
  }, [level, courseData, isDataLoaded])

  const isCourseSessionStored =
    typeof window !== 'undefined' ? !!sessionStorage.getItem('course') : false

  useEffect(() => {
    let storedData: string | null = null

    if (
      level === LEVEL_TYPE.add &&
      typeof window !== 'undefined' &&
      !isDataLoaded
    ) {
      storedData = sessionStorage.getItem('course')
    }

    if (storedData) {
      const sharedData = JSON.parse(storedData)
      setValue('title', sharedData.title)
      setValue('contents', sharedData.contents)
      setValue('primary_region', sharedData.primary_region)
      setValue('secondary_region', sharedData.secondary_region)
      setValue(
        'visit_date',
        sharedData?.visit_date ? sharedData.visit_date : ''
      )
      setValue('places', sharedData.places || [])
      setPlaces(sharedData.places || [])
      setIsDataLoaded(true)
    }

    return () => {
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('course')
      }
    }
  }, [level, isDataLoaded])

  const { mutate: courseMutate } = useCreateCourse()
  const { mutate: courseUpdateMutate } = useUpdateCourse(id || '')
  const mutateMap = {
    [LEVEL_TYPE.add]: courseMutate,
    [LEVEL_TYPE.update]: courseUpdateMutate,
  }

  const headerTitle = `나만의 코스 ${level === 'add' ? '작성' : '수정'}하기`

  useEffect(() => {
    setValue(
      'places',
      places.map((place) => place)
    )
  }, [places])

  useEffect(() => {
    return () => {
      setSelectedRegion([])
    }
  }, [])

  const onSubmit = async (data: CourseInputType) => {
    try {
      if (data.categories.length === 0) {
        return
      }

      // places에서 place_ids 추출
      const { places: _, ...restData } = data
      const payload: CoursePayloadType = {
        ...restData,
        place_ids: data.places.map((place) => place.id.toString()),
      }

      const mutateFunction = mutateMap[level]
      mutateFunction(payload, {
        onSuccess: (result) => {
          const redirectPath =
            level === LEVEL_TYPE.add
              ? `/courses/${result.id}`
              : `/courses/${id}`
          router.push(redirectPath)
          queryClient.refetchQueries({
            queryKey: COURSE_QUERY_KEY.post,
          })
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickSearchPlace = () => {
    const selectRegion = getValues('secondary_region')
    const placesLength = places.length
    if (placesLength >= 5) {
      show('notice', '장소는 최대 5개까지 선택할 수 있습니다.')
      return
    }

    if (selectRegion) {
      setOpenSearchPlace(true)
    } else {
      show('notice', '지역을 선택해주세요.')
    }
  }

  const region = `${getValues('primary_region')} ${getValues(
    'secondary_region'
  )}`

  const isFormReady = () => {
    if (level === LEVEL_TYPE.update) {
      return isDataLoaded
    }

    if (level === LEVEL_TYPE.add) {
      return !isCourseSessionStored || (isCourseSessionStored && isDataLoaded)
    }

    return false
  }

  const handleClickNextButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentStep === 'first') {
      e.preventDefault()
      if (
        getValues('visit_date').length === 0 ||
        getValues('primary_region').length === 0 ||
        getValues('places').length === 0
      ) {
        setShowValidationByStep({ ...showValidationByStep, first: true })
        return
      }
      setShowValidationByStep({ ...showValidationByStep, first: false })
      setCurrentStep(STEPS[STEP_INDEX[currentStep] + 1])
      return
    }

    if (currentStep === 'second') {
      e.preventDefault()
      if (
        getValues('title').length === 0 ||
        getValues('contents').length === 0 ||
        getValues('categories').length === 0
      ) {
        setShowValidationByStep({ ...showValidationByStep, second: true })
        return
      }
      setShowValidationByStep({ ...showValidationByStep, second: false })
      setCurrentStep(STEPS[STEP_INDEX[currentStep] + 1])
      return
    }

    if (currentStep === 'preview') {
      setIsSubmitted(true)
    }
  }

  return (
    <div className='relative min-h-[calc(100vh-60px)] flex flex-col'>
      <ActionHeader title={headerTitle} isBack />
      <ProgressBar step={currentStep} />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='pt-[30px] flex flex-col flex-1 justify-between'
        >
          {isFormReady() && (
            <CourseFormByStep
              step={currentStep}
              places={places}
              setPlaces={setPlaces}
              handleClickSearchPlace={handleClickSearchPlace}
              showValidationByStep={showValidationByStep}
            />
          )}
          <Spacer height={30} />
          <div className='w-full h-[54px] flex flex-row text-main font-bold group'>
            {STEP_INDEX[currentStep] !== 0 && (
              <button
                type='button'
                onClick={() => {
                  if (currentStep === 'preview') {
                    setIsSubmitted(false)
                  } else if (currentStep === 'second') {
                    setShowValidationByStep({
                      ...showValidationByStep,
                      second: false,
                    })
                  }
                  setCurrentStep(STEPS[STEP_INDEX[currentStep] - 1])
                }}
                className={`flex-1 bg-gray-100 text-gray-700 border-r border-gray-200 hover:bg-brand hover:text-white group-hover:border-none transition-all duration-300 ${
                  isSubmitted ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
                }`}
                disabled={isSubmitted}
              >
                이전
              </button>
            )}
            <button
              type={currentStep === 'preview' ? 'submit' : 'button'}
              onClick={handleClickNextButton}
              className={`flex-1 bg-gray-100 text-gray-700 hover:bg-brand hover:text-white transition-all duration-300 ${
                isSubmitted ? 'cursor-default' : 'bg-blue-800 bg-opacity-50'
              }`}
              disabled={isSubmitted}
            >
              다음
            </button>
          </div>
        </form>
      </FormProvider>
      {openSearchPlace && (
        <SearchPlace
          region={region}
          setOpenSearchPlace={setOpenSearchPlace}
          setPlaces={setPlaces}
        />
      )}
    </div>
  )
}
