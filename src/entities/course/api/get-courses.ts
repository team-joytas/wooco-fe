import { customAxios } from '@/src/shared/api'
import { COURSE_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { COURSE_URL } from './endpoint'

export const getCourses = async ({
  sort = 'RECENT',
  limit,
  primary_region,
  secondary_region,
  category,
}: {
  sort?: 'RECENT' | 'POPULAR'
  limit?: number
  primary_region?: string
  secondary_region?: string
  category?: string
}) => {
  try {
    const response = await customAxios.get(COURSE_URL.courses(), {
      params: {
        sort,
        limit,
        primary_region,
        secondary_region,
        category,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetCourses = (params: {
  sort?: 'RECENT' | 'POPULAR'
  limit?: number
  primary_region?: string
  secondary_region?: string
  category?: string
}) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.all(params),
    queryFn: () => getCourses(params),
  })
}
