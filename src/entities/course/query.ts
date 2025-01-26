import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import {
  postCourse,
  updateCourse,
  getCourse,
  getCourses,
  getMyLikeCourse,
  getUserCourses,
  postCourseLike,
  deleteCourseLike,
  deleteCourse,
} from '@/src/entities/course/api'
import type { CoursePayloadType, CourseType } from '@/src/entities/course/type'

export const COURSE_QUERY_KEY = {
  all: ['courses'] as const,
  detail: (id: string) => ['course', id] as const,
  myLikeCourse: ['myLikeCourse'] as const,
  userCourses: (id: string, order?: 'recent' | 'popular') =>
    ['userCourses', id, order] as const,
}

export const useGetCourse = (id: string): UseQueryResult<CourseType> => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.detail(id),
    queryFn: () => getCourse(id),
  })
}

export const useGetCourses = (params: {
  sort?: 'recent' | 'popular'
  limit?: number
  primary_region?: string
  secondary_region?: string
}) => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.all,
    queryFn: () => getCourses(params),
  })
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) => postCourse(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.all })
    },
  })
}

export const useUpdateCourse = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CoursePayloadType) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}

export const useGetMyLikeCourse = (params: {
  id: string
  limit?: number
}): UseQueryResult<CourseType[]> => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.myLikeCourse,
    queryFn: () => getMyLikeCourse(params),
  })
}

export const useGetUserCourses = (
  id: string,
  order?: 'recent' | 'popular'
): UseQueryResult<CourseType[]> => {
  return useQuery({
    queryKey: COURSE_QUERY_KEY.userCourses(id, order),
    queryFn: () => getUserCourses(id, order),
  })
}

export const usePostCourseLike = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => postCourseLike(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}

export const useDeleteCourseLike = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourseLike(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.detail(id) })
    },
  })
}

export const useDeleteCourse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCourse(id),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: COURSE_QUERY_KEY.all })
    },
  })
}
