interface Place {
  name: string
  address: string
  latlang: number[]
}

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
            name: '알베르',
            address: '서울 강남구 강남대로102길 34',
            latlang: [37.50304, 127.028098],
          },
          {
            name: '땀땀 본점',
            address: '서울 강남구 강남대로98길 12-5',
            latlang: [37.500398, 127.027992],
          },
          {
            name: '마녀주방',
            address: '서울 강남구 강남대로94길 9',
            latlang: [37.499486, 127.028079],
          },
          {
            name: 'CGV 강남',
            address: '서울 강남구 강남대로 438',
            latlang: [37.501678, 127.026387],
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
            name: '알베르',
            address: '서울 강남구 강남대로102길 34',
            latlang: [37.50304, 127.028098],
          },
          {
            name: '땀땀 본점',
            address: '서울 강남구 강남대로98길 12-5',
            latlang: [37.500398, 127.027992],
          },
          {
            name: '마녀주방',
            address: '서울 강남구 강남대로94길 9',
            latlang: [37.499486, 127.028079],
          },
          {
            name: 'CGV 강남',
            address: '서울 강남구 강남대로 438',
            latlang: [37.501678, 127.026387],
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
            name: '알베르',
            address: '서울 강남구 강남대로102길 34',
            latlang: [37.50304, 127.028098],
          },
          {
            name: '땀땀 본점',
            address: '서울 강남구 강남대로98길 12-5',
            latlang: [37.500398, 127.027992],
          },
          {
            name: '마녀주방',
            address: '서울 강남구 강남대로94길 9',
            latlang: [37.499486, 127.028079],
          },
          {
            name: 'CGV 강남',
            address: '서울 강남구 강남대로 438',
            latlang: [37.501678, 127.026387],
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
            name: '알베르',
            address: '서울 강남구 강남대로102길 34',
            latlang: [37.50304, 127.028098],
          },
          {
            name: '땀땀 본점',
            address: '서울 강남구 강남대로98길 12-5',
            latlang: [37.500398, 127.027992],
          },
          {
            name: '마녀주방',
            address: '서울 강남구 강남대로94길 9',
            latlang: [37.499486, 127.028079],
          },
          {
            name: 'CGV 강남',
            address: '서울 강남구 강남대로 438',
            latlang: [37.501678, 127.026387],
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
            name: '알베르',
            address: '서울 강남구 강남대로102길 34',
            latlang: [37.50304, 127.028098],
          },
          {
            name: '땀땀 본점',
            address: '서울 강남구 강남대로98길 12-5',
            latlang: [37.500398, 127.027992],
          },
          {
            name: '마녀주방',
            address: '서울 강남구 강남대로94길 9',
            latlang: [37.499486, 127.028079],
          },
          {
            name: 'CGV 강남',
            address: '서울 강남구 강남대로 438',
            latlang: [37.501678, 127.026387],
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
