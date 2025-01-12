'use client'

import { useEffect, useState } from 'react'
import RegionCascader from '@/src/shared/ui/RegionCascader'
import { useRouter } from 'next/navigation'
import Header from '@/src/widgets/Header'
import Spacer from '@/src/shared/ui/Spacer'
export default function AddRegion() {
  const router = useRouter()
  const [selectedRegion, setSelectedRegion] = useState<string>('')

  useEffect(() => {
    const handleSubmit = () => {
      if (selectedRegion) {
        router.push('/courses')
      }
    }
    handleSubmit()
  }, [selectedRegion])

  return (
    <div className='h-100% flex flex-col'>
      <Header title='관심 지역 추가하기' isBack />
      <Spacer height={20} />
      <div className='flex align-center justify-center'>
        <RegionCascader
          placeholder='관심 지역 등록하고 빠르게 코스들 구경해요'
          setSelectedRegion={setSelectedRegion}
        />
      </div>
    </div>
  )
}
