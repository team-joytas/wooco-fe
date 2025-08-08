import { customAxios } from '@/src/shared/api'
import { useQuery } from '@tanstack/react-query'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'
import { PlaceAggregationType } from '../model'

export const getPlaceAggregation = async (
  id: string
): Promise<PlaceAggregationType> => {
  try {
    const response = await customAxios.get(PLACE_URL.aggregation(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetPlaceAggregation = (place_id: string) => {
  return useQuery({
    queryKey: PLACE_QUERY_KEY.aggregation(place_id),
    queryFn: () => getPlaceAggregation(place_id),
  })
}
