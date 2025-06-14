import { customAxios } from '@/src/shared/api'
import { COURSE_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COURSE_URL } from './endpoint'

export const deleteCourseLike = async (id: string) => {
  try {
    const response = await customAxios.delete(COURSE_URL.like(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useDeleteCourseLike = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourseLike(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}
