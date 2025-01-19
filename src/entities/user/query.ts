import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { getUser, updateUser, getMyProfile } from '@/src/entities/user/api'
import type { UserProfileType, UpdateUserType } from '@/src/entities/user/type'

export const USER_QUERY_KEY = {
  all: ['users'] as const,
  detail: (id: string) => [...USER_QUERY_KEY.all, id] as const,
  myProfile: ['myProfile'] as const,
}

export const useGetMyProfile = (): UseQueryResult<UserProfileType> => {
  return useQuery({
    queryKey: USER_QUERY_KEY.myProfile,
    queryFn: () => getMyProfile(),
  })
}

export const useGetUser = (id: string): UseQueryResult<UserProfileType> => {
  return useQuery({
    queryKey: USER_QUERY_KEY.detail(id),
    queryFn: () => getUser(id),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserType) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.myProfile })
    },
  })
}
