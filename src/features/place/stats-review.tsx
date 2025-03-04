import { PlaceReviewStatsType } from '@/src/entities/place/type'
import Spacer from '@/src/shared/ui/Spacer'
import StarRate from '@/src/shared/ui/StarRate'

interface StatsReviewProps {
  placeOnLineReviewStats: PlaceReviewStatsType[]
  AverageRating: number
}

export default function StatsReview({
  placeOnLineReviewStats,
  AverageRating,
}: StatsReviewProps) {
  if (!placeOnLineReviewStats.length) return null

  const maxCount = placeOnLineReviewStats[0].count || 1
  const barSetting = [
    {
      color: '#5A59F2',
      fontWeight: 'font-semibold',
      fontSize: 'text-main',
    },
    {
      color: '#9997F2',
      fontWeight: 'font-normal',
      fontSize: 'text-middle',
    },
    {
      color: '#B3BAF1',
      fontWeight: 'font-light',
      fontSize: 'text-sub',
    },
    {
      color: 'rgba(179, 186, 241, 1)',
      fontWeight: 'font-light',
      fontSize: 'text-sub',
    },
  ]

  return (
    <div className='flex flex-row items-center gap-[33px]'>
      <div className='flex w-full justify-between px-[10px]'>
        {placeOnLineReviewStats.map((stats, index) => {
          const height =
            stats.count && (index === 0 ? 120 : (stats.count / maxCount) * 120)

          return (
            <div
              key={stats.contents}
              className='flex flex-col justify-between items-center'
            >
              <span className='text-xs text-gray-500'>{index + 1}위</span>
              <div
                className={`flex flex-col items-center ${barSetting[index].fontSize} ${barSetting[index].fontWeight}`}
                style={{ color: barSetting[index].color }}
              >
                <div
                  className='rounded-full w-[17px]'
                  style={{
                    height: `${height}px`,
                    backgroundColor: barSetting[index].color,
                  }}
                ></div>
                <Spacer height={13} />
                <span>{stats.contents}</span>
                <span>{stats.count}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col items-center text-brand font-semibold'>
        <span className='text-main'>총점</span>
        <span className='text-headline'>{AverageRating}</span>
        <StarRate rate={AverageRating} size={10} />
      </div>
    </div>
  )
}
