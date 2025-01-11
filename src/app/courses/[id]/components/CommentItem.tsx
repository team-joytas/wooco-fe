import ProfileImage from '@/app/components/ProfileImage'

interface Comment {
  id: number
  user: {
    profile_url: string
    name: string
  }
  created_at: string
  content: string
}

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className='w-full flex items-end flex-col gap-[10px]'>
      <div className='flex w-full gap-[10px]'>
        <ProfileImage size={40} src={comment.user.profile_url} type='colored' />
        <div className='flex flex-col'>
          <p className='text-[12px]'>{comment.user.name}</p>
          <span className='text-[10px]'>{comment.created_at}</span>
        </div>
      </div>
      <span className='w-full text-[14px] px-[10px]'>{comment.content}</span>
      <button className='text-sub opacity-50'>신고하기</button>
    </div>
  )
}
