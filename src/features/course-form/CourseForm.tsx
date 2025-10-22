'use client'

import { Dispatch, SetStateAction } from 'react'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import {
  Section,
  FormTitle,
  FormRegion,
  FormContents,
  FormDate,
  FormTags,
  FormPlaces,
} from '@/src/features/course-form/elements'
import { Places, Contents, Date } from '@/src/features/course-detail'
import { useFormContext } from 'react-hook-form'
import { CourseInputType } from '@/src/entities/course'
import Image from 'next/image'
import ping from '@/src/assets/icon/medium/ping.svg'
import { TitleWithTagStyle } from '../header-elements'
import useUserStore from '@/src/shared/store/userStore'
import { PublishToggle } from './PublishToggle'

function CourseFormStepOne({
  places,
  setPlaces,
  handleClickSearchPlace,
  showValidation,
}: {
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  showValidation: boolean
}) {
  return (
    <div className='space-y-[48px]'>
      <Section title='방문 날짜를 등록하세요.' padding>
        <FormDate showValidation={showValidation} />
      </Section>
      <Section title={'방문 지역을 선택하세요'} padding>
        <FormRegion setPlaces={setPlaces} showValidation={showValidation} />
      </Section>
      <Section title={'방문 장소를 검색하세요'}>
        <FormPlaces
          places={places}
          setPlaces={setPlaces}
          handleClickSearchPlace={handleClickSearchPlace}
          showValidation={showValidation}
        />
      </Section>
    </div>
  )
}

function CourseFormStepTwo({ showValidation }: { showValidation: boolean }) {
  return (
    <div className='space-y-[30px]'>
      <Section title={'코스 제목을 만들어주세요.'} padding>
        <FormTitle showValidation={showValidation} />
      </Section>
      <Section title={'코스 설명을 적어주세요'} padding>
        <FormContents showValidation={showValidation} />
      </Section>
      <Section title='관련 태그를 눌러주세요.' padding>
        <FormTags showValidation={showValidation} />
      </Section>
    </div>
  )
}

function CourseFormStepThree() {
  const { getValues } = useFormContext<CourseInputType>()
  const username = useUserStore((state) => state.user?.name) || 'user'

  return (
    <div className='space-y-[30px] text-gray-500'>
      <div className='flex flex-col w-full items-center gap-[12px]'>
        <p className='flex flex-row gap-[6px] items-center text-middle'>
          <Image src={ping} width={13} height={13} alt='ping' />
          {getValues('secondary_region')}구
        </p>
        <TitleWithTagStyle title={getValues('title')} />
      </div>
      <Places places={getValues('places')} username={username} />
      <Contents contents={getValues('contents')} username={username} />
      <Date date={getValues('visit_date')} username={username} />

      {/* TODO: 백엔드 API 구현 이후 요청에 데이터 포함시키기 */}
      <PublishToggle />
    </div>
  )
}

interface CourseFormProps {
  step: 'first' | 'second' | 'preview'
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  showValidationByStep: {
    first: boolean
    second: boolean
  }
}

export function CourseFormByStep({
  step,
  places,
  setPlaces,
  handleClickSearchPlace,
  showValidationByStep,
}: CourseFormProps) {
  return (
    <>
      {step === 'first' && (
        <CourseFormStepOne
          places={places}
          setPlaces={setPlaces}
          handleClickSearchPlace={handleClickSearchPlace}
          showValidation={showValidationByStep['first']}
        />
      )}
      {step === 'second' && (
        <CourseFormStepTwo showValidation={showValidationByStep['second']} />
      )}
      {step === 'preview' && <CourseFormStepThree />}
    </>
  )
}
