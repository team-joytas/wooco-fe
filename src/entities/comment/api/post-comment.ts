import { customAxios } from '@/src/shared/api'
import { CommentType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COMMENT_QUERY_KEY } from './queryKey'
import { COMMENT_URL } from './endpoint'

export const postComment = async (
  courseId: string,
  contents: string
): Promise<CommentType> => {
  try {
    const response = await customAxios.post(COMMENT_URL.comments(courseId), {
      contents,
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const usePostComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, contents }: { id: string; contents: string }) =>
      postComment(id, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_QUERY_KEY.all })
    },
  })
}
