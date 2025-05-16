import { postImage } from '@/src/shared/api'
import Image from 'next/image'
import camera from '@/src/assets/icon/medium/camera.svg'

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
    <label className='w-[60px] h-[60px] bg-wooco-gra-light bg-no-repeat relative rounded-full flex items-center justify-center cursor-pointer'>
      <div className='w-[56px] h-[56px] bg-white border-2 border-transparent rounded-full flex items-center justify-center'>
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
      </div>
      <div className='absolute bottom-[0px] w-[23px] h-[23px] right-[0px] rounded-full bg-wooco_blue-primary flex items-center justify-center'>
        <div className='w-[21px] h-[21px] rounded-full bg-white flex items-center justify-center'>
          <Image src={camera} alt='camera' width={15} height={15}/>
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
