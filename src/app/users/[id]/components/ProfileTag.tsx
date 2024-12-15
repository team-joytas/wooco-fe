export default function ProfileTag({
  content,
  title,
}: {
  content: string | number
  title: string
}) {
  return (
    <div className='flex flex-col items-center'>
      <span className='text-[20px]'>{content}</span>
      <span className='text-[13px]'>{title}</span>
    </div>
  )
}
