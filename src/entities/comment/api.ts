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
  courseId: string,
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

export const updateComment = async (
  id: string,
  contents: string
): Promise<CommentType> => {
  try {
    const response = await customAxios.patch(`/comments/${id}`, {
      contents,
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteComment = async (id: string): Promise<number> => {
  try {
    const response = await customAxios.delete(`/comments/${id}`)
    return response.status
  } catch (error) {
    console.error(error)
    throw error
  }
}
