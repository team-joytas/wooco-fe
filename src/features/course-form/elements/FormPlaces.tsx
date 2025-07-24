import { CoursePayloadType } from '@/src/entities/course'
import { CoursePlanPlaceType } from '@/src/entities/place'
import { ActiveKakaoMap, HelperText } from '@/src/shared/ui'
import DragPlace from '@/src/widgets/drag-place'
import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import plus from '@/src/assets/icon/medium/plus_white.svg'
import Image from 'next/image'

export function FormPlaces({
  places,
  setPlaces,
  handleClickSearchPlace,
  isSubmitted,
}: {
  places: CoursePlanPlaceType[]
  setPlaces: Dispatch<SetStateAction<CoursePlanPlaceType[]>>
  handleClickSearchPlace: () => void
  isSubmitted: boolean
}) {
  const { register } = useFormContext<CoursePayloadType>()

  return (
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
        className='w-full h-[40px] text-[15px] rounded-full flex items-center justify-center bg-wooco_blue-tertiary border-none hover:bg-container-light-blue hover:text-white transition-all duration-300'
      >
        <Image src={plus} alt='plus' className='' />
      </button>
      {isSubmitted && places.length === 0 && (
        <HelperText message='장소를 선택해주세요.' />
      )}
    </div>
  )
}
