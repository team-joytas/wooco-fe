export function TitleWithTagStyle({
  title,
  isTitleCenter,
}: {
  title: string
  isTitleCenter?: boolean
}) {
  return (
    <div
      className={`px-[20px] py-[5px] text-[13px] font-bold text-white bg-container-blue rounded-[20px] ${
        isTitleCenter && 'absolute left-1/2 transform -translate-x-1/2'
      }`}
    >
      {title}
    </div>
  )
}
