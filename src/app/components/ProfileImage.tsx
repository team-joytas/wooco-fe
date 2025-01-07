import Image from 'next/image'

export default function ProfileImage({
  size = 16,
  src,
  className,
  type,
}: {
  size?: number
  src: string
  className?: string
  type?: 'colored'
}) {
  if (type === 'colored') {
    return (
      <div className='w-[42px] h-[42px] bg-gradient-to-r from-[#9997F2] to-[#4341EA] p-[1px] rounded-[50%]'>
        <Image
          className={`w-[${size}px] h-[${size}px] rounded-full border-gray border-[0.5px] object-cover ${className}`}
          alt='프로필이미지'
          src={src}
          width={size}
          height={size}
        />
      </div>
    )
  }

  return (
    <Image
      className={`w-[${size}px] h-[${size}px] rounded-full border-gray border-[0.5px] object-cover ${className}`}
      alt='프로필이미지'
      src={src}
      width={size}
      height={size}
    />
  )
}
