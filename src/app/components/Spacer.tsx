export default function Spacer({
  className,
  height,
}: {
  className?: string
  height: number
}) {
  return (
    <div
      className={className}
      style={{ width: '100%', height: `${height}px` }}
    />
  )
}
