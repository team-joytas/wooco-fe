'use client'

import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { PlaceReviewDetailType } from '@/src/entities/place'
import { ProfileImage, OptionDropbox } from '@/src/shared/ui'
import { ReviewTag, StarRateView } from '@/src/features'
import { useEffect, useRef, useState } from 'react'
import { useDeletePlaceReview } from '@/src/entities/place'
import Image from 'next/image'
import { ImageView } from './image-view'

type PlaceReviewCardProps = {
  id: string
  content: PlaceReviewDetailType
  refetch?: () => void
}

export function PlaceReviewCard({
  id,
  content,
  refetch,
}: PlaceReviewCardProps) {
  const { writer, rating, one_line_reviews, image_urls, created_at } = content
  const { user } = useUserStore()
  const isMine = writer.id === user?.user_id
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isImageViewOpened, setIsImageViewOpened] = useState(false)
  const [imageIndex, setImageIndex] = useState<number>(0)

  const { mutate: deletePlaceReview } = useDeletePlaceReview(id)
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
    setIsOpen(false)
  }

  const handleClickImage = (index: number) => {
    setImageIndex(index)
    setIsImageViewOpened(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

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
          <OptionDropbox
            isMine={isMine}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onToggle={() => setIsOpen(!isOpen)}
            ref={menuRef}
            type={'review'}
            id={id.toString()}
            handleDelete={handleDelete}
            placeId={id && id.toString()}
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
