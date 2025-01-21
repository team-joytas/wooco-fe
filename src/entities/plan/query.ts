import { useQuery } from '@tanstack/react-query'
import { getPlans } from './api'

export const PLAN_QUERY_KEY = {
  all: ['plans'] as const,
}

export const useGetPlans = () => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.all,
    queryFn: () => getPlans(),
  })
}
