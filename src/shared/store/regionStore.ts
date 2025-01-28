import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LikeRegion {
  id: string
  primary_region: string
  secondary_region: string
}

interface RegionStore {
  currentRegion: string[]
  setCurrentRegion: (region: string[]) => void
  likedRegions: LikeRegion[]
  addLikedRegion: (region: LikeRegion) => void
  removeLikedRegion: (id: string) => void
  isUpdated: boolean
  setIsUpdated: (isUpdated: boolean) => void
}

const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      currentRegion: [],
      setCurrentRegion: (region) => set({ currentRegion: region }),
      likedRegions: [],
      addLikedRegion: ({ id, primary_region, secondary_region }) =>
        set((state) => ({
          likedRegions: [
            ...state.likedRegions,
            { id, primary_region, secondary_region },
          ],
        })),
      removeLikedRegion: (id) =>
        set((state) => ({
          likedRegions: state.likedRegions.filter((region) => region.id !== id),
        })),
      isUpdated: true,
      setIsUpdated: (isUpdated) => set({ isUpdated }),
    }),
    { name: 'like-region-storage' }
  )
)

export default useRegionStore
