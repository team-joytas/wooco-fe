import type { PlaceType } from '@/src/entities/place/type'

export type CourseType = {
  id: number
  user: {
    isLike: boolean
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
  likes: number
  comments_info: {
    summary: {
      count: number
    }
    comments: {
      id: number
      user: {
        id: number
        profile_url: string
        name: string
      }
      created_at: string
      content: string
    }[]
  }
  views: number
}

export type TrendingCourseType = {
  id: number
  createdAt: string
  profileImage: string
  userName: string
  title: string
  content: string
  places: PlaceType[]
  likes: number
  comments: number
  isLiked: boolean
}

export type FavoriteRegionType = {
  id: number
  value: string
}
