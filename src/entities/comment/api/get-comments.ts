import { customAxios } from '@/src/shared/api'
import { CommentType } from '../model'
import { useQuery } from '@tanstack/react-query'
import { COMMENT_QUERY_KEY } from './queryKey'
import { COMMENT_URL } from './endpoint'

export const getComments = async (courseId: string): Promise<CommentType[]> => {
  try {
    const response = await customAxios.get(COMMENT_URL.comments(courseId))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetComments = (id: string) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.detail(id),
    queryFn: () => getComments(id),
  })
}
