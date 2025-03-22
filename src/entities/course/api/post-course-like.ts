import { customAxios } from '@/src/shared/axios'
import { COURSE_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COURSE_URL } from './endpoint'

export const postCourseLike = async (id: string) => {
  try {
    const response = await customAxios.post(COURSE_URL.like(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const usePostCourseLike = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postCourseLike(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}
