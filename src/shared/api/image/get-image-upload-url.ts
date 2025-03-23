import { customAxios } from '../axios'

export const getImageUploadUrl = async (): Promise<{
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
