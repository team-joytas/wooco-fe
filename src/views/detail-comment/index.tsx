'use client'

import { Send } from 'lucide-react'
import { Spacer } from '@/src/shared/ui'
import { useForm } from 'react-hook-form'
import { usePostComment, useGetComments } from '@/src/entities/comment'
import { ActionHeader } from '@/src/widgets'
import ReviewCommentCard from '@/src/widgets/review-comment-card'

export default function DetailComment({ courseId }: { courseId: string }) {
  const { data: comments, refetch } = useGetComments(courseId)
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

  if (!comments) return <div>Loading...</div>

  return (
    <div className='h-100% flex flex-col'>
      <ActionHeader title='댓글' isBack />
      <Spacer height={20} />
      <div className='px-[20px] flex flex-col gap-[25px]'>
        {comments.map((comment) => {
          return (
            <ReviewCommentCard
              key={comment.id}
              id={comment.id}
              content={comment}
              refetch={refetch}
            />
          )
        })}
        <Spacer height={20} />
      </div>
      <div className='shadow-custom bg-white max-w-[375px] fixed bottom-0 w-full h-[70px] px-[20px] flex items-center'>
        <form
          className='w-full px-[15px] gap-[10px] h-[40px] border-[1px] border-brand bg-bright-gray rounded-full flex items-center justify-between'
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register('contents')}
            type='text'
            placeholder='댓글을 작성해주세요.'
            className='w-full h-full text-middle bg-transparent focus:outline-none placeholder:text-sub placeholder:opacity-50'
          />
          <button type='submit'>
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
