import { convertImageToWebP } from '../../utils/imageUtil'
import { getImageUploadUrl } from './get-image-upload-url'

export const postImage = async (image: File): Promise<string> => {
  const webpImage = await convertImageToWebP(image)

  const { upload_url: uploadUrl, image_url: imageUrl } =
    await getImageUploadUrl()

  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'image/webp',
    },
    body: webpImage,
  })

  if (!response.ok) {
    throw new Error('Image upload failed')
  }

  return imageUrl
}
