import { customAxios } from '@/src/shared/api'
import { UserSummaryType } from '../model'
import { USER_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { USER_API } from './endpoint'

export const getUserSummary = async (id: string): Promise<UserSummaryType> => {
  try {
    const response = await customAxios.get(USER_API.summary(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetUserSummary = (id: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(id),
    queryFn: () => getUserSummary(id),
  })
}
