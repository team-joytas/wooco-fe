import { customAxios } from '@/src/shared/api'
import { COURSE_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CoursePayloadType } from '../model'
import { COURSE_URL } from './endpoint'

export const postCourse = async (coursePayload: CoursePayloadType) => {
  try {
    const response = await customAxios.post(COURSE_URL.courses(), coursePayload)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const usePostCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) => postCourse(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.all })
    },
  })
}
