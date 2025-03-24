import { customAxios } from '@/src/shared/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PLAN_QUERY_KEY } from './queryKey'
import { PLAN_URL } from './endpoint'

export const deletePlan = async (id: string) => {
  try {
    const response = await customAxios.delete(PLAN_URL.detail(id))
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
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
