import type { WriterType } from '@/src/entities/user/model/type'
import type { CoursePlaceType } from '@/src/entities/place'

export type FavoriteRegionType = {
  id: number
  value: string
}

export type CourseType = {
  id: number
  title: string
  primary_region: string
  secondary_region: string
  categories: string[]
  contents: string
  views: number
  comments: number
  likes: number
  created_at: string
  places: CoursePlaceType[]
  writer: WriterType
  is_liked: boolean
  visit_date: string
}

export type CoursePayloadType = {
  primary_region: string
  secondary_region: string
  categories: string[]
  title: string
  contents: string
  place_ids: string[]
  visit_date: string
}

export type CourseInputType = {
  title: string
  primary_region: string
  secondary_region: string
  categories: string[]
  contents: string
  places: CoursePlaceType[]
  visit_date: string
}
