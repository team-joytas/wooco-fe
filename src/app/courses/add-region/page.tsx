'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import Spacer from '@/app/components/(layout)/Spacer'
import { useEffect, useState } from 'react'
import RegionCascader from '@/app/components/RegionCascader'
import { useRouter } from 'next/navigation'

export default function Page() {
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
      <section className='max-w-[375px] relative bg-white w-full h-[55px] px-[20px] min-h-[55px] flex justify-between items-center border-b-[1px] border-b-header-line'>
        <Link href={`/courses`} className='cursor-pointer'>
          <ChevronLeft size={24} strokeWidth={1.5} />
        </Link>
        <p className='font-bold text-[17px]  px-[20px] py-[8px] rounded-[20px]'>
          관심 지역 추가하기
        </p>
        <div className='w-[24px] h-[24px]' />
      </section>

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
