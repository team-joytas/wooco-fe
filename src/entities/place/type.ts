export type PlaceType = {
  id: number
  image: string[]
  place_name: string
  category_name?: string
  address_name: string
  road_address_name?: string
  place_url?: string
  phone?: string
  distance?: string
  x: string
  y: string
  star_rate?: number | string
  created_at?: string
  tags?: string[]
  content?: string
}

export type SeoulType = {
  value: string
  label: string
  children?: SeoulType[]
}

export type CoursePlaceType = {
  order: number
  id: number
  name: string
  latitude: string
  longitude: string
  address: string
  kakao_map_place_id: number
  average_rating: number
  review_count: number
  images?: string[]
}
