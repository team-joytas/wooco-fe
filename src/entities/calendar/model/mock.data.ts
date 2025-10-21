// mock.data.ts
import { CalendarPlanType } from '@/src/entities/calendar/model'

export const mockCalendarPlans: CalendarPlanType[] = [
  {
    title: '서촌 카페 투어',
    groupName: '개인',
    groupColor: 'FF7B5A',
    groupSize: 1,
    date: '2025-10-07',
    place: [
      {
        id: 'p1',
        name: '알베르',
        latitude: 37.579617,
        longitude: 126.971223,
        address: '서울 종로구 자하문로 56',
        kakao_place_id: '123456',
        average_rating: 4.6,
        review_count: 120,
        phone_number: '02-1234-5678',
        thumbnail_url: 'https://example.com/cafe1.jpg',
        place_one_line_review_stats: [
          { contents: '분위기 좋아요', count: 12 },
          { contents: '커피 맛있어요', count: 8 },
        ],
      },
    ],
  },
  {
    title: '한강 피크닉',
    groupName: '친구들',
    groupColor: '5AC8FA',
    groupSize: 4,
    date: '2025-10-07',
    place: [
      {
        id: 'p2',
        name: '여의도 한강공원',
        latitude: 37.52852,
        longitude: 126.9326,
        address: '서울 영등포구 여의동로 330',
        kakao_place_id: '234567',
        average_rating: 4.7,
        review_count: 87,
        phone_number: '02-0000-0000',
        thumbnail_url: 'https://example.com/park.jpg',
        place_one_line_review_stats: [
          { contents: '경치가 좋아요', count: 10 },
          { contents: '돗자리 필수', count: 5 },
        ],
      },
    ],
  },
  {
    title: '강릉 주말 여행',
    groupName: '가족',
    groupColor: '34C759',
    groupSize: 3,
    date: '2025-10-12',
    place: [
      {
        id: 'p3',
        name: '안목해변',
        latitude: 37.7728,
        longitude: 128.9481,
        address: '강원 강릉시 창해로 17',
        kakao_place_id: '345678',
        average_rating: 4.8,
        review_count: 210,
        phone_number: '033-123-4567',
        thumbnail_url: 'https://example.com/beach.jpg',
        place_one_line_review_stats: [
          { contents: '뷰가 멋져요', count: 20 },
          { contents: '커피거리 최고', count: 15 },
        ],
      },
    ],
  },
  {
    title: '남산 야경 데이트',
    groupName: '연인',
    groupColor: 'FF2D55',
    groupSize: 2,
    date: '2025-10-18',
    place: [
      {
        id: 'p4',
        name: '남산서울타워',
        latitude: 37.5512,
        longitude: 126.9882,
        address: '서울 용산구 남산공원길 105',
        kakao_place_id: '456789',
        average_rating: 4.5,
        review_count: 560,
        phone_number: '02-345-6789',
        thumbnail_url: 'https://example.com/tower.jpg',
        place_one_line_review_stats: [
          { contents: '야경이 아름다워요', count: 30 },
          { contents: '데이트 명소', count: 22 },
        ],
      },
    ],
  },
  {
    title: '팀 회식',
    groupName: '회사',
    groupColor: '5856D6',
    groupSize: 6,
    date: '2025-10-25',
    place: [
      {
        id: 'p5',
        name: '을지로 노가리골목',
        latitude: 37.5665,
        longitude: 126.9922,
        address: '서울 중구 을지로3가 337-1',
        kakao_place_id: '567890',
        average_rating: 4.3,
        review_count: 340,
        phone_number: '02-6789-1234',
        thumbnail_url: 'https://example.com/izakaya.jpg',
        place_one_line_review_stats: [
          { contents: '회식하기 좋아요', count: 18 },
          { contents: '분위기 활기차요', count: 9 },
        ],
      },
    ],
  },
]

export default mockCalendarPlans
