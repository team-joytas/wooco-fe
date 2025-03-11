'use client'

import { useGetPlaceReviews } from '@/src/entities/place/query'
import ReviewCommentCard from '@/src/widgets/review-comment-card'
import Spacer from '@/src/shared/ui/Spacer'
import { HeaderWithBackButton } from '@/src/widgets/header'

export default function ListPlaceReview({ placeId }: { placeId: string }) {
  const { data: reviewData } = useGetPlaceReviews(placeId)

  if (!reviewData) return <div>Loading..</div>

  return (
    <>
      <HeaderWithBackButton title='전체 리뷰' />
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
