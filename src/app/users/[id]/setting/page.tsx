'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState('')
  const [nickname, setNickname] = useState('')
  const [isValidate, setIsValidate] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isClicked, setIsClicked] = useState(false)

  const validateInput = (value: string) => {
    setNickname(value)

    if (value.includes(' ')) {
      setIsValidate(false)
      setErrorMessage('공백은 입력할 수 없습니다.')
      return
    }
    if (/[`~!@#$%^&*|\\'"/?]/gi.test(value)) {
      setIsValidate(false)
      setErrorMessage('특수 문자는 입력할 수 없습니다.')
      return
    }
    if (value.length < 2 || value.length > 10) {
      setIsValidate(false)
      setErrorMessage('2자 이상 10자 이하로 입력해주세요.')
      return
    }
    setIsValidate(true)
    setErrorMessage('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)
    }
  }

  const handleSubmit = () => {
    setIsClicked(false)
    router.back()
  }

  return (
    <div className='w-full h-[calc(100%-50px)] pt-[30px] pb-[20px] px-[16px] flex flex-col items-center relative'>
      <section className='w-full flex flex-col items-center'>
        <span className='font-bold text-[18px] border-b items-center'>
          정보 수정
        </span>
        <label className='cursor-pointer mt-[20px]'>
          <div className='w-[100px] h-[100px] bg-gray-300 rounded-full overflow-hidden flex items-center justify-center'>
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt='Preview'
                className='w-full h-full object-cover'
                width={100}
                height={100}
              />
            ) : (
              <span className='text-[12px] text-gray-500'>+</span>
            )}
          </div>
          <input
            type='file'
            className='hidden'
            accept='.png, .jpg, .jpeg'
            onChange={handleImageUpload}
          />
        </label>

        <div className='flex flex-row items-start mt-[50px] w-[90%]'>
          <span className='text-[13px] w-[80px] font-bold mx-[10px]'>
            닉네임
          </span>
          <div className='flex flex-col w-auto'>
            <input
              type='text'
              value={nickname}
              maxLength={10}
              onChange={(e) => validateInput(e.target.value)}
              className='w-[200px] inline-block border-b text-[13px] border-gray-300'
              placeholder='닉네임을 입력해주세요.'
            />
            {!isValidate && (
              <span className='text-[12px] text-red-500 mt-[5px]'>
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className='absolute bottom-[40px] w-[90%] flex flex-col items-center mt-[20px]'>
        <button
          className={`w-full h-[30px] bg-blue-800 text-white rounded-[5px] ${
            isValidate ? '' : 'bg-gray-300'
          }`}
          onClick={handleSubmit}
          disabled={isClicked}
        >
          변경 완료
        </button>
        <div className='flex flex-row items-center mt-[20px] text-[10px] text-gray-500 underline gap-[10px]'>
          <span className='cursor-pointer'>로그아웃</span>
          <span className='cursor-pointer'>회원탈퇴</span>
        </div>
      </section>
    </div>
  )
}
