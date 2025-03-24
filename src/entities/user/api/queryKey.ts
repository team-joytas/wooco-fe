import { LikeRegion } from '@/src/shared/store/regionStore'

export const USER_QUERY_KEY = {
  all: ['users'] as const,
  detail: (id: string) => [...USER_QUERY_KEY.all, id] as const,
  myProfile: ['myProfile'] as const,
  myLikeRegions: (data: LikeRegion[]) => ['myLikeRegions', data] as const,
  courses: (id: string, order?: 'RECENT' | 'POPULAR') =>
    ['userCourses', id, order] as const,
  likeCourse: (params: { id: string; order?: 'RECENT' | 'POPULAR' }) =>
    ['likeCourse', params.id, params.order] as const,
  myPlaceReviews: ['myPlaceReviews'] as const,
}
