import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getPlan, getPlans } from '@/src/entities/plan/api'
import { PlanType } from '@/src/entities/plan/type'

export const PLAN_QUERY_KEY = {
  all: ['plans'] as const,
  detail: (id: string) => ['plan', id] as const,
}

export const useGetPlans = () => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.all,
    queryFn: () => getPlans(),
  })
}

export const useGetPlan = (id: string): UseQueryResult<PlanType> => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.detail(id),
    queryFn: () => getPlan(id),
  })
}
