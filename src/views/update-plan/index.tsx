'use client'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import { DatePicker } from 'antd'
import SearchPlace from '@/src/views/search-place'
import { useState } from 'react'
import DragPlace from '@/src/widgets/drag-place'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { PlaceType } from '@/src/entities/place/type'
import CoursePlanFormLayout from '@/src/widgets/course-plan-form-layout'

interface UpdatePlanProps {
  planId: string
}

export default function UpdatePlan({ planId }: UpdatePlanProps) {
  const router = useRouter()
  const [places, setPlaces] = useState<PlaceType[]>([])
  const [date, setDate] = useState<string>('2024-12-25')
  const [openSearchPlace, setOpenSearchPlace] = useState<boolean>(false)

  dayjs.extend(customParseFormat)

  const dateFormat = 'YYYY-MM-DD'

  const submitPlan = () => {
    router.push('/plans')
  }

  return <CoursePlanFormLayout type='plan' level='update' id={planId} />
}
