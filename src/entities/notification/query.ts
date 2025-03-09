import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getNotifications, readNotification } from './api'

export const NOTIFICATION_QUERY_KEY = {
  all: ['notifications'] as const,
  read: (id: string) => ['notification', id] as const,
}

export const useGetNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEY.all,
    queryFn: () => getNotifications(),
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

export const usePatchReadNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY.read })
    },
  })
}
