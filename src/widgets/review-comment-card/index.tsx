'use client'

import ProfileImage from '@/src/shared/ui/ProfileImage'
import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { PlaceReviewType } from '@/src/entities/place/type'
import emptyProfile from '@/src/assets/images/(logo)/temp_empty.png'
import Spacer from '@/src/shared/ui/Spacer'
import ReviewTag from '@/src/features/place/review-tag'
import StarRate from '@/src/shared/ui/StarRate'
import OptionDropbox from '@/src/shared/ui/OptionDropbox'
import { useEffect, useRef, useState } from 'react'
import { useDeletePlaceReview } from '@/src/entities/place/query'
import { CommentType } from '@/src/entities/comment/type'

type ReviewCommentCardProps = {
  id: string
  content: PlaceReviewType | CommentType
  isHaveOption?: boolean
}

export default function ReviewCommentCard({
  id,
  content,
  isHaveOption,
}: ReviewCommentCardProps) {
  const { user } = useUserStore()
  const isMine = content.writer.id === user?.user_id
  const isPlaceReview = 'rating' in content && 'one_line_reviews' in content
  const menuRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const { mutate: deletePlaceReview } = useDeletePlaceReview()

  const handleDeleteReview = () => {
    deletePlaceReview(content.id.toString())
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
      <div className='w-full justify-between flex items-center'>
        <Link
          href={`/users/${content.writer.id}`}
          className='flex w-fit gap-[10px] items-center'
        >
          <ProfileImage
            size={40}
            src={content.writer.profile_url || emptyProfile}
          />
          <div className='flex flex-col'>
            <p className='text-middle font-medium'>{content.writer.name}</p>
            <div className='flex flex-row items-center gap-[5px] text-sub'>
              <span className='text-black'>
                {passFromCreate(content.created_at)}
              </span>
              <span className='text-description'>
                {formatDateToYYYYMMDD(content.created_at, 'slash')}
              </span>
            </div>
          </div>
        </Link>

        {isHaveOption && isMine && (
          <OptionDropbox
            isMine={isMine}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            ref={menuRef}
            type='place'
            id={content.id.toString()}
            handleDelete={handleDeleteReview}
            placeId={id}
          />
        )}
      </div>

      <Spacer height={21} />
      {isPlaceReview && (
        <>
          <section className='w-full flex flex-col items-start gap-[10px] px-[12px]'>
            {content.one_line_reviews.length > 0 && (
              <div className='flex flex-row items-center gap-[5px]'>
                {content.one_line_reviews.map((tag, index) => (
                  <ReviewTag key={index} keyword={tag.toString()} />
                ))}
              </div>
            )}
            <StarRate rate={content.rating} size={10} />
          </section>
          <Spacer height={10} />
        </>
      )}

      <span className='w-full text-sub px-[12px]'>{content.contents}</span>
    </div>
  )
}
