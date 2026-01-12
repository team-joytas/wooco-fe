import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { PLAN_URL } from './endpoint'
import { PLAN_QUERY_KEY } from './queryKey'
import type { PlanType, PlanPayloadType } from '../model'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 플랜 목록 조회
 */
export const usePlans = () => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.all,
    queryFn: () => authFetch.get<PlanType[]>(PLAN_URL.plans()),
    refetchOnMount: true,
  })
}

/**
 * 플랜 상세 조회
 */
export const usePlan = (planId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: PLAN_QUERY_KEY.detail(planId),
    queryFn: () => authFetch.get<PlanType>(PLAN_URL.detail(planId)),
    enabled,
  })
}

/**
 * 플랜 생성
 */
export const useCreatePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlanPayloadType) =>
      authFetch.post<PlanType>(PLAN_URL.plans(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}

/**
 * 플랜 수정
 */
export const useUpdatePlan = (planId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlanPayloadType) =>
      authFetch.patch<PlanType>(PLAN_URL.detail(planId), data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.detail(planId) })
      queryClient.invalidateQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}

/**
 * 플랜 삭제
 */
export const useDeletePlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (planId: string) => authFetch.delete(PLAN_URL.detail(planId)),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}
