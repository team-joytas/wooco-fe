import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { PlanPayloadType, PlanType } from '@/src/entities/plan/type'
import {
  deletePlan,
  getPlan,
  getPlans,
  postPlan,
  updatePlan,
} from '@/src/entities/plan/api'

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

export const useCreatePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlanPayloadType) => postPlan(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}

export const useUpdatePlan = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlanPayloadType) => updatePlan(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.detail(id) })
    },
  })
}

export const useDeletePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}
