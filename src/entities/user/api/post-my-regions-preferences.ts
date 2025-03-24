import { customAxios } from '@/src/shared/axios'
import { USER_API } from './endpoint'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_QUERY_KEY } from './queryKey'

export const postMyLikeRegion = async (data: {
  primary_region: string
  secondary_region: string
}) => {
  try {
    const response = await customAxios.post(USER_API.likeRegions(), data)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const usePostMyLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { primary_region: string; secondary_region: string }) =>
      postMyLikeRegion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myLikeRegions })
    },
  })
}
