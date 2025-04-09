import { customAxios } from '@/src/shared/api'
import { USER_API } from './endpoint'
import { useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'

export const getMyLikeCourses = async ({
  id,
  limit,
  sort,
  category,
}: {
  id: string
  limit?: number
  sort?: 'RECENT' | 'POPULAR'
  category?: string
}) => {
  try {
    const response = await customAxios.get(USER_API.likeCourses(id), {
      params: {
        limit,
        sort,
        category,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetLikeCourses = (params: {
  id: string
  limit?: number
  sort?: 'RECENT' | 'POPULAR'
  category?: string
}) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.likeCourse(params),
    queryFn: () => getMyLikeCourses(params),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
}
