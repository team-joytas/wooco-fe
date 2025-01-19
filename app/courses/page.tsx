'use client'

import { getFavoriteRegions } from '@/src/entities/user/api'
import ListCourse from '@/src/views/list-course'
import { useState, useEffect } from 'react'
import { FavoriteRegionType } from '@/src/entities/user/type'

export default function Page() {
  const [favoriteRegions, setFavoriteRegions] = useState<FavoriteRegionType[]>(
    []
  )

  useEffect(() => {
    const fetchData = async () => {
      const favoriteRegions = await getFavoriteRegions()
      setFavoriteRegions(favoriteRegions)
    }
    fetchData()
  }, [])

  return <ListCourse favoriteRegions={favoriteRegions} />
}
