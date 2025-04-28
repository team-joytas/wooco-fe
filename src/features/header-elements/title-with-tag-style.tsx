export function TitleWithTagStyle({
  title,
  isTitleCenter,
}: {
  title: string
  isTitleCenter?: boolean
}) {
  if (!title) return null

  return title.length > 0 ? (
    <div
      className={`font-semibold w-[100px] h-[35.5px] rounded-[20px] bg-container-blue leading-normal ${
        isTitleCenter && 'absolute left-1/2 transform -translate-x-1/2'
      }`}
    />
  ) : (
    <div
      className={`px-[20px] py-[8px] text-[13px] font-bold text-white bg-container-blue rounded-[20px] font-semibold leading-normal ${
        isTitleCenter && 'absolute left-1/2 transform -translate-x-1/2'
      }`}
    >
      {title}
    </div>
  )
}
