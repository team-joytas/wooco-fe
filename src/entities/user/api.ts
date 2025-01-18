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

const favoriteRegions = [
  {
    id: 1,
    value: '강남',
  },
  {
    id: 2,
    value: '노원',
  },
  {
    id: 3,
    value: '강남',
  },
  {
    id: 4,
    value: '노원',
  },
  {
    id: 5,
    value: '강남',
  },
  {
    id: 6,
    value: '노원',
  },
]

export const getFavoriteRegions = async () => {
  return favoriteRegions
}
