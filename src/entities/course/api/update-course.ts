import { customAxios } from '@/src/shared/axios'
import { COURSE_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CoursePayloadType } from '../model'
import { COURSE_URL } from './endpoint'

export const patchCourse = async (
  id: string,
  coursePayload: CoursePayloadType
) => {
  try {
    const response = await customAxios.patch(
      COURSE_URL.detail(id),
      coursePayload
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateCourse = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) => patchCourse(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}
