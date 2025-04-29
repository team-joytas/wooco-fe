import { Camera } from 'lucide-react'
import { postImage } from '@/src/shared/api'
import Image from 'next/image'

interface UploadProfileImageProps {
  imageUrl: string
  setImageUrl: (imageUrl: string) => void
}

export function UploadProfileImage({
  imageUrl,
  setImageUrl,
}: UploadProfileImageProps) {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = await postImage(file)
      setImageUrl(imageUrl)
    }
  }

  return (
    <label className='w-[100px] h-[100px] border-[1px] border-brand rounded-full flex items-center justify-center cursor-pointer'>
      <div className='w-full h-full bg-gray-300 relative rounded-full flex items-center justify-center'>
        {imageUrl && (
          <div className='relative'>
            <Image
              src={imageUrl}
              alt='Preview'
              className='rounded-full bg-white w-[98px] h-[98px] object-cover'
              width={98}
              height={98}
            />
          </div>
        )}
        <div className='absolute bottom-[5px] w-[23px] h-[23px] right-[5px] rounded-full bg-brand flex items-center justify-center'>
          <Camera size={15} strokeWidth={1.5} stroke='#ffffff' />
        </div>
      </div>
      <input
        type='file'
        className='hidden'
        accept='.png, .jpg, .jpeg'
        onChange={handleImageUpload}
      />
    </label>
  )
}
