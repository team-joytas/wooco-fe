'use client'

import { getCourses } from '@/src/entities/course/api'
import { getFavoriteRegions } from '@/src/entities/user/api'
import CourseList from '@/src/views/list-course'
import { CourseType } from '@/src/entities/course/type'
import { useState, useEffect } from 'react'
import { FavoriteRegionType } from '@/src/entities/user/type'

export default function Page() {
  const [trendingCourses, setTrendingCourses] = useState<CourseType[]>([])
  const [favoriteRegions, setFavoriteRegions] = useState<FavoriteRegionType[]>(
    []
  )
  const [courses, setCourses] = useState<CourseType[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const favoriteRegions = await getFavoriteRegions()
      const courses = await getCourses()
      setTrendingCourses(courses)
      setFavoriteRegions(favoriteRegions)
      setCourses(courses)
    }
    fetchData()
  }, [])

  return (
    <CourseList
      trendingCourses={trendingCourses}
      favoriteRegions={favoriteRegions}
      courses={courses}
    />
  )
}
