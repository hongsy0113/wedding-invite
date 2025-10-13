"use client";

import { useEffect, useRef, useState } from "react";

type KakaoNamespace = typeof window & {
  kakao?: any;
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
      win.kakao.maps.load(() => {
        if (!containerRef.current) return;
        // Default center (Gangnam area) before geocoding so a map shows immediately
        const defaultCenter = new win.kakao.maps.LatLng(37.5049, 127.0506);
        const map = new win.kakao.maps.Map(containerRef.current, {
          center: defaultCenter,
          level: 3,
        });
        const marker = new win.kakao.maps.Marker({ position: defaultCenter });
        marker.setMap(map);

        const geocoder = new win.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result: any[], status: string) => {
          if (status === win.kakao.maps.services.Status.OK && result.length > 0) {
            const { x, y } = result[0];
            const center = new win.kakao.maps.LatLng(Number(y), Number(x));
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


