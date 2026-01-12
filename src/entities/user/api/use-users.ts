import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { useAuth } from '@/src/shared/providers'
import useUserStore from '@/src/shared/store/userStore'
import { USER_API } from './endpoint'
import { USER_QUERY_KEY } from './queryKey'
import type {
  UserProfileType,
  UserSummaryType,
  UpdateUserType,
  UserLikeRegionType,
} from '../model'
import type { CourseType } from '../../course'
import type { UserPlaceReviewType } from '../../place'
import type { LikeRegion } from '@/src/shared/store/regionStore'

// ============================================================================
// Hooks
// ============================================================================

/**
 * 내 프로필 조회
 */
export const useMyProfile = () => {
  const { token } = useAuth()

  return useQuery({
    queryKey: USER_QUERY_KEY.myProfile(token || ''),
    queryFn: () => authFetch.get<UserProfileType>(USER_API.me()),
    enabled: !!token,
  })
}

/**
 * 유저 프로필 조회
 */
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(userId),
    queryFn: () => authFetch.get<UserProfileType>(USER_API.user(userId)),
  })
}

/**
 * 유저 요약 정보 조회
 */
export const useUserSummary = (userId: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(userId),
    queryFn: () => authFetch.get<UserSummaryType>(USER_API.summary(userId)),
    gcTime: 0,
  })
}

/**
 * 프로필 수정
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const updateStateUser = useUserStore((state) => state.updateStateUser)
  const { token } = useAuth()

  return useMutation({
    mutationFn: (data: UpdateUserType) =>
      authFetch.patch<boolean>(USER_API.profile(), data),
    onSuccess: (_, data) => {
      updateStateUser({
        name: data.name,
        profile_url: '',
        description: '',
      })
      if (token) {
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEY.myProfile(token),
        })
      }
    },
  })
}

/**
 * 유저가 작성한 코스 목록 조회
 */
export const useUserCourses = (userId: string, sort?: 'RECENT' | 'POPULAR') => {
  return useQuery({
    queryKey: USER_QUERY_KEY.courses(userId, sort),
    queryFn: () =>
      authFetch.get<CourseType[]>(USER_API.courses(userId), {
        params: { sort },
      }),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  })
}

/**
 * 유저가 좋아요한 코스 목록 조회
 */
export const useUserLikeCourses = (params: {
  id: string
  limit?: number
  sort?: 'RECENT' | 'POPULAR'
  category?: string
}) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.likeCourse(params),
    queryFn: () =>
      authFetch.get<CourseType[]>(USER_API.likeCourses(params.id), {
        params: {
          limit: params.limit,
          sort: params.sort,
          category: params.category,
        },
      }),
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  })
}

/**
 * 내 장소 리뷰 목록 조회
 */
export const useMyPlaceReviews = (userId: string) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myPlaceReviews,
    queryFn: () =>
      authFetch.get<UserPlaceReviewType[]>(USER_API.placeReviews(userId)),
  })
}

/**
 * 내 관심 지역 목록 조회
 */
export const useMyLikeRegions = (data: LikeRegion[]) => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myLikeRegions(data),
    queryFn: () =>
      authFetch.get<UserLikeRegionType[]>(USER_API.likeRegions()),
  })
}

/**
 * 관심 지역 추가
 */
export const useAddLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { primary_region: string; secondary_region: string }) =>
      authFetch.post<{ id: string }>(USER_API.likeRegions(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.all })
    },
  })
}

/**
 * 관심 지역 삭제
 */
export const useRemoveLikeRegion = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (regionId: string) =>
      authFetch.delete(USER_API.deleteLikeRegions(regionId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.all })
    },
  })
}
