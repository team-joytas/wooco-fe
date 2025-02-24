'use client'

import ProfileImage from '@/src/shared/ui/ProfileImage'
import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { PlaceReviewType } from '@/src/entities/place/type'
import emptyProfile from '@/src/assets/images/(logo)/temp_empty.png'
import Spacer from '@/src/shared/ui/Spacer'
import ReviewTag from './review-tag'
import StarRate from '@/src/shared/ui/StarRate'
import OptionDropbox from '@/src/shared/ui/OptionDropbox'
import { useEffect, useRef, useState } from 'react'
import { useDeletePlaceReview } from '@/src/entities/place/query'

export default function CardReview({
  review,
  placeId,
}: {
  review: PlaceReviewType
  placeId: string
}) {
  const { user } = useUserStore()
  const isMyComment = review.writer.id === user?.user_id
  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const { mutate: deletePlaceReview } = useDeletePlaceReview()

  const handleDeleteReview = () => {
    deletePlaceReview(review.id.toString())
    setIsOpen(false)
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
    <div className='w-full flex items-end flex-col px-[12px]'>
      <Spacer height={25} />
      <div className='w-full justify-between flex items-center'>
        <Link
          href={`/users/${review.writer.id}`}
          className='flex w-fit gap-[10px] items-center'
        >
          <ProfileImage
            size={40}
            src={review.writer.profile_url || emptyProfile}
          />
          <div className='flex flex-col'>
            <p className='text-middle font-medium'>{review.writer.name}</p>
            <div className='flex flex-row items-center gap-[5px] text-sub'>
              <span className='text-black'>
                {passFromCreate(review.created_at)}
              </span>
              <span className='text-description'>
                {formatDateToYYYYMMDD(review.created_at, 'slash')}
              </span>
            </div>
          </div>
        </Link>

        {isMyComment && (
          <OptionDropbox
            isMine={isMyComment}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            ref={menuRef}
            type='place'
            id={review.id.toString()}
            handleDelete={handleDeleteReview}
            placeId={placeId}
          />
        )}
      </div>

      <Spacer height={21} />
      <section className='w-full flex flex-col items-start gap-[10px] px-[12px]'>
        <div className='flex flex-row items-center gap-[5px]'>
          {review.one_line_reviews.map((tag, index) => (
            <ReviewTag key={index} keyword={tag.contents} />
          ))}
        </div>
        <StarRate rate={review.rating} size={10} />
      </section>
      <Spacer height={10} />

      <span className='w-full text-sub px-[12px]'>{review.contents}</span>

      <Spacer height={30} />
    </div>
  )
}
