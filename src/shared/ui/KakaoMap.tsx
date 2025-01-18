'use client'

import { useEffect, useRef } from 'react'
import type { CoursePlaceType } from '@/src/entities/place/type'

interface KakaoMapProps {
  places: CoursePlaceType[]
  center?: number[]
  id: number
}

declare global {
  interface Window {
    kakao: typeof kakao
  }
}

export default function KakaoMap({ places, center, id }: KakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scriptId = `kakao-map-script-${id}`

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
          center: center
            ? new window.kakao.maps.LatLng(center[1], center[0])
            : new window.kakao.maps.LatLng(
                Number(places[0].latitude),
                Number(places[0].longitude)
              ),
          level: center ? 8 : 6,
        })

        if (places.length > 0) {
          places.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(
              Number(place.latitude),
              Number(place.longitude)
            )
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            })
            marker.setMap(map)

            const infoWindow = new window.kakao.maps.InfoWindow({
              content: `<div class="text-sm p-2">${place.name}</div>`,
            })
            window.kakao.maps.event.addListener(marker, 'click', () => {
              infoWindow.open(map, marker)
            })
          })
        }
      })
    }

    return () => {
      const script = document.getElementById(scriptId)
      if (script) {
        document.head.removeChild(script)
      }
    }
  }, [places, center, id])

  return (
    <div
      id={`map-${id}`}
      className='w-full mt-[10px] h-[180px] z-0'
      ref={mapContainerRef}
    />
  )
}
