interface Data {
  value: string
  label: string
  children?: Data[]
}

export default function getData() {
  const data: Data[] = [
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

  const latlngMapping: { [key in string]: number[] } = {
    gangnam: [37.5172, 127.0473],
    gangdong: [37.5473, 127.146],
    gangbuk: [37.6397, 127.0256],
    gangseo: [37.5509, 126.8495],
    gwanak: [37.4783, 126.9516],
    gwangjin: [37.5387, 127.0822],
    guro: [37.4955, 126.8876],
    geumcheon: [37.4574, 126.8959],
    nowon: [37.6553, 127.0778],
    dobong: [37.6688, 127.0467],
    dongdaemun: [37.5743, 127.0397],
    dongjak: [37.5125, 126.9396],
    mapo: [37.5638, 126.9085],
    seodaemun: [37.5791, 126.9368],
    seocho: [37.4836, 127.0329],
    seongdong: [37.5633, 127.0371],
    seongbuk: [37.5894, 127.0167],
    songpa: [37.5145, 127.105],
    yangcheon: [37.5167, 126.8665],
    yeongdeungpo: [37.5264, 126.8962],
    yongsan: [37.5326, 126.9906],
    eunpyeong: [37.6176, 126.9227],
    jongno: [37.5735, 126.979],
    jung: [37.5636, 126.9976],
    jungrang: [37.6066, 127.0926],
  }

  return { data, latlngMapping }
}
