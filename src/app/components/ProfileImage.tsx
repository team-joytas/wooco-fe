import Image from 'next/image'

export default function ProfileImage({
  size = 16,
  src,
}: {
  size?: number
  src: string
}) {
  return (
    <Image
      className='rounded-full border-gray border-[0.5px]'
      alt='프로필이미지'
      src={src}
      width={size}
      height={size}
    />
  )
}
