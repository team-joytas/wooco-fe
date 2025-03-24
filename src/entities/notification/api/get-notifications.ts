import { customAxios } from '@/src/shared/axios'
import {
  NotificationType,
  NOTIFICATION_URL,
  NOTIFICATION_QUERY_KEY,
} from '@/src/entities/notification'
import { useQuery } from '@tanstack/react-query'

export const getNotifications = async (): Promise<NotificationType[]> => {
  try {
    const response = await customAxios.get(NOTIFICATION_URL.base)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useGetNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEY.all,
    queryFn: () => getNotifications(),
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}
