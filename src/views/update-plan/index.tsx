'use client'

import CoursePlanFormLayout from '@/src/widgets/course-plan-form-layout'

interface UpdatePlanProps {
  id: string
}

export default function UpdatePlan({ id }: UpdatePlanProps) {
  return <CoursePlanFormLayout type='plan' level='update' id={id} />
}
