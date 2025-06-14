import { customAxios } from '@/src/shared/api'
import { PLAN_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { PLAN_URL } from './endpoint'

export const getPlan = async (id: string) => {
  try {
    const response = await customAxios.get(PLAN_URL.detail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetPlan = (
  id: string,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.detail(id),
    queryFn: () => getPlan(id),
    enabled
  })
}
