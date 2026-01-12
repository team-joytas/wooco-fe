import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { NOTIFICATION_URL } from './endpoint'
import { NOTIFICATION_QUERY_KEY } from './queryKey'
import type { NotificationType, DeviceTokenType } from '../model'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 알림 목록 조회
 */
export const useNotifications = () => {
  return useQuery({
    queryKey: NOTIFICATION_QUERY_KEY.all,
    queryFn: () => authFetch.get<NotificationType[]>(NOTIFICATION_URL.base),
    refetchOnWindowFocus: true,
    staleTime: 0,
  })
}

/**
 * 알림 읽음 처리
 */
export const useReadNotification = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: string) =>
      authFetch.patch(NOTIFICATION_URL.detail(notificationId)),
    onSuccess: (_, notificationId) => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY.read(notificationId),
      })
    },
  })
}

/**
 * 디바이스 토큰 등록 (FCM)
 */
export const useRegisterDeviceToken = () => {
  return useMutation({
    mutationFn: (payload: DeviceTokenType) =>
      authFetch.post(NOTIFICATION_URL.base, payload),
  })
}

// ============================================================================
// Non-hook API functions
// ============================================================================

/**
 * 디바이스 토큰 등록 (FCM) - 비 hook 버전
 */
export const registerDeviceToken = async (payload: DeviceTokenType) => {
  return authFetch.post(NOTIFICATION_URL.base, payload)
}
