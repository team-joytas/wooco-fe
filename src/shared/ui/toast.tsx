import error from '@/src/assets/icon/medium/error_fill.svg'
import logo from '@/src/assets/images/(logo)/logo_white.svg'
import Image from 'next/image'

type ToastProps = {
  type: 'warning' | 'notice'
  message: string
}

const TOAST_STYLES = {
  warning:
    'fixed top-[30px] left-1/2 transform -translate-x-1/2 z-[10001] flex flex-row items-center justify-center w-[355px] h-[65px] px-[20px] py-[10px] bg-white rounded-[10px] shadow-custom border-[1.5px] border-error',
  notice:
    'fixed top-[30px] left-1/2 transform -translate-x-1/2 z-[10001] flex flex-row items-center w-[355px] h-[65px] px-[20px] py-[10px] bg-brand rounded-[10px] shadow-custom',
}

const ICONS = {
  warning: {
    src: error,
    alt: 'error',
    gap: 'gap-[8px]',
    textClass: 'text-gray-800',
  },
  notice: {
    src: logo,
    alt: 'alert',
    gap: 'gap-[10px]',
    textClass: 'text-white',
  },
}

export function Toast({ type, message }: ToastProps) {
  const { src, alt, gap, textClass } = ICONS[type]

  return (
    <div className={TOAST_STYLES[type]}>
      <div className={`flex items-center ${gap}`}>
        <Image src={src} alt={alt} width={20} height={20} />
        <span className={`text-middle font-medium ${textClass}`}>
          {message}
        </span>
      </div>
    </div>
  )
}
