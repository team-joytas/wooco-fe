import { PlaceReviewDetailType } from '../reviews'

export type PlaceType = {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  kakao_place_id: string
  average_rating: number
  review_count: number
  phone_number: string
  thumbnail_url: string
  place_one_line_review_stats: PlaceReviewStatsType[]
}

export type PlaceAggregationType = {
  place: PlaceType
  place_reviews: PlaceReviewDetailType[]
}

export type PlaceReviewStatsType = {
  contents: string
  count: number
}

export type PlaceSearchType = {
  id: string
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

export type SeoulType = {
  value: string
  label: string
  children?: SeoulType[]
}

export type CoursePlaceType = {
  id: string
  order: number
  name: string
  latitude: string
  longitude: string
  address: string
  kakao_place_id: string
  average_rating?: number
  review_count?: number
  thumbnail_url: string
}

export type KakaoToServerPlaceType = {
  name: string
  latitude: string
  longitude: string
  address: string
  kakao_place_id: string
  phone_number: string
}

export type KakaoPlaceType = {
  name: string
  latitude: number
  longitude: number
}
