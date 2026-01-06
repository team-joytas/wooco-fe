'use client'

import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course'
import { HelperText, RegionCascader } from '@/src/shared/ui'
import { useEffect } from 'react'
import type { CoursePlaceType } from '@/src/entities/place'
import useRegionStore from '@/src/shared/store/regionStore'

export function FormRegion({
  setPlaces,
  isSubmitted,
}: {
  setPlaces: Dispatch<SetStateAction<CoursePlaceType[]>>
  isSubmitted: boolean
}) {
  const { setValue, watch } = useFormContext<CoursePayloadType>()
  const primary = watch('primary_region')
  const secondary = watch('secondary_region')

  const { selectedRegion, setSelectedRegion } = useRegionStore()

  useEffect(() => {
    if (selectedRegion?.length) {
      setValue('primary_region', selectedRegion[0])
      setValue('secondary_region', selectedRegion[1])
    }
  }, [selectedRegion, setValue])

  const onChangeRegion = (value: string[]) => {
    setSelectedRegion(value)
    setValue('primary_region', value[0])
    setValue('secondary_region', value[1])
    setPlaces([])
  }

  const showRegionCascader =
    selectedRegion.length == 0 || (selectedRegion && primary)

  return (
    showRegionCascader && (
      <>
        <RegionCascader
          firstRegion={primary}
          secondRegion={secondary}
          setRegion={onChangeRegion}
          placeholder='지역을 선택해주세요.'
        />
        {isSubmitted && !primary && (
          <HelperText message='지역을 선택해주세요.' />
        )}
      </>
    )
  )
}
