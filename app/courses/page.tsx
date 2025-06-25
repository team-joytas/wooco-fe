'use client'

import ListCourse from '@/src/views/list-course'
import { Suspense } from 'react'
import Error from '@/app/error'

export default function Page() {
  return (
    <Suspense fallback={<Error />}>
      <ListCourse />
    </Suspense>
  )
}
