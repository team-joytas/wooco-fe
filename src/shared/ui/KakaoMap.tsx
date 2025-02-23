'use client'

import { useEffect, useRef } from 'react'
import type {
  CoursePlanPlaceType,
  KakaoPlaceType,
} from '@/src/entities/place/type'

interface ActiveKakaoMapProps {
  places: CoursePlanPlaceType[]
  center?: number[]
}

interface KakaoMapProps {
  place: KakaoPlaceType
}

declare global {
  interface Window {
    kakao: typeof kakao
  }
}

export default function ActiveKakaoMap({
  places,
  center,
}: ActiveKakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  // places 배열 업데이트 중, 맵 정보 임시 저장을 위한 ref
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const markersRef = useRef<kakao.maps.Marker[]>([])

  useEffect(() => {
    const scriptId = `kakao-map-script` // Kakao maps script가 전역으로 다중 선언되면 충돌이 발생할 가능성 있음
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`
      script.async = true
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeMap()
        })
      }
      document.head.appendChild(script)
    } else {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap()
        })
      }
    }
  }, [])

  const initializeMap = () => {
    if (!mapContainerRef.current) return
    if (mapRef.current) return

    const map = new window.kakao.maps.Map(mapContainerRef.current, {
      center: center
        ? new window.kakao.maps.LatLng(center[1], center[0])
        : new window.kakao.maps.LatLng(
            Number(places[0]?.latitude || 37),
            Number(places[0]?.longitude || 127)
          ),
      level: center ? 8 : 6,
    })

    mapRef.current = map
    updateMarkers(places)
  }

  useEffect(() => {
    if (!mapRef.current) return
    updateMarkers(places)
  }, [places])

  const updateMarkers = (places: CoursePlanPlaceType[]) => {
    const map = mapRef.current
    if (!map) return

    // 존재하는 모든 마커를 우선 초기화
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // places 배열을 바탕으로 마커 재생성
    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(
        Number(place.latitude),
        Number(place.longitude)
      )

      const marker = new window.kakao.maps.Marker({
        position,
        map,
      })

      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `<div class="text-sm p-2">${place.name}</div>`,
      })
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(map, marker)
      })

      // 변경사항 저장
      markersRef.current.push(marker)
    })
  }

  return (
    <div className='w-full mt-[10px] h-[180px] z-0' ref={mapContainerRef} />
  )
}

export function KakaoMap({ place }: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scriptId = `kakao-map-script`

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false&libraries=services`
      script.async = true
      script.onload = initializeMap
      document.head.appendChild(script)
    } else {
      if (window.kakao && window.kakao.maps) {
        initializeMap()
      }
    }

    function initializeMap() {
      if (!mapContainerRef.current) return

      window.kakao.maps.load(() => {
        if (!mapContainerRef.current || !window.kakao || !window.kakao.maps)
          return

        const map = new window.kakao.maps.Map(mapContainerRef.current, {
          center: new window.kakao.maps.LatLng(place.latitude, place.longitude),
          level: 6,
        })

        const markerPosition = new window.kakao.maps.LatLng(
          place.latitude,
          place.longitude
        )
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        })
        marker.setMap(map)

        // 마커 클릭 이벤트
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `<div class="text-sm p-2">${place.name}</div>`,
        })
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker)
        })
      })
    }

    return () => {
      const script = document.getElementById(scriptId)
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [place])

  return (
    <div
      className='w-[310px] mt-[10px] h-[180px] rounded-[10px] z-0'
      ref={mapContainerRef}
    />
  )
}
