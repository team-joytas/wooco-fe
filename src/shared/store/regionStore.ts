import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface LikeRegion {
  id: string
  primary_region: string
  secondary_region: string
}

interface RegionStore {
  selectedRegion: string[]
  setSelectedRegion: (region: string[]) => void
  likedRegions: LikeRegion[]
  setLikedRegions: (regions: LikeRegion[]) => void
  addLikedRegion: (region: LikeRegion) => void
  removeLikedRegion: (id: string) => void
}

const useRegionStore = create<RegionStore>()(
  persist(
    (set) => ({
      selectedRegion: [],
      setSelectedRegion: (region) => set({ selectedRegion: region }),
      likedRegions: [],
      setLikedRegions: (regions) => set({ likedRegions: regions }),
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
    }),
    { name: 'like-region-storage' }
  )
)

export default useRegionStore
