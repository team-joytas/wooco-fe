import { WriterType } from '@/src/entities/user'

export interface PlaceReviewType {
  id: string
  rating: number
  contents: string
  created_at: string
  one_line_reviews: string[]
  image_urls: string[]
}

export interface UserPlaceReviewType extends PlaceReviewType {
  place_id: string
  place_name: string
}

export interface PlaceReviewDetailType extends PlaceReviewType {
  writer: WriterType
}

export interface ReviewPayloadType {
  rating: number
  contents: string
  one_line_reviews: string[]
  image_urls: string[]
}
