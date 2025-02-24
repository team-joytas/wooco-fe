import Image, { StaticImageData } from 'next/image'

export default function ProfileImage({
  size,
  src,
}: {
  size: number
  src: string | StaticImageData
}) {
  const customLoader = ({ src }: { src: string }) => {
    return src
  }

  return (
    <Image
      loader={customLoader}
      className={`w-[${size}px] h-[${size}px] bg-white rounded-full border-[0.5px] object-cover border-brand aspect-square`}
      alt='프로필이미지'
      src={src}
      width={size}
      height={size}
    />
  )
}
