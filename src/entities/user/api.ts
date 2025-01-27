import { customAxios } from '@/src/shared/axios'
import type { UpdateUserType, UserProfileType } from '@/src/entities/user/type'

export const getMyProfile = async (): Promise<UserProfileType> => {
  try {
    const url = `/users/me`
    const response = await customAxios.get(url)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUser = async (id: string): Promise<UserProfileType> => {
  try {
    const url = `/users/${id}`
    const response = await customAxios.get(url)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateUser = async (data: UpdateUserType) => {
  try {
    const response = await customAxios.patch('/users/profile', data)
    return response.status === 200
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getMyLikeRegions = async () => {
  try {
    const response = await customAxios.get(`/regions/preferences`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postMyLikeRegion = async (data: {
  primary_region: string
  secondary_region: string
}) => {
  try {
    const response = await customAxios.post(`/regions/preferences`, data)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteMyLikeRegion = async (id: string) => {
  try {
    const response = await customAxios.delete(`/regions/preferences/${id}`)
    return response.status === 200
  } catch (error) {
    console.error(error)
    throw error
  }
}
