import { customAxios } from '@/src/shared/axios'
import type { CommentType } from '@/src/entities/comment/type'

export const getComments = async (id: string): Promise<CommentType[]> => {
  try {
    const response = await customAxios.get(`/comments/courses/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postComment = async (
  courseId: number,
  contents: string
): Promise<CommentType> => {
  try {
    const response = await customAxios.post(`/comments/courses/${courseId}`, {
      contents,
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
