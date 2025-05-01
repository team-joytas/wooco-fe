import { LikeRegion } from '@/src/shared/store/regionStore'

export const USER_QUERY_KEY = {
  all: ['users'] as const,
  detail: (id: string) => [...USER_QUERY_KEY.all, id] as const,
  myProfile: (token: string) => ['myProfile', token] as const,
  myLikeRegions: (data: LikeRegion[]) => ['myLikeRegions', data] as const,
  courses: (id: string, order?: 'RECENT' | 'POPULAR') =>
    ['userCourses', id, order] as const,
  likeCourse: (params: {
    id: string
    order?: 'RECENT' | 'POPULAR'
    category?: string
  }) => ['likeCourse', params.id, params.order, params.category] as const,
  myPlaceReviews: ['myPlaceReviews'] as const,
}
