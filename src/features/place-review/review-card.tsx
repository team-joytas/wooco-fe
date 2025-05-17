'use client'

import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { PlaceReviewDetailType } from '@/src/entities/place'
import { ProfileImage } from '@/src/shared/ui'
import { ReviewTag, StarRateView, ActionDropdown } from '@/src/features'
import { useState } from 'react'
import { useDeletePlaceReview } from '@/src/entities/place'
import Image from 'next/image'
import { ImageView } from './image-view'

type PlaceReviewCardProps = {
  placeId: string
  content: PlaceReviewDetailType
  refetch?: () => void
}

export function PlaceReviewCard({
  placeId,
  content,
  refetch,
}: PlaceReviewCardProps) {
  const { id, writer, rating, one_line_reviews, image_urls, created_at } =
    content
  const { user } = useUserStore()
  const isMine = writer.id === user?.user_id
  const [isImageViewOpened, setIsImageViewOpened] = useState(false)
  const [imageIndex, setImageIndex] = useState<number>(0)

  const { mutate: deletePlaceReview } = useDeletePlaceReview(id.toString())
  const handleDelete = () => {
    try {
      deletePlaceReview(id.toString(), {
        onSuccess: () => {
          if (refetch) {
            refetch()
          }
        },
        onError: (error) => console.error(error),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickImage = (index: number) => {
    setImageIndex(index)
    setIsImageViewOpened(true)
  }

  return (
    <div className='w-full flex items-end flex-col gap-[10px] py-[5px]'>
      <div className='w-full justify-between flex items-center'>
        <Link
          href={`/users/${writer.id}`}
          className='flex w-fit gap-[10px] items-center'
        >
          <ProfileImage
            userId={writer.id}
            size={40}
            src={writer.profile_url || '/profile.png'}
          />
          <div className='flex flex-col'>
            <p className='text-middle font-medium'>{writer.name}</p>
            <div className='flex flex-row items-center gap-[5px] text-sub'>
              <span className='text-black'>{passFromCreate(created_at)}</span>
              <span className='text-description'>
                {formatDateToYYYYMMDD(created_at, 'slash')}
              </span>
            </div>
          </div>
        </Link>

        {isMine && (
          <ActionDropdown
            type='review'
            id={id.toString()}
            handleDelete={handleDelete}
            placeId={placeId}
          />
        )}
      </div>

      <section className='w-full flex flex-col items-start gap-[5px]'>
        <StarRateView rate={rating} size={15} />
        {one_line_reviews.length > 0 && (
          <div className='flex flex-row items-center gap-[5px]'>
            {one_line_reviews.map((tag, index) => (
              <ReviewTag key={index} keyword={tag.toString()} />
            ))}
          </div>
        )}
      </section>

      <span className='w-full text-sub'>{content.contents}</span>

      <div className='h-full w-full overflow-x-auto flex flex-1 items-center justify-start gap-[5px] scrollbar-hide pr-[10px]'>
        {image_urls.map((image, index) => (
          <Image
            key={index}
            alt='place'
            width={74}
            height={74}
            src={image}
            className='w-[74px] h-[74px] rounded-[5px] object-cover cursor-pointer'
            layout='fixed'
            onClick={() => handleClickImage(index)}
          />
        ))}
      </div>

      {isImageViewOpened && (
        <ImageView
          writer={writer}
          createdAt={created_at}
          imageUrls={image_urls}
          clickedIndex={imageIndex}
          setClickedIndex={setImageIndex}
          setIsOpen={setIsImageViewOpened}
        />
      )}
    </div>
  )
}
