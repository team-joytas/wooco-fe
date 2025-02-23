import Header from '@/src/widgets/header'
import { useForm } from 'react-hook-form'
import Spacer from '@/src/shared/ui/Spacer'
import { getReview, postReview } from '@/src/entities/review/api'
import { useEffect, useState } from 'react'
import { getPlace } from '@/src/entities/place/api'
import FormReview from '@/src/features/place/form-review'
import { ReviewPayloadType } from '@/src/entities/review/type'

interface ReviewFormLayoutProps {
  placeId?: string
  reviewId?: string
}

interface InputFormData {
  rating: number
  contents: string
  one_line_reviews: string[]
  image_urls: string[]
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
  useEffect(() => {
    const fetchPlaceData = async () => {
      if (placeId) {
        try {
          const placeData = await getPlace(placeId)
          setPlaceInfo({ name: placeData.name, address: placeData.address })
        } catch (error) {
          console.error('Error fetching place data:', error)
        }
      }
    }
    const fetchReviewData = async () => {
      if (reviewId) {
        try {
          const reviewData = await getReview(reviewId)
          setValue('contents', value: reviewData.contents)
          setValue('rating', reviewData.rating)
          setValue('one_line_reviews', reviewData.one_line_reviews)
          setValue('image_urls', reviewData.image_urls)
        } catch (error) {
          console.error('Error fetching review data:', error)
        }
      }
    }
    fetchPlaceData()
    fetchReviewData()
  }, [placeId, reviewId, setValue])

  const onSubmit = async (data: InputFormData) => {
    if (!placeId) {
      console.error('Place ID is missing')
      return
    }

    try {
      await postReview(placeId, data).then()
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='relative flex flex-col min-h-screen'>
      <Header title={headerTitle} isBack />
      <div className='place_describe bg-brand text-white pl-[19px] pt-[18px] pb-[14px]  '>
        <b className='text-main place_name'>
          {placeInfo.name || '장소 이름 없음'}
        </b>
        <p className='text-sub font-light place_adress'>
          {placeInfo.address || '주소 정보 없음'}
        </p>
      </div>
      <Spacer height={20} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col flex-grow pb-[120px]'
      >
        <FormReview
          register={register}
          setValue={setValue}
          errors={errors}
          isSubmitting={isSubmitting}
          formValues={watch()}
        />
        <div className='fixed bottom-[60px] w-full'>
          <button
            type='submit'
            disabled={isSubmitting}
            className={`p-[10px] h-[54px] w-[375px] text-main font-extrabold 
            ${isSubmitting ? 'bg-light-gray text-brand cursor-default' : 'bg-brand text-white'}`}
          >
            완료
          </button>
        </div>
      </form>
    </div>
  )
}
