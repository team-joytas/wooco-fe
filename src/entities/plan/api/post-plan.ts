import { customAxios } from '@/src/shared/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlanPayloadType } from '../model'
import { PLAN_QUERY_KEY } from './queryKey'
import { PLAN_URL } from './endpoint'

export const postPlan = async (payload: PlanPayloadType) => {
  try {
    const response = await customAxios.post(PLAN_URL.plans(), payload)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const usePostPlan = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PlanPayloadType) => postPlan(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: PLAN_QUERY_KEY.all })
    },
  })
}
