import { customAxios } from '@/src/shared/axios'
import { USER_API } from './endpoint'
import { useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'
import { CourseType } from '../../course'

export const getUserCourses = async (
  id: string,
  order?: 'RECENT' | 'POPULAR'
): Promise<CourseType[]> => {
  try {
    const response = await customAxios.get(USER_API.courses(id), {
      params: {
        sort: order,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetUserCourses = (id: string, order?: 'RECENT' | 'POPULAR') => {
  return useQuery({
    queryKey: USER_QUERY_KEY.courses(id, order),
    queryFn: () => getUserCourses(id, order),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}
