'use client'

import ProfileImage from '@/src/shared/ui/ProfileImage'
import type { CommentType } from '@/src/entities/comment/type'
import Link from 'next/link'
import { formatDateToYYYYMMDD } from '@/src/shared/utils/date'
import { useDeleteComment } from '@/src/entities/comment/query'
import useUserStore from '@/src/shared/store/userStore'

export default function CommentItem({ comment }: { comment: CommentType }) {
  const { user } = useUserStore()
  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()
  const isMyComment = comment.writer.id === user?.user_id

  const handleDeleteComment = () => {
    deleteComment(comment.id)
  }

  return (
    <div className='w-full flex items-end flex-col gap-[10px]'>
      <div className='w-full justify-between flex items-center'>
        <Link
          href={`/users/${comment.writer.id}`}
          className='flex w-fit gap-[10px] items-center'
        >
          <ProfileImage size={40} src={comment.writer.profile_url} />
          <div className='flex flex-col'>
            <p className='text-[12px]'>{comment.writer.name}</p>
            <span className='text-[10px]'>
              {formatDateToYYYYMMDD(comment.created_at, 'slash')}
            </span>
          </div>
        </Link>
        {isMyComment && (
          <button
            className='text-sub opacity-50'
            onClick={handleDeleteComment}
            disabled={isDeleting}
          >
            삭제하기
          </button>
        )}
      </div>
      <span className='w-full text-[14px] px-[10px]'>{comment.contents}</span>
    </div>
  )
}
