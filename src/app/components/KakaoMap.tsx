"use client";

import { useEffect, useRef, useState } from "react";

// Minimal type surface for Kakao Maps used in this component (enough to satisfy ESLint/types)
type KakaoLatLng = object;
interface KakaoMap {
  setCenter: (latlng: KakaoLatLng) => void;
}
interface KakaoMarker {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (latlng: KakaoLatLng) => void;
}
interface KakaoGeocoder {
  addressSearch: (
    query: string,
    cb: (result: { x: string; y: string }[], status: string) => void
  ) => void;
}
type Kakao = {
  maps: {
    LatLng: new (lat: number, lng: number) => KakaoLatLng;
    Map: new (
      container: HTMLElement,
      opts: { center: KakaoLatLng; level: number }
    ) => KakaoMap;
    Marker: new (opts: { position: KakaoLatLng }) => KakaoMarker;
    services: {
      Geocoder: new () => KakaoGeocoder;
      Status: { OK: string };
    };
    load: (cb: () => void) => void;
  };
};

type KakaoNamespace = typeof window & {
  kakao?: Kakao;
};

export default function KakaoMap({ address, height = 0 }: { address: string; height?: number }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const win = window as KakaoNamespace;
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey) {
      setError("Kakao JavaScript 키가 설정되지 않았습니다.");
      return;
    }

    function init() {
      if (!win.kakao || !win.kakao.maps) return;
      const kakao = win.kakao; // narrow type after guard
      kakao.maps.load(() => {
        if (!containerRef.current) return;
        // Default center (Gangnam area) before geocoding so a map shows immediately
        const defaultCenter = new kakao.maps.LatLng(37.5049, 127.0506);
        const map = new kakao.maps.Map(containerRef.current, {
          center: defaultCenter,
          level: 3,
        });
        const marker = new kakao.maps.Marker({ position: defaultCenter });
        marker.setMap(map);

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: { x: string; y: string }[], status: string) => {
          if (status === kakao.maps.services.Status.OK && result.length > 0) {
            const { x, y } = result[0];
            const center = new kakao.maps.LatLng(Number(y), Number(x));
            map.setCenter(center);
            marker.setPosition(center);
          } else {
            setError("주소 지오코딩 실패: 대략 위치로 표시합니다.");
          }
          setReady(true);
        });
      });
    }

    if (win.kakao && win.kakao.maps) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);

    return () => {
      // best-effort cleanup
      script.onload = null;
    };
  }, [address]);

  return (
    <div className="relative w-full h-full" style={{ height: height || undefined }}>
      <div ref={containerRef} className="w-full h-full" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500">
          {error || "지도를 불러오는 중..."}
        </div>
      )}
    </div>
  );
}


