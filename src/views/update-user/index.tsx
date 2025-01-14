'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Camera } from 'lucide-react'
import Spacer from '@/src/shared/ui/Spacer'
import Header from '@/src/widgets/header'

export default function UpdateUser() {
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
    <>
      <Header title='정보 수정' isBack />
      <Spacer height={40} />
      <section className='w-full h-fit pb-[20px] flex flex-col items-center relative'>
        <div className='w-full flex flex-col items-center'>
          <label className='w-[100px] h-[100px] border-[1px] border-brand rounded-full flex items-center justify-center cursor-pointer'>
            <div className='w-full h-full bg-white relative rounded-full flex items-center justify-center'>
              {imagePreview && (
                <div className='relative'>
                  <Image
                    src={imagePreview}
                    alt='Preview'
                    className='rounded-full w-[70px] h-[70px] object-cover'
                    width={70}
                    height={70}
                  />
                </div>
              )}
              <div className='absolute bottom-[5px] w-[23px] h-[23px] right-[5px] rounded-full bg-brand flex items-center justify-center'>
                <Camera size={15} strokeWidth={1.5} stroke='#ffffff' />
              </div>
            </div>
            <input
              type='file'
              className='hidden'
              accept='.png, .jpg, .jpeg'
              onChange={handleImageUpload}
            />
          </label>
          <Spacer height={22} />
          <div className='px-[20px] flex flex-col gap-[15px] items-start w-full'>
            <p className='text-main w-[80px] font-bold'>닉네임</p>
            <div className='flex px-[20px] flex-col w-full'>
              <input
                type='text'
                value={nickname}
                maxLength={10}
                onChange={(e) => validateInput(e.target.value)}
                className='w-full inline-block text-[13px] focus:outline-none bg-bright-gray px-[15px] py-[10px] rounded-full'
                placeholder='닉네임을 입력해주세요.'
              />
              {!isValidate && (
                <span className='text-[12px] pl-[10px] text-red-500 mt-[5px]'>
                  {errorMessage}
                </span>
              )}
            </div>
          </div>
          <Spacer height={15} />
          <Spacer height={8} className='bg-bright-gray' />
          <Spacer height={15} />
          <div className='px-[20px] flex flex-col gap-[15px] items-start w-full'>
            <p className='text-main w-[80px] font-bold'>소개</p>
            <div className='flex px-[20px] flex-col w-full'>
              <input
                type='text'
                value={nickname}
                maxLength={20}
                onChange={(e) => validateInput(e.target.value)}
                className='w-full inline-block text-[13px] focus:outline-none bg-bright-gray px-[15px] py-[10px] rounded-full'
                placeholder='소개를 입력해주세요.'
              />
            </div>
          </div>
          <Spacer height={15} />
          <Spacer height={8} className='bg-bright-gray' />
        </div>
        <div className='fixed bottom-[70px] flex items-center mt-[20px] text-[10px] text-gray-500 underline gap-[10px]'>
          <span className='cursor-pointer'>회원탈퇴</span>|
          <span className='cursor-pointer'>로그아웃</span>
        </div>
      </section>
      <button
        className={`fixed bottom-[0px] text-[16px] font-bold flex items-center justify-center w-full max-w-[375px] h-[50px] ${
          isValidate ? 'bg-brand text-white' : 'bg-gray-200 text-black13'
        }`}
        onClick={handleSubmit}
        disabled={isClicked}
      >
        완료
      </button>
    </>
  )
}
