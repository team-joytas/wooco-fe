import { Dispatch, SetStateAction } from 'react'
import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormGetValues,
} from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course'
import { Spacer, ActiveKakaoMap, HelperText } from '@/src/shared/ui'
import type { CoursePlanPlaceType } from '@/src/entities/place'
import {
  Section,
  Divider,
  FormTitle,
  FormRegion,
  FormContents,
  FormDate,
  FormCategories,
} from '@/src/features'
import DragPlace from '@/src/widgets/drag-place'
import { Plus } from 'lucide-react'

export function CourseForm({
  pageType,
  register,
  places,
  setPlaces,
  handleClickSearchPlace,
  setValue,
  getValues,
  errors,
  isSubmitted,
}: {
  pageType: string
  register: UseFormRegister<CoursePayloadType>
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
  isSubmitted: boolean
}) {
  return (
    <>
      <Section title={`${pageType} 제목을 만들어주세요.`} padding>
        <FormTitle register={register} errors={errors} />
      </Section>
      <Divider />
      <Section title={`${pageType} 지역을 선택하세요.`} padding>
        <FormRegion
          getValues={getValues}
          setValue={setValue}
          setPlaces={setPlaces}
          isSubmitted={isSubmitted}
        />
      </Section>
      <Divider />
      <Section title={`${pageType} 장소를 선택하세요.`}>
        <div
          className='px-[20px] w-full flex flex-col gap-[15px] padding'
          {...register('place_ids', {
            validate: (value) => value.length > 0 || '장소를 선택해주세요.',
          })}
        >
          {places.length > 0 && <ActiveKakaoMap places={places} />}
          <DragPlace places={places} setPlaces={setPlaces} />
          <button
            type='button'
            onClick={handleClickSearchPlace}
            className='w-full h-[40px] text-[15px] rounded-full flex items-center justify-center bg-white text-container-light-blue border border-container-light-blue
            hover:bg-container-light-blue hover:text-white transition-all duration-300'
          >
            <Plus size={20} strokeWidth={3} />
          </button>
          {isSubmitted && places.length === 0 && (
            <HelperText message='장소를 선택해주세요.' />
          )}
        </div>
      </Section>
      <Divider />
      <Section title={`${pageType} 설명을 적어주세요.`} padding>
        <FormContents register={register} errors={errors} />
      </Section>
      <Divider />
      <Section title='방문 날짜를 등록하세요.' padding>
        <FormDate
          register={register}
          setValue={setValue}
          getValues={getValues}
          isSubmitted={isSubmitted}
          pageType={pageType}
        />
      </Section>
      {pageType === '코스' && (
        <>
          <Divider />
          <Section title='관련 태그를 눌러 주세요.' padding>
            <FormCategories
              setValue={setValue}
              getValues={getValues}
              isSubmitted={isSubmitted}
              isInCourseList={false}
            />
          </Section>
        </>
      )}
      <Spacer height={25} />
    </>
  )
}
