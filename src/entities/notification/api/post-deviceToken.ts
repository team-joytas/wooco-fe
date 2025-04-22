import { customAxios } from '@/src/shared/api'
import {
  NOTIFICATION_URL,
  DeviceTokenType,
} from '@/src/entities/notification'
export const postDeviceToken = async (payload:DeviceTokenType) => {
  try {
    const response = await customAxios.post(NOTIFICATION_URL.base,payload)
    console.log(response.data)
  } catch (error) {
    console.error(error)
    throw error
  }
}
