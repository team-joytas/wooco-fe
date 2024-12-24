import Image from 'next/image'
import getData from '../users/[id]/getData'
import {
  HeartFilled,
  FlagFilled,
  MessageFilled,
  CalendarFilled,
  ThunderboltFilled,
  NotificationFilled,
} from '@ant-design/icons'
import { useRouter } from 'next/navigation'

interface MenuItemsProps {
  id: number
  name: string
  to: string
  icon: JSX.Element
}

interface MenuProps {
  id: number
  name: string
  items: MenuItemsProps[]
}

export default function Menu({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const router = useRouter()
  const userInfo = getData().user_info
  const menuList: MenuProps[] = [
    {
      id: 1,
      name: '나의 활동',
      items: [
        {
          id: 1,
          name: '관심 목록',
          to: '/users/1/like',
          icon: <HeartFilled />,
        },
        {
          id: 2,
          name: '내가 작성한 코스',
          to: '/users/1',
          icon: <FlagFilled />,
        },
        {
          id: 3,
          name: '내가 작성한 댓글',
          to: '/',
          icon: <MessageFilled />,
        },
        {
          id: 4,
          name: '나의 일정',
          to: '/schedules',
          icon: <CalendarFilled />,
        },
      ],
    },
    {
      id: 2,
      name: '우코 소식',
      items: [
        {
          id: 1,
          name: '진행 중인 이벤트',
          to: '/',
          icon: <ThunderboltFilled />,
        },
        {
          id: 2,
          name: '공지사항',
          to: '/',
          icon: <NotificationFilled />,
        },
      ],
    },
  ]

  const handleClickEdit = () => {
    setIsOpen(false)
    router.push('/users/1/setting')
  }

  return (
    <div className='fixed top-0 right-0 w-[80vw] max-w-[300px] h-full bg-white z-50'>
      <div className='flex flex-col items-start justify-start h-full py-[50px] px-[25px]'>
        <div className='flex flex-row px-[10px]'>
          <div className='w-[42px] h-[42px] rounded-full overflow-hidden relative'>
            <Image
              src={userInfo.profile_url}
              alt='profile'
              layout='fill'
              className='object-cover'
            />
          </div>
          <div className='flex flex-col ml-[20px] gap-[5px]'>
            <div className='text-[14px] font-bold text-black-500'>
              {userInfo.name}
            </div>
            <div
              className='text-[10px] text-gray-400 underline cursor-pointer'
              onClick={() => handleClickEdit()}
            >
              수정하기
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-[50px] mt-[50px] pl-[10px]'>
          {menuList.map((menu) => (
            <div className='flex flex-col gap-[15px]' key={menu.id}>
              <span className='font-bold text-[14px]'>{menu.name}</span>
              {menu.items.map((item) => (
                <ul
                  key={item.id}
                  className='flex flex-row items-center gap-[10px] text-[13px] cursor-pointer'
                  onClick={() => {
                    setIsOpen(false)
                    router.push(item.to)
                  }}
                >
                  <li>{item.icon}</li>
                  <li>{item.name}</li>
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
