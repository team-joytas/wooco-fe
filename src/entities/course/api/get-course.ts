import { customAxios } from '@/src/shared/axios'
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

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.detail(id),
    queryFn: () => getCourse(id),
  })
}
