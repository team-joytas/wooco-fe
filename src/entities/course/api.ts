import { customAxios } from '@/src/shared/axios'
import type { CourseType, CoursePayloadType } from '@/src/entities/course/type'

export const getCourse = async (id: string): Promise<CourseType> => {
  try {
    const response = await customAxios.get(`/courses/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCourses = async ({
  sort = 'recent',
  limit,
  primary_region,
  secondary_region,
  category,
}: {
  sort?: 'recent' | 'popular'
  limit?: number
  primary_region?: string
  secondary_region?: string
  category?: string
}) => {
  try {
    const response = await customAxios.get('/courses', {
      params: {
        sort,
        limit,
        primary_region,
        secondary_region,
        category,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserCourses = async (
  id: string,
  order?: 'recent' | 'popular'
) => {
  try {
    const response = await customAxios.get(`/courses/users/${id}`, {
      params: {
        order,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postCourse = async (coursePayload: CoursePayloadType) => {
  try {
    const response = await customAxios.post('/courses', coursePayload)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteCourse = async (id: string) => {
  try {
    const response = await customAxios.delete(`/courses/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getMyLikeCourses = async ({
  id,
  limit,
}: {
  id: string
  limit?: number
}) => {
  try {
    const response = await customAxios.get(`/courses/users/${id}/like`, {
      params: {
        limit,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateCourse = async (
  id: string,
  coursePayload: CoursePayloadType
) => {
  try {
    const response = await customAxios.patch(`/courses/${id}`, coursePayload)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postCourseLike = async (id: string) => {
  try {
    const response = await customAxios.post(`/courses/${id}/like`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteCourseLike = async (id: string) => {
  try {
    const response = await customAxios.delete(`/courses/${id}/like`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
