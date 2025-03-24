import { customAxios } from '@/src/shared/api'
import {
  NOTIFICATION_URL,
  NOTIFICATION_QUERY_KEY,
} from '@/src/entities/notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const patchNotification = async (id: string) => {
  try {
    await customAxios.patch(NOTIFICATION_URL.detail(id))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useReadNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => patchNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY.read })
    },
  })
}
