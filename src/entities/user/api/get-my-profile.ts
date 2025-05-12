import { customAxios } from '@/src/shared/api'
import { UserProfileType } from '../model'
import { USER_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { USER_API } from './endpoint'
import { useAuth } from '@/src/shared/provider'

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
  const { token } = useAuth()

  return useQuery({
    queryKey: USER_QUERY_KEY.myProfile(token || ''),
    queryFn: () => getMyProfile(),
    enabled: !!token,
  })
}
