import { Link, Share2, X } from 'lucide-react'
import { CourseType } from '@/src/entities/course'
import { Modal } from '@/src/shared/ui/modal'
import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CourseModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  course: CourseType
}

export function CourseModal({ isOpen, setIsOpen, course }: CourseModalProps) {
  const router = useRouter()

  const [messageApi, contextHolder] = message.useMessage()
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (path: string) => {
    setIsClicked(!isClicked)
    document.scrollingElement?.scrollTo({ top: 0, behavior: 'smooth' })
    router.push(path)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      messageApi.success({
        content: '링크가 클립보드에 복사되었습니다.',
        duration: 1,
      })
    })
    setIsClicked(!isClicked)
    setIsOpen(false)
  }

  const onClickAddPlan = () => {
    const { primary_region, secondary_region, places } = course
    const filteredData = {
      primary_region,
      secondary_region,
      places,
    }

    sessionStorage.setItem('plan', JSON.stringify(filteredData))
    document.body.style.overflow = 'unset'
    handleClick('/plans/new')
  }

  return (
    <Modal isOpen={isOpen}>
      <div className='w-full flex items-center justify-end pr-[8px] pt-[8px]'>
        <X
          size={15}
          className='cursor-pointer text-gray-500'
          onClick={() => setIsOpen(false)}
        />
      </div>

      <span className='text-main text-gray-700 font-bold flex items-center justify-center'>
        플랜으로 추가할까요?
      </span>

      <div className='flex flex-row h-[50px] w-full bg-gray-300 text-gray-500 text-main font-bold'>
        <button
          className='flex-1 items-center justify-center flex gap-[10px] rounded-bl-[10px] '
          onClick={copyToClipboard}
        >
          <Link size={16} />
          링크 복사
        </button>
        <button
          onClick={onClickAddPlan}
          className='flex-1 items-center justify-center flex gap-[10px] bg-brand  text-white rounded-br-[10px]'
        >
          <Share2 size={16} fill='#fff' />
          추가하기
        </button>
      </div>

      {contextHolder}
    </Modal>
  )
}
