import { authFetch } from '../fetch'

export const getImageUploadUrl = async (): Promise<{
  upload_url: string
  image_url: string
}> => {
  return authFetch.get<{ upload_url: string; image_url: string }>(
    '/images/upload/url'
  )
}
