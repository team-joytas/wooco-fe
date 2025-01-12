'use client'

import ListCourse from '@/src/views/list-course'
import { getCourses } from '@/src/entities/course/api'
import { getFavoriteRegions } from '@/src/entities/user/api'

export default async function Page() {
  const courses = await getCourses()
  const favoriteRegions = await getFavoriteRegions()

  return <ListCourse courses={courses} favoriteRegions={favoriteRegions} />
}
