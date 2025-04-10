import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

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
      <Image
        loader={customLoader}
        className={`w-[${size}px] h-[${size}px] bg-white rounded-full border-[0.5px] object-cover border-brand aspect-square`}
        alt='프로필이미지'
        src={src || '/profile.png'}
        width={size}
        height={size}
      />
    </Link>
  )
}
