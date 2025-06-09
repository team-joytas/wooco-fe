'use client'

import { Send } from 'lucide-react'
import { Spacer, useToast } from '@/src/shared/ui'
import { useForm } from 'react-hook-form'
import { usePostComment, useGetComments } from '@/src/entities/comment'
import { ActionHeader } from '@/src/widgets'
import { CommentCard, SkeletonCommentCard } from '@/src/features'
import { useAuth } from '@/src/shared/provider'

export default function DetailComment({ courseId }: { courseId: string }) {
  const { show } = useToast()
  const { token } = useAuth()

  const { data: comments, isLoading, refetch } = useGetComments(courseId)
  const { mutate: createComment } = usePostComment()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      contents: '',
    },
  })

  const onSubmit = async (data: { contents: string }) => {
    if (!token) {
      show('로그인 후 이용해주세요')
      return
    }

    try {
      createComment(
        { id: courseId, contents: data.contents },
        {
          onSuccess: () => {
            reset()
          },
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading || !comments) {
    return (
      <div className='h-100% flex flex-col'>
        <ActionHeader title='댓글' isBack />
        <Spacer height={20} />
        <div className='px-[20px] flex flex-col gap-[25px]'>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCommentCard key={index} />
          ))}
          <Spacer height={20} />
        </div>
      </div>
    )
  }

  return (
    <div className='h-100% flex flex-col'>
      <ActionHeader title='댓글' isBack />
      <Spacer height={20} />
      <div className='px-[20px] flex flex-col gap-[25px]'>
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.id}
              id={comment.id}
              content={comment}
              refetch={refetch}
              showKebab={true}
            />
          )
        })}
        <Spacer height={20} />
      </div>
      <div className='shadow-custom bg-white max-w-[375px] fixed bottom-0 w-full h-[70px] px-[20px] flex items-center'>
        <form
          className='w-full px-[15px] gap-[10px] h-[40px] border-[1px] border-brand bg-bright-gray rounded-full flex items-center justify-between relative'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('contents')}
            type='text'
            placeholder='댓글을 작성해주세요.'
            className='bg-transparent focus:outline-none text-main01 placeholder:opacity-50 box-border scale-[0.875] origin-left w-[114.29%] h-[45.71px]'
          />
          <button
            type='submit'
            className='absolute right-[15px] top-[50%] transform -translate-y-1/2'
          >
            <Send
              size={20}
              className={isDirty ? 'text-brand' : 'text-dark-gray'}
              strokeWidth={1.5}
            />
          </button>
        </form>
      </div>
    </div>
  )
}
