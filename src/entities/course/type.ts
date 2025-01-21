import type { PlaceType } from '@/src/entities/place/type'
import type { CommentMockType } from '@/src/entities/comment/type'
import type { WriterType } from '@/src/entities/user/type'
import type { CoursePlanPlaceType } from '@/src/entities/place/type'
import type { CategoryType } from '@/src/entities/category/type'

export type CourseMockType = {
  id: number
  user: {
    is_like: boolean
    profile_url: string
    name: string
  }
  name: string
  location?: string
  categories?: string[]
  content: string
  image?: string
  created_at: string
  updated_at: string
  planned_for?: string
  pass_from_create?: {
    type: string
    number: number
  }
  comments_info: {
    summary: {
      count: number
    }
    comments: CommentMockType[]
  }
  places: PlaceType[]
  likes: number
  views?: number
}

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
