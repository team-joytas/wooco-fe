import PlaceComponent from './PlaceComponent'

interface Place {
  id: number
  name: string
  star_rate: string
  created_at: string
  tags: string[]
  images: string[]
  content: string
}

export default function PlaceListComponent({ data }: { data: Place[] }) {
  return (
    <div className='mt-[40px] flex flex-col gap-[20px]'>
      {data.map((place, index) => (
        <div key={index}>
          <PlaceComponent data={place} />
          {index < data.length - 1 && (
            <div className='mt-[20px] h-[1px] bg-gray-100' />
          )}
        </div>
      ))}
    </div>
  )
}
