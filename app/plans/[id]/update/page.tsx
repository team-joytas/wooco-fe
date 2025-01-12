'use client'

import getData from '../../getData'
import UpdatePlan from '@/src/views/update-plan'

export default function Page() {
  const data = getData().courses[0]

  return <UpdatePlan data={data} />
}
