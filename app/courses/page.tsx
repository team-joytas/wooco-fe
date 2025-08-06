'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Error from '@/app/error'
import { MainCourse, RegionCourse } from '@/src/widgets'

function CoursesContent() {
  const path = useSearchParams()
  const primary = path.get('primary')
  const secondary = path.get('secondary')

  if (!primary || !secondary) {
    return <MainCourse />
  }

  return <RegionCourse primary={primary} secondary={secondary} />
}

export default function Page() {
  return (
    <Suspense fallback={<Error />}>
      <CoursesContent />
    </Suspense>
  )
}
