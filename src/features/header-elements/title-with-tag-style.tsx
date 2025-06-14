export function TitleWithTagStyle({
  title,
  isTitleCenter,
}: {
  title: string
  isTitleCenter?: boolean
}) {
  if (!title) return null

  return title.length === 0 ? (
    <div
      className={` text-main01 font-semibold w-[100px] h-[35.5px] rounded-[20px] bg-container-blue leading-normal ${
        isTitleCenter && 'absolute left-1/2 transform -translate-x-1/2'
      }`}
    />
  ) : (
    <div
      className={`px-[20px] py-[8px] text-main01 text-white bg-container-blue max-w-[90%] truncate rounded-[2025px] ${
        isTitleCenter && 'absolute left-1/2 transform -translate-x-1/2'
      }`}
      title={title}
    >
      {title}
    </div>
  )
}
