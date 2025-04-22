import { customAxios } from '@/src/shared/api'
import {
  NOTIFICATION_URL,
  DeviceTokenType,
} from '@/src/entities/notification'
export const postDeviceToken = async (payload:DeviceTokenType) => {
  try {
    await customAxios.post(NOTIFICATION_URL.base,payload)
  } catch (error) {
    console.error(error)
    throw error
  }
}
