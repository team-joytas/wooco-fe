'use client'

import { UseFormSetValue, UseFormGetValues } from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course'
import { HelperText, RegionCascader } from '@/src/shared/ui'
import { useEffect, useState } from 'react'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import { Dispatch, SetStateAction } from 'react'
import useRegionStore from '@/src/shared/store/regionStore'

export function FormRegion({
  setValue,
  getValues,
  setPlaces,
  isSubmitted,
}: {
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  isSubmitted: boolean
}) {
  const [region, setRegion] = useState<string | null>(null)

  const { currentRegion } = useRegionStore()
  useEffect(() => {
    if (currentRegion?.length && currentRegion[0] !== region) {
      setRegion(currentRegion[0] as string)
      setValue<'primary_region'>('primary_region', currentRegion[0] as string)
      setValue<'secondary_region'>('secondary_region', currentRegion[1] || '')
    }
  }, [currentRegion, region, setValue])

  const onChangeRegion = (value: string[]) => {
    setRegion(value[0] as string)
    setValue('primary_region', value[0] as string)
    setValue('secondary_region', value[1] as string)
    setPlaces([])
  }

  return (
    <>
      <RegionCascader
        firstRegion={getValues('primary_region')}
        secondRegion={getValues('secondary_region')}
        setRegion={onChangeRegion}
        placeholder='지역을 선택해주세요.'
      />
      {isSubmitted && !region && <HelperText message='지역을 선택해주세요.' />}
    </>
  )
}
