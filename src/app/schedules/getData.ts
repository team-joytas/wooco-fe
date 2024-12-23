import { Place } from '../components/SearchPlace'

export interface Course {
  id: number
  location: string
  places: Place[]
  created_at: string
  updated_at: string
  planned_for: string
}

interface Data {
  user_name: string
  courses: Course[]
}

export default function getData() {
  const data: Data = {
    user_name: '홍인데유',
    courses: [
      {
        id: 1,
        location: '강남구',
        places: [
          {
            place_name: '알베르',
            address_name: '서울 강남구 강남대로102길 34',
            x: '127.028098',
            y: '37.50304',
          },
          {
            place_name: '땀땀 본점',
            address_name: '서울 강남구 강남대로98길 12-5',
            x: '127.027992',
            y: '37.500398',
          },
          {
            place_name: '마녀주방',
            address_name: '서울 강남구 강남대로94길 9',
            x: '127.028079',
            y: '37.499486',
          },
          {
            place_name: 'CGV 강남',
            address_name: '서울 강남구 강남대로 438',
            x: '127.026387',
            y: '37.501678',
          },
        ],
        created_at: '2024.12.16',
        updated_at: '',
        planned_for: '2024.12.16',
      },
      {
        id: 2,
        location: '강남구',
        places: [
          {
            place_name: '알베르',
            address_name: '서울 강남구 강남대로102길 34',
            x: '127.028098',
            y: '37.50304',
          },
          {
            place_name: '땀땀 본점',
            address_name: '서울 강남구 강남대로98길 12-5',
            x: '127.027992',
            y: '37.500398',
          },
          {
            place_name: '마녀주방',
            address_name: '서울 강남구 강남대로94길 9',
            x: '127.028079',
            y: '37.499486',
          },
          {
            place_name: 'CGV 강남',
            address_name: '서울 강남구 강남대로 438',
            x: '127.026387',
            y: '37.501678',
          },
        ],
        created_at: '2024.12.16',
        updated_at: '',
        planned_for: '2024.12.16',
      },
      {
        id: 3,
        location: '강남구',
        places: [
          {
            place_name: '알베르',
            address_name: '서울 강남구 강남대로102길 34',
            x: '127.028098',
            y: '37.50304',
          },
          {
            place_name: '땀땀 본점',
            address_name: '서울 강남구 강남대로98길 12-5',
            x: '127.027992',
            y: '37.500398',
          },
          {
            place_name: '마녀주방',
            address_name: '서울 강남구 강남대로94길 9',
            x: '127.028079',
            y: '37.499486',
          },
          {
            place_name: 'CGV 강남',
            address_name: '서울 강남구 강남대로 438',
            x: '127.026387',
            y: '37.501678',
          },
        ],
        created_at: '2024.12.16',
        updated_at: '',
        planned_for: '2024.12.16',
      },
      {
        id: 4,
        location: '강남구',
        places: [
          {
            place_name: '알베르',
            address_name: '서울 강남구 강남대로102길 34',
            x: '127.028098',
            y: '37.50304',
          },
          {
            place_name: '땀땀 본점',
            address_name: '서울 강남구 강남대로98길 12-5',
            x: '127.027992',
            y: '37.500398',
          },
          {
            place_name: '마녀주방',
            address_name: '서울 강남구 강남대로94길 9',
            x: '127.028079',
            y: '37.499486',
          },
          {
            place_name: 'CGV 강남',
            address_name: '서울 강남구 강남대로 438',
            x: '127.026387',
            y: '37.501678',
          },
        ],
        created_at: '2024.12.16',
        updated_at: '',
        planned_for: '2024.12.16',
      },
      {
        id: 5,
        location: '강남구',
        places: [
          {
            place_name: '알베르',
            address_name: '서울 강남구 강남대로102길 34',
            x: '127.028098',
            y: '37.50304',
          },
          {
            place_name: '땀땀 본점',
            address_name: '서울 강남구 강남대로98길 12-5',
            x: '127.027992',
            y: '37.500398',
          },
          {
            place_name: '마녀주방',
            address_name: '서울 강남구 강남대로94길 9',
            x: '127.028079',
            y: '37.499486',
          },
          {
            place_name: 'CGV 강남',
            address_name: '서울 강남구 강남대로 438',
            x: '127.026387',
            y: '37.501678',
          },
        ],
        created_at: '2024.12.16',
        updated_at: '',
        planned_for: '2024.12.16',
      },
    ],
  }
  return data
}
