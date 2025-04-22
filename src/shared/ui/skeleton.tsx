export function SkeletonDiv({
  width,
  height,
  className,
}: {
  width?: number
  height: number
  className?: string
}) {
  return (
    <div
      className={`animate-pulse bg-gray-300 ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  )
}
