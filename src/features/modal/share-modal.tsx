'use client'

import { CourseType } from '@/src/entities/course'
import { Modal, useToast } from '@/src/shared/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PlanType } from '@/src/entities/plan'
import { useMessageApi } from '@/src/shared/lib'
import { useAuth } from '@/src/shared/provider'
import close from '@/src/assets/icon/medium/cross.svg'
import link from '@/src/assets/icon/medium/link.svg'
import share_white from '@/src/assets/icon/medium/share_white.svg'
import Image from 'next/image'

interface ShareModalProps {
  type: 'course' | 'plan'
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  data: CourseType | PlanType
}

export function ShareModal({ type, isOpen, setIsOpen, data }: ShareModalProps) {
  const [isClicked, setIsClicked] = useState(false)

  const router = useRouter()
  const messageApi = useMessageApi()
  const { show } = useToast()
  const { token } = useAuth()
  const title =
    type === 'course' ? '플랜으로 추가할까요?' : '코스로 공유할까요?'
  const button = type === 'course' ? '추가하기' : '공유하기'
  const shareType = type === 'course' ? 'plan' : 'course'
  const shareTypeName = type === 'course' ? '플랜' : '코스'

  const handleClick = (path: string) => {
    setIsClicked(!isClicked)
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    show(`${shareTypeName} 작성 페이지로 이동합니다.`)
    router.push(path)
  }

  const copyToClipboard = () => {
    const url = window.location.href
    const postId = data.id.toString()
    const to = url.includes(postId) ? url : url + `/${postId}`

    navigator.clipboard.writeText(to).then(() => {
      messageApi.success({
        content: '링크가 클립보드에 복사되었습니다.',
        duration: 1,
      })
    })
    setIsClicked(!isClicked)
    setIsOpen(false)
  }

  const handleShare = () => {
    if (!token) {
      show('로그인 후 이용해주세요')
      setIsOpen(false)
      return
    }

    const { primary_region, secondary_region, places } = data
    const filteredData = {
      primary_region,
      secondary_region,
      places,
    }

    sessionStorage.setItem(shareType, JSON.stringify(filteredData))
    document.body.style.overflow = 'unset'
    handleClick(`/${shareType}s/new`)
  }

  return (
    <Modal type='share' isOpen={isOpen}>
      <div className='w-full flex items-center justify-end pr-[8px] pt-[8px]'>
        <Image
          width={25}
          height={25}
          src={close}
          alt='close'
          className='cursor-pointer'
          onClick={() => setIsOpen(false)}
        />
      </div>

      <span className='text-main text-gray-700 font-bold flex items-center justify-center'>
        {title}
      </span>

      <div className='flex flex-row h-[50px] w-full bg-gray-100 text-gray-700 text-main'>
        <button
          className='flex-1 items-center justify-center flex gap-[10px] rounded-bl-[10px] '
          onClick={copyToClipboard}
        >
          <Image src={link} alt='link' />
          링크 복사
        </button>
        <button
          onClick={handleShare}
          className='flex-1 items-center justify-center flex gap-[10px] bg-brand  text-white rounded-br-[10px]'
          disabled={isClicked}
        >
          <Image src={share_white} alt='share' />
          {button}
        </button>
      </div>
    </Modal>
  )
}
