import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
export default function ProfileImage({
  size,
  src,
  user_id,
}: {
  size: number
  src: string | StaticImageData
  user_id: string
}) {
  const customLoader = ({ src }: { src: string }) => {
    return src
  }

  return (
    <Link href={`/users/${user_id}`}>
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
