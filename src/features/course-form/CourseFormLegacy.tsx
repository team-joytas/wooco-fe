import { Dispatch, SetStateAction } from 'react'
import { Spacer, Divider } from '@/src/shared/ui'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import {
  Section,
  FormTitle,
  FormRegion,
  FormContents,
  FormDateLegacy,
  FormCategories,
  FormPlaces,
} from '@/src/features'

export function CourseFormLegacy({
  pageType,
  places,
  setPlaces,
  handleClickSearchPlace,
  isSubmitted,
}: {
  pageType: string
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  isSubmitted: boolean
}) {
  return (
    <>
      <Section title={`${pageType} 제목을 만들어주세요.`} padding>
        <FormTitle />
      </Section>
      <Divider margin={25} />
      <Section title={`${pageType} 지역을 선택하세요.`} padding>
        <FormRegion setPlaces={setPlaces} isSubmitted={isSubmitted} />
      </Section>
      <Divider margin={25} />
      <Section title={`${pageType} 장소를 선택하세요.`}>
        <FormPlaces
          places={places}
          setPlaces={setPlaces}
          handleClickSearchPlace={handleClickSearchPlace}
          isSubmitted={isSubmitted}
        />
      </Section>
      <Divider margin={25} />
      <Section title={`${pageType} 설명을 적어주세요.`} padding>
        <FormContents />
      </Section>
      <Divider margin={25} />
      <Section title='방문 날짜를 등록하세요.' padding>
        <FormDateLegacy isSubmitted={isSubmitted} pageType={pageType} />
      </Section>
      {pageType === '코스' && (
        <>
          <Divider margin={25} />
          <Section title='관련 태그를 눌러 주세요.' padding>
            <FormCategories isSubmitted={isSubmitted} isInCourseList={false} />
          </Section>
        </>
      )}
      <Spacer height={25} />
    </>
  )
}
