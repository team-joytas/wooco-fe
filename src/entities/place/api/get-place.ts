import { customAxios } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'
import { PlaceType } from '../model'

export const getPlace = async (id: string): Promise<PlaceType> => {
  try {
    const response = await customAxios.get(PLACE_URL.detail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetPlace = (id: string) => {
  return useQuery({
    queryKey: PLACE_QUERY_KEY.detail(id),
    queryFn: () => getPlace(id),
  })
}
