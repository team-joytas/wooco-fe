import Image from 'next/image'
import React, { useState, useRef, useEffect } from 'react'
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ReviewPayloadType } from '@/src/entities/place'
import { postImage } from '@/src/shared/api'
import { StarRateForm } from '@/src/features'
import { useToast } from '@/src/shared/ui'
import error from '@/src/assets/icons/error_color.svg'

// 리뷰
interface ReviewTextareaProps {
  contents: string
  setValue: UseFormSetValue<ReviewPayloadType>
  register: UseFormRegister<ReviewPayloadType>
}

const ReviewTextarea: React.FC<ReviewTextareaProps> = ({
  contents,
  setValue,
  register,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const handleResize = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // Reset height to shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px` // Set height to scrollHeight
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setValue('contents', value, { shouldValidate: true })
  }

  return (
    <div className='flex w-full justify-center items-center'>
      <textarea
        {...register('contents', {
          required: '리뷰 내용은 필수 입력 항목입니다.',
        })}
        ref={textareaRef}
        value={contents}
        onChange={handleChange}
        onInput={handleResize}
        placeholder={`작성 tip:\n방문 후기나 가기 전 꿀팁 등 다양한 정보가 있을수록 좋아요!`}
        className='w-[114.29%] min-h-[48px] px-[14px] py-[10px] rounded-[10px] scale-[0.875] bg-gray-100 border-0 resize-none overflow-hidden
        text-main01 text-gray-800 placeholder:text-middle01 placeholder:font-light origin-top
        focus:outline-container-light-blue focus:outline-[0.5px]'
      />
    </div>
  )
}

// 키워드
interface KeywordInputProps {
  keywords: string[]
  setValue: UseFormSetValue<ReviewPayloadType>
  register: UseFormRegister<ReviewPayloadType>
}

const KeywordInput: React.FC<KeywordInputProps> = ({
  keywords,
  setValue,
  register,
}) => {
  const [newKeyword, setNewKeyword] = useState('')

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword.trim()]
      setValue('one_line_reviews', updatedKeywords)
      setNewKeyword('')
    }
  }

  const handleDeleteKeyword = (index: number) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index)
    setValue('one_line_reviews', updatedKeywords)
  }

  return (
    <div className='w-full flex flex-col gap-[8px] justify-center items-center'>
      <input
        hidden={true}
        {...register('one_line_reviews', {
          validate: (reviews) => {
            if (reviews.length == 0) return '키워드 미완료'
            return true
          },
        })}
      />
      <input
        type='text'
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault()
            handleAddKeyword()
          }
        }}
        placeholder='하나의 키워드로 설명해주세요! ex. 맛/가성비/역세권'
        className='w-[100%] h-[40px] px-[14px] py-[10px] box-border rounded-[2025px] bg-gray-100 text-main01 placeholder:text-middle01 focus:outline-wooco_blue-primary-light focus:outline-[0.5px] scale-[0.875] origin-top'
      />
      <div className='flex w-[305px] flex-wrap gap-[8px]'>
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className='flex items-center gap-[7px] px-[10px] py-[5px] bg-[#B3BAF1] rounded-full text-white'
          >
            <span>{keyword}</span>
            <button onClick={() => handleDeleteKeyword(index)}>
              <Image src='/cross.svg' alt='delete' width={18} height={18} />
            </button>
          </div>
        ))}
      </div>
      {newKeyword && (
        <div className='w-[305px] flex gap-[8px] flex-row items-center'>
          <Image src={error} alt='error_info_icon' width={16} height={16} />
          <span className='text-red-500 text-sub01 font-semibold'>
            키워드 미완료
          </span>
          <span className='text-sub02 text-gray-700 font-light '>
            엔터를 눌러 작성을 완료해 주세요.
          </span>
        </div>
      )}
    </div>
  )
}

