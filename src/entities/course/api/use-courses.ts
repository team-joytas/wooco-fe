import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authFetch } from '@/src/shared/api'
import { COURSE_URL } from './endpoint'
import { COURSE_QUERY_KEY } from './queryKey'
import type { CourseType, CoursePayloadType } from '../model'

// ============================================================================
// Types
// ============================================================================
export interface CoursesParams {
  sort?: 'RECENT' | 'POPULAR'
  limit?: number
  primary_region?: string
  secondary_region?: string
  category?: string
  [key: string]: string | number | undefined
}

// ============================================================================
// Hooks
// ============================================================================

/**
 * 코스 목록 조회
 */
export const useCourses = (params: CoursesParams = {}) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.all(params),
    queryFn: () =>
      authFetch.get<CourseType[]>(COURSE_URL.courses(), { params }),
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  })
}

/**
 * 코스 상세 조회
 */
export const useCourse = (courseId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.detail(courseId),
    queryFn: () => authFetch.get<CourseType>(COURSE_URL.detail(courseId)),
    enabled,
  })
}

/**
 * 코스 생성
 */
export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) =>
      authFetch.post<CourseType>(COURSE_URL.courses(), data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          (query.queryKey[0] === 'courses' && query.queryKey[1] === 'RECENT') ||
          query.queryKey[0] === 'userCourses',
      })
    },
  })
}

/**
 * 코스 수정
 */
export const useUpdateCourse = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) =>
      authFetch.patch<CourseType>(COURSE_URL.detail(courseId), data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COURSE_QUERY_KEY.detail(courseId),
      })
    },
  })
}

/**
 * 코스 삭제
 */
export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: string) =>
      authFetch.delete(COURSE_URL.detail(courseId)),
    onSuccess: () => {
      queryClient.refetchQueries({
        predicate: (query) =>
          (query.queryKey[0] === 'courses' && query.queryKey[1] === 'RECENT') ||
          query.queryKey[0] === 'userCourses',
      })
    },
  })
}

/**
 * 코스 좋아요
 */
export const useLikeCourse = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authFetch.post(COURSE_URL.like(courseId)),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COURSE_QUERY_KEY.detail(courseId),
      })
    },
  })
}

/**
 * 코스 좋아요 취소
 */
export const useUnlikeCourse = (courseId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => authFetch.delete(COURSE_URL.like(courseId)),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: COURSE_QUERY_KEY.detail(courseId),
      })
    },
  })
}
