'use client'

import { useGetPlaceReviews } from '@/src/entities/place/query'
import CardReview from '@/src/features/place/card-review'
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
            <CardReview review={review} placeId={placeId} />
            <Spacer height={8} className='bg-light-gray' />
          </div>
        ))}
      </div>
    </>
  )
}
