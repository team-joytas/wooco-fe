import {
  UseFormRegister,
  UseFormSetValue,
  FieldErrors,
  UseFormGetValues,
} from 'react-hook-form'
import type { CoursePayloadType } from '@/src/entities/course/type'
import { DatePicker, type DatePickerProps } from 'antd'
import SelectCategories from '@/src/shared/ui/SelectCategories'
import { RegionCascader } from '@/src/shared/ui/RegionCascader'
import { useState } from 'react'
import dayjs from 'dayjs'
import type { CoursePlanPlaceType } from '@/src/entities/place/type'
import { Dispatch, SetStateAction } from 'react'
import Spacer from '@/src/shared/ui/Spacer'
import KakaoMap from '@/src/shared/ui/KakaoMap'
import DragPlace from '@/src/widgets/drag-place'
import { Plus } from 'lucide-react'

export function FormTitle({
  register,
  errors,
}: {
  register: UseFormRegister<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
}) {
  const validateTitle = (value: string) => {
    if (!value) return '제목을 입력해주세요.'
    if (value.length < 2 || value.length > 20) {
      return '2자 이상 20자 이하로 입력해주세요.'
    }
    return true
  }
  return (
    <>
      <input
        {...register('title', { validate: validateTitle })}
        maxLength={20}
        placeholder='제목을 입력해주세요.'
        className='rounded-full focus:outline-container-light-blue focus:outline-[0.5px] text-sub text-gray-500 h-[35px] border-0 bg-bright-gray px-[10px]'
      />
      {errors.title && (
        <span className='text-[12px] pl-[10px] text-red-500'>
          {errors.title.message}
        </span>
      )}
    </>
  )
}

export function FormContents({
  register,
  errors,
}: {
  register: UseFormRegister<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
}) {
  const validateContents = (value: string) => {
    if (!value) return '내용을 입력해주세요.'
    if (value.length < 2 || value.length > 200) {
      return '2자 이상 200자 이하로 입력해주세요.'
    }
    return true
  }
  return (
    <>
      <textarea
        {...register('contents', { validate: validateContents })}
        className='rounded-[10px] h-[130px] resize-none focus:outline-container-light-blue focus:outline-[0.5px] border-0 bg-bright-gray p-[10px] text-sub text-gray-500'
        placeholder='방문 후기나 가기 전 꿀팁 등 다양한 정보가 있을수록 좋아요!'
        maxLength={200}
      />
      {errors.contents && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          {errors.contents.message}
        </span>
      )}
    </>
  )
}

export function FormDate({
  register,
  setValue,
  getValues,
  isButtonClick,
}: {
  register: UseFormRegister<CoursePayloadType>
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [date, setDate] = useState<string | null>(
    getValues('visit_date') || null
  )

  const onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
    setValue('visit_date', dateString as string)
    setDate(dateString as string)
  }

  return (
    <>
      <DatePicker
        {...register('visit_date')}
        onChange={onChangeDate}
        allowClear
        placeholder='날짜를 선택해주세요.'
        defaultValue={date ? dayjs(date) : undefined}
      />
      {!date && isButtonClick && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          날짜를 선택해주세요.
        </span>
      )}
    </>
  )
}

export function FormCategories({
  setValue,
  getValues,
  isButtonClick,
}: {
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [categories, setCategories] = useState<string[]>([])

  const onChangeCategories = (categories: string[]) => {
    setCategories(categories)
    setValue('categories', categories)
  }

  return (
    <>
      <SelectCategories
        setCategories={onChangeCategories}
        prevCategories={getValues('categories')}
      />
      {isButtonClick && categories.length === 0 && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          태그를 선택해주세요.
        </span>
      )}
    </>
  )
}

export function FormRegion({
  setValue,
  getValues,
  isButtonClick,
}: {
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  isButtonClick: boolean
}) {
  const [region, setRegion] = useState<string | null>(null)
  const onChangeRegion = (value: string[]) => {
    setRegion(value[0] as string)
    setValue('primary_region', value[0] as string)
    setValue('secondary_region', value[1] as string)
  }

  return (
    <>
      <RegionCascader
        firstRegion={getValues('primary_region')}
        secondRegion={getValues('secondary_region')}
        setRegion={onChangeRegion}
        placeholder='지역을 선택해주세요.'
      />
      {isButtonClick && !region && (
        <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
          지역을 선택해주세요.
        </span>
      )}
    </>
  )
}

export default function FormSections({
  pageType,
  register,
  places,
  setPlaces,
  handleClickSearchPlace,
  setValue,
  getValues,
  errors,
  isButtonClick,
}: {
  pageType: string
  register: UseFormRegister<CoursePayloadType>
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  setValue: UseFormSetValue<CoursePayloadType>
  getValues: UseFormGetValues<CoursePayloadType>
  errors: FieldErrors<CoursePayloadType>
  isButtonClick: boolean
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
          isButtonClick={isButtonClick}
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
          {places.length > 0 && <KakaoMap places={places} id={1} />}
          <DragPlace places={places} setPlaces={setPlaces} />
          <button
            type='button'
            onClick={handleClickSearchPlace}
            className='w-full h-[40px] text-[15px] cursor-pointer rounded-full flex items-center justify-center bg-white text-container-light-blue border border-container-light-blue 
            hover:bg-container-light-blue hover:text-white transition-all duration-300'
          >
            <Plus size={20} strokeWidth={3} />
          </button>
          {isButtonClick && places.length === 0 && (
            <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
              장소를 선택해주세요.
            </span>
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
          isButtonClick={isButtonClick}
        />
      </Section>
      <Divider />
      <Section title='관련 태그를 눌러 주세요.' padding>
        <FormCategories
          setValue={setValue}
          getValues={getValues}
          isButtonClick={isButtonClick}
        />
      </Section>
      <Spacer height={25} />
    </>
  )
}

interface SectionProps {
  title: string
  children: React.ReactNode
  padding?: boolean
}

function Section({ title, children, padding }: SectionProps) {
  return (
    <div
      className={`w-full flex flex-col gap-[15px] ${
        padding ? 'px-[20px]' : ''
      }`}
    >
      <span className={`text-main font-semibold ${padding ? '' : 'px-[20px]'}`}>
        {title}
      </span>
      {children}
    </div>
  )
}

function Divider() {
  return (
    <>
      <Spacer height={25} />
      <Spacer height={8} className='bg-bright-gray' />
      <Spacer height={25} />
    </>
  )
}
