type ProgressConfig = {
  step: 'first' | 'second' | 'preview'
  label: string
  backgroundColor: string
  message: string
  messagePosition: string
}

const progressConfig: Record<
  'first' | 'second' | 'preview',
  Omit<ProgressConfig, 'step'>
> = {
  first: {
    label: '1/2',
    backgroundColor: 'bg-wooco_blue-secondary',
    message: '방문 정보를 적어주세요!',
    messagePosition: 'items-start',
  },
  second: {
    label: '2/2',
    backgroundColor: 'bg-wooco_blue-secondary',
    message: '코스를 소개해주세요!',
    messagePosition: 'items-center',
  },
  preview: {
    label: 'PREVIEW',
    backgroundColor: 'bg-wooco_blue-primary',
    message: '내용을 확인해주세요!',
    messagePosition: 'items-end',
  },
}

interface ProgressProps {
  step: 'first' | 'second' | 'preview'
}

export function ProgressBar({ step }: ProgressProps) {
  const currentConfig = progressConfig[step]

  return (
    <div
      className={`w-full h-[94px] p-[20px] flex flex-col gap-[11px] ${currentConfig.backgroundColor} transition-colors duration-200`}
    >
      {/* Step Section */}
      <div className='flex flex-row items-center'>
        <div
          className={`rounded-full bg-white w-[7px] h-[7px] transition-all duration-200 ${step === 'first' ? 'scale-150 opacity-100' : 'opacity-25'}`}
        />
        <div className='flex-1 h-[3px] bg-white opacity-25 rounded-[10px] mx-2' />
        <div
          className={`rounded-full bg-white w-[7px] h-[7px] transition-all duration-200 ${step === 'second' ? 'scale-150 opacity-100' : 'opacity-25'}`}
        />
        <div className='flex-1 h-[3px] bg-white opacity-25 rounded-[10px] mx-2' />
        <div
          className={`rounded-full bg-white w-[7px] h-[7px] transition-all duration-200 ${step === 'preview' ? 'scale-150 opacity-100' : 'opacity-25'}`}
        />
      </div>

      {/* Text Section */}
      <div
        className={`flex flex-col ${currentConfig.messagePosition} text-white`}
      >
        <span className='text-sub'>{currentConfig.label}</span>
        <span className='text-middle01'>{currentConfig.message}</span>
      </div>
    </div>
  )
}
