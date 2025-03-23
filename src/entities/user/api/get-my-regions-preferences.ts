import { customAxios } from '@/src/shared/api'
import { UserLikeRegionType } from '../model'
import { USER_API } from './endpoint'
import { LikeRegion } from '@/src/shared/store/regionStore'
import { useQuery } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'

export const getMyLikeRegions = async (): Promise<UserLikeRegionType[]> => {
  try {
    const response = await customAxios.get(USER_API.likeRegions())
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetMyLikeRegions = (data: LikeRegion[]) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myLikeRegions(data),
    queryFn: () => getMyLikeRegions(),
  })
}
