import { customAxios } from '@/src/shared/api'
import { UserProfileType } from '../model'
import { USER_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { USER_API } from './endpoint'

export const getMyProfile = async (): Promise<UserProfileType> => {
  try {
    const response = await customAxios.get(USER_API.me())
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myProfile,
    queryFn: () => getMyProfile(),
  })
}
