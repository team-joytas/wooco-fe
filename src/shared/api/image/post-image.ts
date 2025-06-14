import axios from 'axios'
import { convertImageToWebP } from '../../utils/imageUtil'
import { getImageUploadUrl } from './get-image-upload-url'

export const postImage = async (image: File): Promise<string> => {
  const webpImage = await convertImageToWebP(image)

  const { upload_url: uploadUrl, image_url: imageUrl } =
    await getImageUploadUrl()

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
