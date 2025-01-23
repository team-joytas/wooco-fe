import { customAxios } from '@/src/shared/axios'

export const getPlans = async () => {
  try {
    const response = await customAxios.get('/plans')
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getPlan = async (id: string) => {
  try {
    const response = await customAxios.get(`/plans/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
