import { customAxios } from '@/src/shared/api'
import { UserProfileType } from '../model'
import { USER_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { USER_API } from './endpoint'

export const getUser = async (id: string): Promise<UserProfileType> => {
  try {
    const response = await customAxios.get(USER_API.user(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(id),
    queryFn: () => getUser(id),
  })
}
