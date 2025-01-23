import type { WriterType } from '@/src/entities/user/type'
import type { CoursePlanPlaceType } from '@/src/entities/place/type'
import type { CategoryType } from '@/src/entities/category/type'

export type FavoriteRegionType = {
  id: number
  value: string
}

export type CourseType = {
  id: number
  title: string
  primary_region: string
  secondary_region: string
  categories: CategoryType[]
  contents: string
  views: number
  comments: number
  likes: number
  created_at: string
  places: CoursePlanPlaceType[]
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
