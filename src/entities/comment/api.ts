import { customAxios } from '@/src/shared/axios'
import type { CommentType } from '@/src/entities/comment/type'

export const getComments = async (id: number): Promise<CommentType[]> => {
  try {
    const response = await customAxios.get(`/comments/courses/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
