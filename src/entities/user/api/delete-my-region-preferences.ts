import { customAxios } from '@/src/shared/axios'
import { USER_API } from './endpoint'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'

export const deleteMyLikeRegion = async (id: string) => {
  try {
    const response = await customAxios.delete(USER_API.deleteLikeRegions(id))
    return response.status === 200
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useDeleteMyLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteMyLikeRegion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myLikeRegions })
    },
  })
}
