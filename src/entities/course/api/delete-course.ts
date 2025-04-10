import { customAxios } from '@/src/shared/api'
import { COURSE_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { COURSE_URL } from './endpoint'

export const deleteCourse = async (id: string) => {
  try {
    const response = await customAxios.delete(COURSE_URL.detail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useDeleteCourse = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}
