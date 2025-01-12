'use client'

import getData from './getData'
import ListCourse from '@/src/views/list-course'

export default function Page() {
  const data = getData()

  return <ListCourse data={data} />
}
