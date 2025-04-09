import { Star, StarHalf } from 'lucide-react'

export function StarRateView({ rate, size }: { rate: number; size: number }) {
  const fullStars = Math.floor(rate)
  const hasHalfStar = rate % 1 >= 0.5

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
      <div className='flex gap-[2px] absolute top-0'>
        {Array.from({ length: fullStars }, (_, index) => (
          <Star key={index} fill='#9997F2' size={size} strokeWidth={0} />
        ))}
        {hasHalfStar && <StarHalf fill='#9997F2' size={size} strokeWidth={0} />}
      </div>
    </div>
  )
}
