import ProfileImage from '@/src/shared/ui/ProfileImage'
import type { CommentType } from '@/src/entities/comment/type'
import Link from 'next/link'

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className='w-full flex items-end flex-col gap-[10px]'>
      <Link
        href={`/users/${comment.writer.id}`}
        className='flex w-full gap-[10px]'
      >
        <ProfileImage
          size={40}
          src={comment.writer.profile_url}
          type='colored'
        />
        <div className='flex flex-col'>
          <p className='text-[12px]'>{comment.writer.name}</p>
          <span className='text-[10px]'>{comment.created_at}</span>
        </div>
      </Link>
      <span className='w-full text-[14px] px-[10px]'>{comment.contents}</span>
      <button className='text-sub opacity-50'>신고하기</button>
    </div>
  )
}
