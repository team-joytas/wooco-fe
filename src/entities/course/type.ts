import type { PlaceType } from '@/src/entities/place/type'
import type { CommentType } from '@/src/entities/comment/type'

export type CourseType = {
  id: number
  user: {
    is_like: boolean
    profile_url: string
    name: string
  }
  name: string
  location: string
  categories: string[]
  content: string
  image: string
  created_at: string
  updated_at: string
  planned_for: string
  pass_from_create: {
    type: string
    number: number
  }
  comments_info: {
    summary: {
      count: number
    }
    comments: CommentType[]
  }
  places: PlaceType[]
  likes: number
  views: number
  is_liked: boolean
}

export type FavoriteRegionType = {
  id: number
  value: string
}
