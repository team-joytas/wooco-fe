'use client'

import { ActionHeader } from '@/src/widgets'
import { useForm } from 'react-hook-form'
import { Spacer } from '@/src/shared/ui'
import { useEffect, useState } from 'react'
import {
  useGetPlace,
  usePostPlaceReview,
  useGetPlaceReview,
  useUpdatePlaceReview,
} from '@/src/entities/place'
import FormReview from '@/src/features/place/form-review'
import { ReviewPayloadType } from '@/src/entities/place'
import { useRouter } from 'next/navigation'

interface ReviewFormLayoutProps {
  placeId: string
  reviewId?: string
}

export default function ReviewFormLayout({
  placeId,
  reviewId,
}: ReviewFormLayoutProps) {
  const formType = reviewId ? '수정' : '작성'
  const headerTitle = `리뷰 ${formType}하기`
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<ReviewPayloadType>({
    mode: 'onSubmit',
    defaultValues: {
      rating: 0,
      contents: '',
      one_line_reviews: [],
      image_urls: [],
    },
  })
  const [placeInfo, setPlaceInfo] = useState({ name: '', address: '' })
  const { data: placeData } = useGetPlace(placeId)
  const { data: reviewData } = useGetPlaceReview(reviewId)
  const { mutateAsync: createPlaceMutate } = usePostPlaceReview(placeId)
  const { mutateAsync: updatePlaceMutate } = useUpdatePlaceReview(
    reviewId ?? ''
  )
  const router = useRouter()

  useEffect(() => {
    if (placeData) {
      setPlaceInfo({ name: placeData.name, address: placeData.address })
    }
  }, [placeData])

  useEffect(() => {
    if (reviewData) {
      setValue('contents', reviewData.contents)
      setValue('rating', reviewData.rating)
      setValue('one_line_reviews', reviewData.one_line_reviews)
      setValue('image_urls', reviewData.image_urls)
    }
  }, [reviewData])

  const onSubmit = async (data: ReviewPayloadType) => {
    const mutate = reviewId ? updatePlaceMutate : createPlaceMutate
    try {
      mutate(data, {
        onSuccess: () => {
          router.push(`/places/${placeId}`)
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='relative flex flex-col h-[calc(100vh-60px)]'>
      <ActionHeader title={headerTitle} isBack />
      <div className='place_describe bg-wooco_blue-secondary text-white pl-[19px] pt-[18px] pb-[14px]  '>
        <b className='text-main place_name'>
          {placeInfo.name || '장소 이름 없음'}
        </b>
        <p className='text-sub font-light place_adress'>
          {placeInfo.address || '주소 정보 없음'}
        </p>
      </div>
      <Spacer height={20} />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full'>
        <FormReview
          register={register}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          formValues={watch()}
        />
        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full h-[54px] mt-auto flex items-center justify-center bg-light-gray text-brand text-main font-bold hover:bg-brand hover:text-white transition-all duration-300 ${
            isSubmitting ? 'cursor-default' : 'bg-blue-800'
          }`}
        >
          완료
        </button>
      </form>
    </div>
  )
}
