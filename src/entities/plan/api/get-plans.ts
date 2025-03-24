import { customAxios } from '@/src/shared/axios'
import { PLAN_QUERY_KEY } from './queryKey'
import { useQuery } from '@tanstack/react-query'
import { PLAN_URL } from './endpoint'

export const getPlans = async () => {
  try {
    const response = await customAxios.get(PLAN_URL.plans())
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const useGetPlans = () => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.all,
    queryFn: () => getPlans(),
  })
}
