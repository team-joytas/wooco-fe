import {
  KakaoToServerPlaceType,
  PlaceSearchType,
} from '@/src/entities/place/type'
import { customAxios } from '@/src/shared/axios'

const seoulData = [
  {
    value: '서울',
    label: '서울특별시',
    children: [
      { value: '강남', label: '강남구' },
      { value: '강동', label: '강동구' },
      { value: '강북', label: '강북구' },
      { value: '강서', label: '강서구' },
      { value: '관악', label: '관악구' },
      { value: '광진', label: '광진구' },
      { value: '구로', label: '구로구' },
      { value: '금천', label: '금천구' },
      { value: '노원', label: '노원구' },
      { value: '도봉', label: '도봉구' },
      { value: '동대문', label: '동대문구' },
      { value: '동작', label: '동작구' },
      { value: '마포', label: '마포구' },
      { value: '서대문', label: '서대문구' },
      { value: '서초', label: '서초구' },
      { value: '성동', label: '성동구' },
      { value: '성북', label: '성북구' },
      { value: '송파', label: '송파구' },
      { value: '양천', label: '양천구' },
      { value: '영등포', label: '영등포구' },
      { value: '용산', label: '용산구' },
      { value: '은평', label: '은평구' },
      { value: '종로', label: '종로구' },
      { value: '중구', label: '중구' },
      { value: '중랑', label: '중랑구' },
    ],
  },
]

export const getSeoulData = () => {
  return seoulData
}

export const postPlace = async (payload: PlaceSearchType) => {
  const placePayload: KakaoToServerPlaceType = {
    name: payload.place_name,
    latitude: payload.y,
    longitude: payload.x,
    address: payload.address_name,
    kakao_map_place_id: payload.id,
    phone_number: payload.phone,
  }
  const response = await customAxios.post('/places', placePayload)
  return response.data
}

export const getPlace = async (id: string) => {
  try {
    const response = await customAxios.get(`/places/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPlaceReviews = async (id: string) => {
  try {
    const response = await customAxios.get(`/reviews/places/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deletePlaceReview = async (id: string) => {
  try {
    const response = await customAxios.delete(`/reviews/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
