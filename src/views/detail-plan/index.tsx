'use client'

import CoursePlanDetailLayout from '@/src/widgets/course-plan-detail-layout'
import { useGetPlan } from '@/src/entities/plan/query'

interface DetailPlanProps {
  planId: string
}

export default function DetailPlan({ planId }: DetailPlanProps) {
  const { data: plan } = useGetPlan(planId)

  if (!plan) return <div>Loading...</div>

  return <CoursePlanDetailLayout type='plan' id={planId} data={plan} />
}
