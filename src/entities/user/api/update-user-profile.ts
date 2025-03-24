import { customAxios } from '@/src/shared/axios'
import { UpdateUserType } from '../model'
import { USER_QUERY_KEY } from './queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { USER_API } from './endpoint'
import useUserStore from '@/src/shared/store/userStore'

export const patchUser = async (data: UpdateUserType) => {
  try {
    const response = await customAxios.patch(USER_API.profile(), data)
    return response.status === 200
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const updateStateUser = useUserStore((state) => state.updateStateUser)

  return useMutation({
    mutationFn: (data: UpdateUserType) => patchUser(data),
    onSuccess: (_, data) => {
      updateStateUser({
        name: data.name,
        profile_url: '',
        description: '',
      })
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myProfile })
    },
  })
}
