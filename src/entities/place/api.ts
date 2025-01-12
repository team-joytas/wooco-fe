const seoulData = [
  {
    value: 'seoul',
    label: '서울특별시',
    children: [
      { value: 'gangnam', label: '강남구' },
      { value: 'gangdong', label: '강동구' },
      { value: 'gangbuk', label: '강북구' },
      { value: 'gangseo', label: '강서구' },
      { value: 'gwanak', label: '관악구' },
      { value: 'gwangjin', label: '광진구' },
      { value: 'guro', label: '구로구' },
      { value: 'geumcheon', label: '금천구' },
      { value: 'nowon', label: '노원구' },
      { value: 'dobong', label: '도봉구' },
      { value: 'dongdaemun', label: '동대문구' },
      { value: 'dongjak', label: '동작구' },
      { value: 'mapo', label: '마포구' },
      { value: 'seodaemun', label: '서대문구' },
      { value: 'seocho', label: '서초구' },
      { value: 'seongdong', label: '성동구' },
      { value: 'seongbuk', label: '성북구' },
      { value: 'songpa', label: '송파구' },
      { value: 'yangcheon', label: '양천구' },
      { value: 'yeongdeungpo', label: '영등포구' },
      { value: 'yongsan', label: '용산구' },
      { value: 'eunpyeong', label: '은평구' },
      { value: 'jongno', label: '종로구' },
      { value: 'jung', label: '중구' },
      { value: 'jungrang', label: '중랑구' },
    ],
  },
]

export const getSeoulData = async () => {
  return seoulData
}
