import { convertImageToWebP } from '@/src/shared/utils/imageUtil'
import { customAxios } from '@/src/shared/axios'
import axios from 'axios'

export const getUploadImageUrl = async (): Promise<{
  upload_url: string
  image_url: string
}> => {
  try {
    const url = '/images/upload/url'
    const response = await customAxios.get(url)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postImage = async (image: File): Promise<string> => {
  const webpImage = await convertImageToWebP(image)

  const { upload_url: uploadUrl, image_url: imageUrl } =
    await getUploadImageUrl()

  const response = await axios.put(uploadUrl, webpImage, {
    headers: {
      'Content-Type': 'image/webp',
    },
  })

  if (response.status !== 200) {
    throw new Error('Image upload failed')
  }

  return imageUrl
}
