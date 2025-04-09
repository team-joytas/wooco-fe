import { BackButton } from '@/src/shared/ui'

export function TitleWithTagStyle({
  title,
  handleClickBack,
}: {
  title: string
  handleClickBack: () => void
}) {
  return (
    <div className='flex items-center gap-[10px]'>
      <BackButton onClick={handleClickBack} />
      <div className='px-[20px] py-[5px] text-[13px] font-bold text-white bg-container-blue rounded-[20px]'>
        {title}
      </div>
    </div>
  )
}
