'use client'

import { useGetPlaceReviews } from '@/src/entities/place'
import ReviewCommentCard from '@/src/widgets/review-comment-card'
import { Spacer } from '@/src/shared/ui'
import { ActionHeader } from '@/src/widgets'

export default function ListPlaceReview({ placeId }: { placeId: string }) {
  const { data: reviewData } = useGetPlaceReviews(placeId)

  if (!reviewData) return <div>Loading..</div>

  return (
    <>
      <ActionHeader title='전체 리뷰' isBack />
      <div className='flex flex-col'>
        {reviewData.map((review) => (
          <div key={review.id}>
            <ReviewCommentCard id={placeId} content={review} />
            <Spacer height={8} className='bg-light-gray' />
          </div>
        ))}
      </div>
    </>
  )
}
