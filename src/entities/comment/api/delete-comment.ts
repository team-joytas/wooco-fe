import { customAxios } from '@/src/shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COMMENT_URL } from './endpoint'
import { COMMENT_QUERY_KEY } from './queryKey'

export const deleteComment = async (id: string): Promise<number> => {
  try {
    const response = await customAxios.delete(COMMENT_URL.detail(id))
    return response.status
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useDeleteComment = (course_id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment_id: string) => deleteComment(comment_id),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COMMENT_QUERY_KEY.all(course_id),
      })
    },
  })
}
