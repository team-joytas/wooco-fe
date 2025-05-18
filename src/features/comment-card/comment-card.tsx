'use client'

import Link from 'next/link'
import { formatDateToYYYYMMDD, passFromCreate } from '@/src/shared/utils/date'
import useUserStore from '@/src/shared/store/userStore'
import { ProfileImage, Spacer, HelperText } from '@/src/shared/ui'
import { useEffect, useRef, useState } from 'react'
import {
  CommentType,
  useUpdateComment,
  useDeleteComment,
} from '@/src/entities/comment'
import { useForm } from 'react-hook-form'
import { ActionDropdown, CancelModal } from '@/src/features'

type CommentCardProps = {
  id: string
  content: CommentType
  refetch?: () => void
  showKebab: boolean
}

export function CommentCard({
  id,
  content,
  refetch,
  showKebab,
}: CommentCardProps) {
  const { writer, contents, created_at } = content
  const { user } = useUserStore()

  const isMine = writer.id === user?.user_id
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditingComment, setIsEditingComment] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      contents: contents,
    },
  })

  const { mutate: updateComment } = useUpdateComment(id)
  const { mutate: deleteComment } = useDeleteComment(id)

  const onSubmit = async (data: { contents: string }) => {
    if (!isDirty) {
      setErrorMessage('댓글을 수정해주세요.')
      return
    }

    try {
      updateComment(
        { id: id.toString(), contents: data.contents },
        {
          onSuccess: () => {
            setErrorMessage('')
            setIsEditingComment(false)
            if (refetch) {
              refetch()
            }
            reset({ contents: data.contents })
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = () => {
    try {
      deleteComment(id.toString(), {
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

  const handleClickCancel = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault()

    if (!isDirty) {
      setIsEditingComment(false)
      return
    }
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (isEditingComment) {
      reset({ contents: contents })
      inputRef.current?.focus()
    }
  }, [isEditingComment])

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

        {isMine && !isEditingComment && showKebab && (
          <ActionDropdown
            type='comment'
            id={id}
            handleDelete={handleDelete}
            setIsEditingComment={setIsEditingComment}
          />
        )}
      </div>

      {isEditingComment ? (
        <section className='w-full flex flex-col gap-[10px]'>
          <form
            className='w-full px-[10px] gap-[10px] py-[10px] bg-bright-gray rounded-[10px] flex items-center justify-between'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('contents')}
              ref={(e) => {
                register('contents').ref(e)
                inputRef.current = e
              }}
              type='text'
              placeholder='댓글을 작성해주세요.'
              className='w-full text-middle text-gray-800 bg-transparent focus:outline-none placeholder:text-sub placeholder:opacity-50'
            />
            <div className='z-[10001] fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[375px] h-[80px] flex flex-col items-center justify-center gap-[1px] bg-white text-gray-600 font-bold text-main'>
              <Spacer height={20} />
              <div className='w-full h-full flex flex-row'>
                <button
                  className='w-[187px] h-full bg-light-gray border border-r-white hover:bg-brand hover:text-white transition-all duration-200'
                  onClick={handleClickCancel}
                >
                  취소
                </button>
                <button
                  type='submit'
                  className='w-[187px] h-full bg-light-gray hover:bg-brand hover:text-white transition-all duration-200'
                >
                  수정 완료
                </button>
              </div>
            </div>
          </form>
          {errorMessage && <HelperText message='수정사항이 없습니다.' />}
        </section>
      ) : (
        <span className='w-full text-middle text-gray-800 px-[10px]'>
          {getValues('contents')}
        </span>
      )}

      <CancelModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        setIsEditing={setIsEditingComment}
      />
    </div>
  )
}
