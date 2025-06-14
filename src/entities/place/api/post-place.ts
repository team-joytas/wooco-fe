import { customAxios } from '@/src/shared/api'
import { KakaoToServerPlaceType, PlaceSearchType } from '../model'
import { PLACE_URL } from './endpoint'

export const postPlace = async (payload: PlaceSearchType) => {
  const placePayload: KakaoToServerPlaceType = {
    name: payload.place_name,
    latitude: payload.y,
    longitude: payload.x,
    address: payload.address_name,
    kakao_place_id: payload.id,
    phone_number: payload.phone,
  }
  const response = await customAxios.post(PLACE_URL.base, placePayload)
  return response.data.results
}
