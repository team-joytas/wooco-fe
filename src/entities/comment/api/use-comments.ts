import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { COMMENT_URL } from './endpoint'
import { COMMENT_QUERY_KEY } from './queryKey'
import type { CommentType } from '../model'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 코스의 댓글 목록 조회
 */
export const useComments = (courseId: string) => {
  return useQuery({
    queryKey: COMMENT_QUERY_KEY.all(courseId),
    queryFn: () =>
      authFetch.get<CommentType[]>(COMMENT_URL.comments(courseId)),
  })
}

/**
 * 댓글 작성
 */
export const useCreateComment = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (contents: string) =>
      authFetch.post<CommentType>(COMMENT_URL.comments(courseId), { contents }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COMMENT_QUERY_KEY.all(courseId),
      })
    },
  })
}

/**
 * 댓글 수정
 */
export const useUpdateComment = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      commentId,
      contents,
    }: {
      commentId: string
      contents: string
    }) => authFetch.patch<CommentType>(COMMENT_URL.detail(commentId), { contents }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COMMENT_QUERY_KEY.all(courseId),
      })
    },
  })
}

/**
 * 댓글 삭제
 */
export const useDeleteComment = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentId: string) =>
      authFetch.delete(COMMENT_URL.detail(commentId)),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COMMENT_QUERY_KEY.all(courseId),
      })
    },
  })
}
