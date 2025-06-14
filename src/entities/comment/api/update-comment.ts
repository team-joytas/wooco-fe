import { customAxios } from '@/src/shared/api'
import { CommentType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COMMENT_URL } from './endpoint'
import { COMMENT_QUERY_KEY } from './queryKey'

export const patchComment = async (
  id: string,
  contents: string
): Promise<CommentType> => {
  try {
    const response = await customAxios.patch(COMMENT_URL.detail(id), {
      contents,
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateComment = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, contents }: { id: string; contents: string }) =>
      patchComment(id, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.detail(id) })
    },
  })
}
