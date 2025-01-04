import Image from 'next/image'

export default function ProfileImage({
  size = 16,
  src,
  className,
}: {
  size?: number
  src: string
  className?: string
}) {
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
