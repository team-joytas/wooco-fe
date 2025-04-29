import { Star } from 'lucide-react'

export function SkeletonStarRateView({ size }: { size: number }) {
  return (
    <div className='relative'>
      <div className='flex gap-[2px]'>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            fill='#d9d9d9'
            size={size}
            stroke='#9997F2'
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  )
}
