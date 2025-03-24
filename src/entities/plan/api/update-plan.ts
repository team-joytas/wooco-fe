import { customAxios } from '@/src/shared/axios'
import { PlanPayloadType } from '../model'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLAN_QUERY_KEY } from './queryKey'
import { PLAN_URL } from './endpoint'

export const updatePlan = async (id: string, payload: PlanPayloadType) => {
  try {
    const response = await customAxios.patch(PLAN_URL.detail(id), payload)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
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
