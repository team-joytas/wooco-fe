import { customAxios } from '@/src/shared/api'
import { CourseType } from '../model'
import { COURSE_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { COURSE_URL } from './endpoint'

export const getCourse = async (id: string): Promise<CourseType> => {
  try {
    const response = await customAxios.get(COURSE_URL.detail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetCourse = (course_id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.detail(course_id),
    queryFn: () => getCourse(course_id),
    enabled,
  })
}
