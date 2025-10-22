export function TitleWithTagStyle({ title }: { title: string }) {
  if (!title) return null

  return title.length === 0 ? (
    <div className='text-main01 font-semibold w-[100px] h-[35.5px] rounded-[20px] bg-container-blue leading-normal' />
  ) : (
    <div
      className='px-[20px] py-[8px] text-main01 text-white bg-container-blue rounded-[2025px] inline-block'
      title={title}
    >
      {title}
    </div>
  )
}
