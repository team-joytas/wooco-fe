export function HelperText({
  message,
  margin,
}: {
  message: string
  margin?: string
}) {
  return (
    <span
      className={`text-[10px] pl-[10px] text-red-500 ${margin ? margin : 'mt-[-5px]'}`}
    >
      {message}
    </span>
  )
}
