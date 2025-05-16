import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import person from '@/src/assets/icon/large/profile_empty.svg'

export function ProfileImage({
  size,
  src,
  userId,
}: {
  size: number
  src: string | StaticImageData
  userId: string
}) {
  const customLoader = ({ src }: { src: string }) => {
    return src
  }

  return (
    <Link href={`/users/${userId}`} legacyBehavior>
      <div className={`w-[${size}px] h-[${size}px] bg-wooco_blue-secondary bg-no-repeat rounded-full flex items-center justify-center`}>
        <Image
          loader={customLoader}
          className={`rounded-full bg-white object-cover aspect-square`}
          alt='프로필이미지'
          src={src || person}
          width={size - 2}
          height={size - 2}
        />
      </div>
    </Link>
  )
}
