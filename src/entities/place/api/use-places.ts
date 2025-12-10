import { useQuery, useMutation } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { PLACE_URL } from './endpoint'
import { PLACE_QUERY_KEY } from './queryKey'
import type {
  PlaceType,
  PlaceAggregationType,
  PlaceSearchType,
  KakaoToServerPlaceType,
} from '../model'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 장소 상세 조회
 */
export const usePlace = (placeId: string) => {
  return useQuery({
    queryKey: PLACE_QUERY_KEY.detail(placeId),
    queryFn: () => authFetch.get<PlaceType>(PLACE_URL.detail(placeId)),
  })
}

/**
 * 장소 통계 조회 (리뷰 포함)
 */
export const usePlaceAggregation = (placeId: string) => {
  return useQuery({
    queryKey: PLACE_QUERY_KEY.aggregation(placeId),
    queryFn: () =>
      authFetch.get<PlaceAggregationType>(PLACE_URL.aggregation(placeId)),
  })
}

/**
 * 장소 생성 (카카오 검색 결과를 서버에 등록)
 */
export const useCreatePlace = () => {
  return useMutation({
    mutationFn: (place: PlaceSearchType) => {
      const payload: KakaoToServerPlaceType = {
        name: place.place_name,
        latitude: place.y,
        longitude: place.x,
        address: place.address_name,
        kakao_place_id: place.id,
        phone_number: place.phone,
      }
      return authFetch.post<PlaceType>(PLACE_URL.base, payload)
    },
  })
}

// ============================================================================
// Non-hook API functions (외부 API 호출)
// ============================================================================

/**
 * 카카오 장소 검색
 */
export const searchPlacesFromKakao = async (region: string, keyword: string) => {
  const response = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${region} ${keyword}`,
    {
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  )
  return response.json()
}

// Alias for backward compatibility
export const getPlaceSearchResult = searchPlacesFromKakao

/**
 * 장소 생성 (카카오 검색 결과를 서버에 등록) - non-hook 버전
 */
export const postPlace = async (place: PlaceSearchType): Promise<PlaceType> => {
  const payload: KakaoToServerPlaceType = {
    name: place.place_name,
    latitude: place.y,
    longitude: place.x,
    address: place.address_name,
    kakao_place_id: place.id,
    phone_number: place.phone,
  }
  return authFetch.post<PlaceType>(PLACE_URL.base, payload)
}
