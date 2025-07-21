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

export const usePostComment = (course_id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      course_id,
      contents,
    }: {
      course_id: string
      contents: string
    }) => postComment(course_id, contents),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COMMENT_QUERY_KEY.all(course_id) })
    },
  })
}
