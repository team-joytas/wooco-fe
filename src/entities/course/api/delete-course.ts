import { customAxios } from '@/src/shared/api'
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

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.refetchQueries({
        predicate: (query) =>
          query.queryKey[0] === 'courses' ||
          query.queryKey[0] === 'userCourses',
      })
    },
  })
}
