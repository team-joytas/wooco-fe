'use client'

import {
  CoursePlanDetailLayout,
  SkeletonCoursePlanDetailLayout,
} from '@/src/widgets'
import { useGetPlan } from '@/src/entities/plan'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface DetailPlanProps {
  planId: string
}

export default function DetailPlan({ planId }: DetailPlanProps) {
  const { data: plan, isLoading, isError } = useGetPlan(planId)

  const router = useRouter()

  useEffect(() => {
    // 로딩 중일때 스크롤 금지
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  if (isError) {
    router.push('/not-found')
  }

  if (isLoading || !plan)
    return <SkeletonCoursePlanDetailLayout type='course' />

  return <CoursePlanDetailLayout type='plan' id={planId} data={plan} />
}
