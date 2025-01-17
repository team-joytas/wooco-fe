import { customAxios } from '@/src/shared/axios'
import type { CourseType, CourseMockType } from '@/src/entities/course/type'

const courses = [
  {
    id: 1,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
  {
    id: 2,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
  {
    id: 3,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
  {
    id: 4,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
  {
    id: 5,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
  {
    id: 6,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    name: '강남 맛집 리스트',
    location: '강남구',
    categories: ['SNS 핫플', '맛집투어', '쇼핑'],
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    created_at: '2024.12.16',
    updated_at: '2024.12.17',
    planned_for: '2024.12.18',
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    comments_info: {
      summary: {
        count: 200,
      },
      comments: [
        {
          id: 1,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 2,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 3,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
        {
          id: 4,
          user: {
            id: 1,
            profile_url:
              'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
            name: '어쩔건데',
          },
          created_at: '2024.11.29',
          content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
        },
      ],
    },
    places: [
      {
        id: 1,
        place_name: '알베르',
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 3,
        place_name: '마녀주방',
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
      },
    ],
    likes: 200,
    views: 1000,
  },
]

const course = {
  id: 1,
  user: {
    is_like: false,
    profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
    name: '어쩔건데',
  },
  name: '강남 맛집 리스트',
  location: '강남구',
  categories: ['SNS 핫플', '맛집투어', '쇼핑'],
  content:
    '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
  image: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
  created_at: '2024.12.16',
  updated_at: '2024.12.17',
  planned_for: '2024.12.18',
  pass_from_create: {
    type: 'date',
    number: 2,
  },
  comments_info: {
    summary: {
      count: 200,
    },
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          profile_url:
            'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
          name: '어쩔건데',
        },
        created_at: '2024.11.29',
        content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
      },
      {
        id: 2,
        user: {
          id: 1,
          profile_url:
            'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
          name: '어쩔건데',
        },
        created_at: '2024.11.29',
        content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
      },
      {
        id: 3,
        user: {
          id: 1,
          profile_url:
            'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
          name: '어쩔건데',
        },
        created_at: '2024.11.29',
        content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
      },
      {
        id: 4,
        user: {
          id: 1,
          profile_url:
            'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
          name: '어쩔건데',
        },
        created_at: '2024.11.29',
        content: '맛있어요!!!!!!!!!!!!!!!!!!!!!',
      },
    ],
  },
  places: [
    {
      id: 1,
      place_name: '알베르',
      address_name: '서울 강남구 강남대로102길 34',
      x: '127.028098',
      y: '37.50304',
      image: [],
    },
    {
      id: 2,
      place_name: '땀땀 본점',
      address_name: '서울 강남구 강남대로98길 12-5',
      x: '127.027992',
      y: '37.500398',
      image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
    },
    {
      id: 3,
      place_name: '마녀주방',
      address_name: '서울 강남구 강남대로94길 9',
      x: '127.028079',
      y: '37.499486',
      image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
    },
    {
      id: 4,
      place_name: 'CGV 강남',
      address_name: '서울 강남구 강남대로 438',
      x: '127.026387',
      y: '37.501678',
      image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
    },
  ],
  likes: 200,
  views: 1000,
}

const trendingCourses = [
  {
    id: 1,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    created_at: '2025-01-01',
    updated_at: '',
    name: '강남 맛집 리스트',
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    places: [
      {
        id: 1,
        place_name: '알베르',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
      },
      {
        id: 3,
        place_name: '마녀주방',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
      },
    ],
    likes: 10,
    comments_info: {
      summary: {
        count: 10,
      },
    },
  },
  {
    id: 2,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    created_at: '2025-01-01',
    updated_at: '',
    name: '강남 맛집 리스트',
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    places: [
      {
        id: 1,
        place_name: '알베르',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
      },
      {
        id: 3,
        place_name: '마녀주방',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
      },
    ],
    likes: 10,
    comments_info: {
      summary: {
        count: 10,
      },
    },
  },
  {
    id: 3,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    created_at: '2025-01-01',
    updated_at: '',
    name: '강남 맛집 리스트',
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    places: [
      {
        id: 1,
        place_name: '알베르',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
      },
      {
        id: 3,
        place_name: '마녀주방',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
      },
    ],
    likes: 10,
    comments_info: {
      summary: {
        count: 10,
      },
    },
  },
  {
    id: 4,
    user: {
      is_like: false,
      profile_url: 'https://img.choroc.com/newshop/goods/009179/009179_1.jpg',
      name: '어쩔건데',
    },
    created_at: '2025-01-01',
    updated_at: '',
    name: '강남 맛집 리스트',
    content:
      '금강산도에서 즐길만한 SNS 핫플, 맛집, 쇼핑, 맛집투어, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑, 쇼핑',
    places: [
      {
        id: 1,
        place_name: '알베르',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로102길 34',
        x: '127.028098',
        y: '37.50304',
      },
      {
        id: 2,
        place_name: '땀땀 본점',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로98길 12-5',
        x: '127.027992',
        y: '37.500398',
      },
      {
        id: 3,
        place_name: '마녀주방',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로94길 9',
        x: '127.028079',
        y: '37.499486',
      },
      {
        id: 4,
        place_name: 'CGV 강남',
        image: ['https://img.choroc.com/newshop/goods/009179/009179_1.jpg'],
        address_name: '서울 강남구 강남대로 438',
        x: '127.026387',
        y: '37.501678',
      },
    ],
    likes: 10,
    comments_info: {
      summary: {
        count: 10,
      },
    },
  },
]

export const getMockCourses = async () => {
  return courses
}

export const getMockCourse = async (id: number): Promise<CourseMockType> => {
  return course
}

export const getTrendingCourses = async () => {
  return trendingCourses
}

export const getCourse = async (id: number): Promise<CourseType> => {
  try {
    const response = await customAxios.get(`/courses/${id}`)
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCourses = async () => {
  try {
    const response = await customAxios.get('/courses')
    return response.data.results
  } catch (error) {
    console.error(error)
    throw error
  }
}
