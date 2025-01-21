export type PlaceType = {
  id: number
  image: string[]
  place_name: string
  address_name: string
  x: string
  y: string
  category_name?: string
  road_address_name?: string
  place_url?: string
  phone?: string
  distance?: string
  star_rate?: number | string
  created_at?: string
  tags?: string[]
  content?: string
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
  kakao_map_place_id: string
  average_rating?: number
  review_count?: number
  thumbnail_url: string
}

export type KakaoToServerPlaceType = {
  name: string
  latitude: string
  longitude: string
  address: string
  kakao_map_place_id: string
  phone_number: string
}
