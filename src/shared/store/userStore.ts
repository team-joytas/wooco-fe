import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfileType } from '@/src/entities/user'

interface UserState {
  user: UserProfileType | null
  setUser: (user: UserProfileType) => void
  updateStateUser: (user: {
    name: string
    description: string
    profile_url: string
  }) => void
  clearUser: () => void
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: {
        name: '',
        user_id: '',
        profile_url: '',
        description: '',
        on_boarding: false,
      },
      setUser: (user: UserProfileType) => set({ user }),
      updateStateUser: (user: {
        name: string
        description: string
        profile_url: string
      }) => set({ user: { ...get().user!, ...user } }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
)

export default useUserStore
