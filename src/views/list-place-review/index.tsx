'use client'

import { useGetPlaceReviews } from '@/src/entities/place'
import { PlaceReviewCard, SkeletonPlaceReviewCard } from '@/src/features'
import { Spacer } from '@/src/shared/ui'
import { ActionHeader } from '@/src/widgets'

export default function ListPlaceReview({ placeId }: { placeId: string }) {
  const { data: reviewData } = useGetPlaceReviews(placeId)

  if (!reviewData) {
    return (
      <>
        <ActionHeader title='전체 리뷰' isBack />
        <div className='flex flex-col px-[20px]'>
          <Spacer height={20} />
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonPlaceReviewCard key={index} />
          ))}
          <Spacer height={20} />
        </div>
      </>
    )
  }

  return (
    <>
      <ActionHeader title='전체 리뷰' isBack />
      <div className='flex flex-col px-[20px]'>
        <Spacer height={20} />
        {reviewData.map((review) => (
          <div key={review.id}>
            <PlaceReviewCard id={placeId} content={review} />
          </div>
        ))}
        <Spacer height={20} />
      </div>
    </>
  )
}
