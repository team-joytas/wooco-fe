'use client'

import DetailCourse from '@/src/views/detail-course'

export default function Page({ params }: { params: { id: string } }) {
  return <DetailCourse courseId={params.id} />
}
