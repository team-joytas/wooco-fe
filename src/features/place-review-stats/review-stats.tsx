import { PlaceReviewStatsType } from '@/src/entities/place'
import { Spacer, StarRate } from '@/src/shared/ui'

interface StatsReviewProps {
  placeOnLineReviewStats: PlaceReviewStatsType[]
  AverageRating: number
}

export function ReviewStats({
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
    {
      color: '#D9D9D9',
      fontWeight: 'font-light',
      fontSize: 'text-sub',
    },
  ]

  return (
    <div className='flex flex-row items-center max-gap-[33px] h-[190px]'>
      <div className='flex w-full justify-start gap-[10px] px-[10px]'>
        {placeOnLineReviewStats.map((stats, index) => {
          const height =
            stats.count && (index === 0 ? 120 : (stats.count / maxCount) * 120)

          return (
            <div
              key={stats.contents}
              className='flex flex-col min-w-[30px] max-w-[56px] justify-between items-center gap-[10px]'
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
                />
                <Spacer height={13} />
                <div className='flex flex-col items-center h-[40px]'>
                  <span className='h-[20px]'>{stats.contents}</span>
                  <span className='h-[20px]'>{stats.count}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='flex flex-col items-center text-brand font-semibold'>
        <span className='text-main'>총점</span>
        <span className='text-headline'>{AverageRating.toFixed(1)}</span>
        <StarRate rate={AverageRating} size={10} />
      </div>
    </div>
  )
}
