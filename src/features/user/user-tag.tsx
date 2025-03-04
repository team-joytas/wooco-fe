import { Heart, MessageCircle } from 'lucide-react'

const TAG_TYPE = {
  heart: '관심 목록',
  comment: '내 댓글',
  rate: '평점',
}

export default function UserTag({
  content,
  type,
  onClick,
}: {
  content: string | number
  type: keyof typeof TAG_TYPE
  onClick?: () => void
}) {
  const tagIcon = {
    heart: <Heart size={20} fill='#5A59F2' strokeWidth={0} />,
    comment: <MessageCircle size={20} fill='#5A59F2' strokeWidth={0} />,
    rate: null,
  }

  if (type === 'rate') {
    return (
      <div className='flex flex-col items-center gap-[5px]'>
        <span className='text-headline font-semibold text-brand'>
          {content}
        </span>
        <span className='text-sub font-semibold'>{TAG_TYPE[type]}</span>
      </div>
    )
  }
  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onClick={onClick}
    >
      {tagIcon[type]}
      <span className='text-sub opacity-50'>{content}</span>
      <span className='text-sub font-semibold'>{TAG_TYPE[type]}</span>
    </div>
  )
}
