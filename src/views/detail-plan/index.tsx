'use client'

import CoursePlanLayout from '@/src/widgets/course-plan-layout'
import { useGetPlan } from '@/src/entities/plan/query'

interface DetailPlanProps {
  planId: string
}

export default function DetailPlan({ planId }: DetailPlanProps) {
  const { data: plan } = useGetPlan(planId)

  if (!plan) return <div>Loading...</div>

  return <CoursePlanLayout type='plan' id={planId} data={plan} />
}
