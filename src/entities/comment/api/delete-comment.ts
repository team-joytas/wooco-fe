import { customAxios } from '@/src/shared/axios'
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

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.detail })
    },
  })
}
