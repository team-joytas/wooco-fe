import { WriterType } from '../user/type'

export type PlaceType = {
  id: number
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

export type PlaceReviewStatsType = {
  contents: string
  count: number
}

export type PlaceReviewType = {
  id: number
  writer: WriterType
  rating: number
  contents: string
  created_at: string
  one_line_reviews: PlaceReviewKeywordType[]
  image_urls: string[]
}

export type PlaceReviewKeywordType = {
  contents: string
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

export type CoursePlanPlaceType = {
  id: number
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

export interface ReviewPayloadType {
  rating: number
  contents: string
  one_line_reviews: string[]
  image_urls: string[]
}