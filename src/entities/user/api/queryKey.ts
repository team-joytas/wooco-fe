import { LikeRegion } from '@/src/shared/store/regionStore'

export const USER_QUERY_KEY = {
  all: ['users'] as const,
  detail: (id: string) => [...USER_QUERY_KEY.all, id] as const,
  myProfile: ['myProfile'] as const,
  myLikeRegions: (data: LikeRegion[]) => ['myLikeRegions', data] as const,
}
