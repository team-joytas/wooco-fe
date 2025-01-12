export default function getData() {
  const data = {
    id: 1,
    user: {
      isLike: false,
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
    pass_from_create: {
      type: 'date',
      number: 2,
    },
    likes: 200,
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
    views: 300,
  }

  return data
}