// 사진
interface ImageUploaderProps {
  uploadedImages: string[]
  setValue: UseFormSetValue<ReviewPayloadType>
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadedImages,
  setValue,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // Drag and Touch Scrolling
  let isDragging = false
  let startX = 0
  let scrollLeft = 0

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging = true
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft = scrollRef.current?.scrollLeft || 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    const scrollRefCurrent = scrollRef.current
    if (scrollRefCurrent) scrollRefCurrent.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    isDragging = false
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging = true
    startX = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0)
    scrollLeft = scrollRef.current?.scrollLeft || 0
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    const scrollRefCurrent = scrollRef.current
    if (scrollRefCurrent) scrollRefCurrent.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    isDragging = false
  }
  const { show } = useToast()
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const imageUrl = await postImage(file)
      if (imageUrl) {
        const updatedImages = [imageUrl, ...uploadedImages]
        setValue('image_urls', updatedImages)
      }
    } catch (error) {
      console.error(error)
      show('이미지 업로드에 실패했습니다.')
    }
  }

  const handleDeleteImage = (index: number) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index)
    setValue('image_urls', updatedImages)
  }

  return (
    <div className='w-full flex flex-col gap-2'>
      <div
        className='w-[375px] overflow-x-scroll scroll-smooth cursor-grab'
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='flex flex-row gap-[13px] px-[35px] mx-[-5px] min-w-fit'>
          <div className='relative w-[84px] h-[84px] flex justify-center items-center'>
            <button
              type='button'
              className='w-[74px] h-[74px] bg-gray-100 flex items-center justify-center rounded-[10px]'
              onClick={() => {
                const fileRef = fileInput.current
                if (fileRef) {
                  fileRef.click()
                }
              }}
            >
              <Image src='/plus.svg' alt='add' width={24} height={24} />
            </button>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleImageUpload}
            />
          </div>
          {uploadedImages.map((img, index) => (
            <div
              key={index}
              className='relative w-[85px] h-[85px] rounded-[10px] bg-white overflow-visible flex justify-center items-center'
            >
              <div className='w-[74px] h-[74px] overflow-hidden rounded-[10px] absolute '>
                <Image src={img} alt={`Uploaded ${index}`} fill sizes='cover' />
              </div>

              <div className='absolute top-[2px] right-[0px] overflow-visible'>
                <button
                  onClick={() => handleDeleteImage(index)}
                  className='relative bg-white w-[20px] h-[20px] rounded-[99px] flex items-center justify-center shadow-[3px_-3px_5px_-5px_rgba(0,_0,_0,_0.8)]'
                >
                  <Image
                    fill
                    sizes='cover'
                    alt='delete'
                    src='/cross_lightgray.svg'
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// form
interface FormReviewProps {
  register: UseFormRegister<ReviewPayloadType>
  setValue: UseFormSetValue<ReviewPayloadType>
  errors: FieldErrors<ReviewPayloadType>
  isSubmitting: boolean
  formValues: {
    rating: number
    contents: string
    one_line_reviews: string[]
    image_urls: string[]
  }
}

const FormReview: React.FC<FormReviewProps> = ({
  register,
  setValue,
  errors,
  isSubmitting,
  formValues,
}) => {
  // toast
  const { show } = useToast()

  useEffect(() => {
    if (isSubmitting) {
      return
    }
    if (errors.rating?.message) {
      show(errors.rating.message)
      return
    }
    if (errors.contents?.message) {
      show(errors.contents.message)
      return
    }
    if (errors.one_line_reviews?.message) {
      show(errors.one_line_reviews.message)
      return
    }
  }, [isSubmitting])

  return (
    <div className='w-full bg-white flex flex-col gap-[30px]'>
      {/* Star Rating Section */}
      <div className='flex flex-col items-start justify-start gap-[15px] relative'>
        <b className='text-main01 text-gray-900 pl-[20px]'>
          별점을 남겨볼까요?
        </b>
        <StarRateForm
          rate={formValues.rating}
          setValue={setValue}
          register={register}
        />
      </div>

      {/* Detailed Review Section */}
      <div className='w-full flex flex-col items-start justify-start gap-[15px] relative'>
        <b className='text-main01 text-gray-900 pl-[20px]'>
          장소 리뷰를 적어주세요.
        </b>
        <ReviewTextarea
          contents={formValues.contents}
          setValue={setValue}
          register={register}
        />
      </div>

      {/* Keywords Section */}
      <div className='w-full flex flex-col items-start justify-start gap-[15px]'>
        <b className='text-main01 text-gray-900 pl-[20px]'>
          어떤 점이 좋았나요?
        </b>
        <KeywordInput
          keywords={formValues.one_line_reviews}
          setValue={setValue}
          register={register}
        />
      </div>

      {/* Image Upload Section */}
      <div className='w-full flex flex-col items-start justify-start gap-[15px]'>
        <b className='text-main01 text-gray-900 pl-[20px]'>
          사진을 추가해보세요.
        </b>
        <ImageUploader
          uploadedImages={formValues.image_urls}
          setValue={setValue}
        />
      </div>
    </div>
  )
}

export default FormReview