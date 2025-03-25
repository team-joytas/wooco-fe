'use client'

import CoursePlanDetailLayout from '@/src/widgets/course-plan-detail-layout'
import { useGetPlan } from '@/src/entities/plan'
import { useRouter } from 'next/navigation'

interface DetailPlanProps {
  planId: string
}

export default function DetailPlan({ planId }: DetailPlanProps) {
  const { data: plan, isError } = useGetPlan(planId)
  const router = useRouter()
  if (isError) {
    router.push("/not-found")
  }
  if (!plan) return <div>Loading...</div>

  return <CoursePlanDetailLayout type='plan' id={planId} data={plan} />
}
