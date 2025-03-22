// import Image from 'next/image'
// import StarRate from '@/src/shared/ui/StarRate'
// import Spacer from '@/src/shared/ui/Spacer'
// import Link from 'next/link'
// import type { PlaceType } from '@/src/entities/place'

// interface CardUserPlaceProps {
//   data: PlaceType
// }

// export default function CardUserPlace({ data }: CardUserPlaceProps) {
//   return (
//     <div className='w-full h-fit px-[20px] flex flex-col'>
//       <div className='w-full justify-between flex gap-[10px]'>
//         <div className='flex flex-col'>
//           <div className='flex flex-col'>
//             <p className='text-main font-bold'>{data.place_name}</p>
//             <span className='text-sub opacity-50'>{data.created_at}</span>
//           </div>
//           <Spacer height={10} />
//           <div className='flex flex-col gap-[5px]'>
//             <span className='text-brand text-middle'>{data.star_rate}</span>
//             <StarRate rate={Number(data.star_rate)} size={10} />
//             <div className='flex gap-[8px]'>
//               {data.tags?.map((tag, index) => (
//                 <span
//                   className='px-[10px] py-[3px] text-[10px] rounded-[10px] bg-container-light-blue text-white'
//                   key={index}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//         <Image
//           className='rounded-[10px] w-[98px] h-[98px]'
//           width={98}
//           height={98}
//           src={data.image[0]}
//           alt={data.place_name}
//         />
//       </div>
//       <Spacer height={10} />
//       <span className='text-sub opacity-80 font-semibold break-keep line-clamp-2'>
//         {data.content}
//       </span>
//       <Spacer height={8} />
//       <div className='flex justify-end'>
//         <Link className='text-sub text-gray-400' href={`/courses/${data.id}`}>
//           더보기
//         </Link>
//       </div>
//     </div>
//   )
// }
