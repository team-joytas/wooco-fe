'use client'

import ProfileImage from '@/src/shared/ui/ProfileImage'
import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { PlaceReviewDetailType } from '@/src/entities/place'
import Spacer from '@/src/shared/ui/Spacer'
import { ReviewTag } from '@/src/features'
import StarRate from '@/src/shared/ui/StarRate'
import OptionDropbox from '@/src/shared/ui/OptionDropbox'
import { useEffect, useRef, useState } from 'react'
import { useDeletePlaceReview } from '@/src/entities/place'
import {
  CommentType,
  useUpdateComment,
  useDeleteComment,
} from '@/src/entities/comment'
import { useForm } from 'react-hook-form'
import { Send, X } from 'lucide-react'

type ReviewCommentCardProps = {
  id?: string
  content: PlaceReviewDetailType | CommentType
  isHaveOption?: boolean
  refetch?: () => void
}

export default function ReviewCommentCard({
  id,
  content,
  isHaveOption,
  refetch,
}: ReviewCommentCardProps) {
  const { user } = useUserStore()
  const isMine = content.writer.id === user?.user_id
  const isPlaceReview = 'rating' in content && 'one_line_reviews' in content
  const menuRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)

  const { mutate: updateComment } = useUpdateComment()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      contents: '',
    },
  })

  useEffect(() => {
    setValue('contents', content.contents)
  }, [content.contents])

  const onSubmit = async (data: { contents: string }) => {
    if (!isDirty) return

    try {
      updateComment(
        { id: content.id.toString(), contents: data.contents },
        {
          onSuccess: () => {
            setIsEditingComment(false)
            if (refetch) {
              refetch()
            }
            reset()
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const { mutate: deletePlaceReview } = useDeletePlaceReview()
  const { mutate: deleteComment } = useDeleteComment()
  const handleDelete = () => {
    try {
      if (isPlaceReview) {
        deletePlaceReview(content.id.toString(), {
          onSuccess: () => {
            if (refetch) {
              refetch()
            }
            reset()
          },
          onError: (error) => console.error(error),
        })
      } else {
        deleteComment(content.id.toString(), {
          onSuccess: () => {
            if (refetch) {
              refetch()
            }
            reset()
          },
          onError: (error) => console.error(error),
        })
      }
    } catch (error) {
      console.error(error)
    }
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
    <div className='w-full flex items-end flex-col'>
      <div className='w-full justify-between flex items-center'>
        <Link
          href={`/users/${content.writer.id}`}
          className='flex w-fit gap-[10px] items-center'
        >
          <ProfileImage
           user_id={content.writer.id}
            size={40}
            src={content.writer.profile_url || '/profile.png'}
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

        {isHaveOption &&
          isMine &&
          (isEditingComment ? (
            <X
              size={20}
              className='cursor-pointer text-black'
              strokeWidth={1.5}
              onClick={() => setIsEditingComment(false)}
            />
          ) : (
            <OptionDropbox
              isMine={isMine}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onToggle={() => setIsOpen(!isOpen)}
              ref={menuRef}
              type={isPlaceReview ? 'review' : 'comment'}
              id={content.id.toString()}
              handleDelete={handleDelete}
              {...(isPlaceReview
                ? { placeId: id && id.toString() }
                : {
                    isComment: true,
                    setIsEditingComment: setIsEditingComment,
                  })}
            />
          ))}
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

      {isEditingComment ? (
        <form
          className='w-full px-[15px] gap-[10px] py-[8px] border-[1px] border-brand bg-bright-gray rounded-full flex items-center justify-between'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('contents')}
            type='text'
            placeholder='댓글을 작성해주세요.'
            defaultValue={content.contents}
            className='w-full text-middle bg-transparent focus:outline-none placeholder:text-sub placeholder:opacity-50'
          />
          <button type='submit'>
            <Send
              size={20}
              className={`cursor-pointer ${
                isDirty ? 'text-brand' : 'text-dark-gray'
              }`}
              strokeWidth={1.5}
            />
          </button>
        </form>
      ) : (
        <span className='w-full text-sub px-[12px]'>{content.contents}</span>
      )}
    </div>
  )
}
