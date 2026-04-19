"use client";
import Image from "next/image";

const DESTINATION = {
  name: "르비르모어 선릉",
  // 서울 강남구 테헤란로 406 (르비르모어 선릉) 인근 좌표
  lat: 37.5049,
  lng: 127.0506,
};

const TMAP_APP_URL = `tmap://route?goalname=${encodeURIComponent(DESTINATION.name)}&goalx=${DESTINATION.lng}&goaly=${DESTINATION.lat}`;
const TMAP_IOS_STORE_URL = "https://apps.apple.com/kr/app/%ED%8B%B0%EB%A7%B5-%EC%9E%A5%EC%86%8C%EC%B6%94%EC%B2%9C-%EC%A7%80%EB%8F%84-%EC%9A%B4%EC%A0%84%EC%A0%90%EC%88%98-%EB%8C%80%EC%A4%91%EA%B5%90%ED%86%B5-%EB%8C%80%EB%A6%AC/id431589174";
const TMAP_ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=com.skt.tmap.ku";
const KAKAO_APP_URL = `kakaomap://route?ep=${DESTINATION.lat},${DESTINATION.lng}&by=car`;
const KAKAO_WEB_URL = `https://map.kakao.com/link/to/${encodeURIComponent(DESTINATION.name)},${DESTINATION.lat},${DESTINATION.lng}`;
const KAKAO_IOS_STORE_URL = "https://apps.apple.com/kr/app/%EC%B9%B4%EC%B9%B4%EC%98%A4%EB%A7%B5-%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD-no-1-%EC%A7%80%EB%8F%84%EC%95%B1/id304608425";
const KAKAO_ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=net.daum.android.map";
const NAVER_IOS_STORE_URL = "https://apps.apple.com/kr/app/naver-map-navigation/id311867728";
const NAVER_ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=com.nhn.android.nmap";

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function openWithFallback(appUrl: string, fallbackUrl: string) {
  const startedAt = Date.now();
  window.location.href = appUrl;

  const timer = window.setTimeout(() => {
    const elapsed = Date.now() - startedAt;
    if (document.visibilityState === "visible" && elapsed < 2200) {
      window.location.href = fallbackUrl;
    }
  }, 1200);

  const clear = () => window.clearTimeout(timer);
  window.addEventListener("pagehide", clear, { once: true });
  document.addEventListener("visibilitychange", clear, { once: true });
}

export default function NavigationButtons() {
  const openTmap = () => {
    const storeUrl = isIOS() ? TMAP_IOS_STORE_URL : TMAP_ANDROID_STORE_URL;
    openWithFallback(TMAP_APP_URL, storeUrl);
  };

  const openKakao = () => {
    const storeUrl = isIOS() ? KAKAO_IOS_STORE_URL : KAKAO_ANDROID_STORE_URL;
    openWithFallback(KAKAO_APP_URL, KAKAO_WEB_URL || storeUrl);
  };

  const openNaver = () => {
    const appName = encodeURIComponent(window.location.origin);
    const naverUrl = `nmap://route/car?dlat=${DESTINATION.lat}&dlng=${DESTINATION.lng}&dname=${encodeURIComponent(DESTINATION.name)}&appname=${appName}`;
    const storeUrl = isIOS() ? NAVER_IOS_STORE_URL : NAVER_ANDROID_STORE_URL;
    openWithFallback(naverUrl, storeUrl);
  };

  return (
    <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
      <button
        type="button"
        onClick={openTmap}
        className="flex items-center justify-center gap-2 rounded-md border border-black/10 bg-[#F6F6F6] px-2 py-2 text-[12px] sm:text-[13px] leading-none font-sans font-semibold text-[#3A3A3A] shadow-[0_1px_3px_rgba(0,0,0,0.08)] active:scale-[0.99]"
      >
        <Image src="/image/nav-icons/tmap.png" alt="티맵 아이콘" width={20} height={20} className="h-5 w-5 object-contain" />
        티맵
      </button>
      <button
        type="button"
        onClick={openKakao}
        className="flex items-center justify-center gap-2 rounded-md border border-black/10 bg-[#F6F6F6] px-2 py-2 text-[12px] sm:text-[13px] leading-none font-sans font-semibold text-[#3A3A3A] shadow-[0_1px_3px_rgba(0,0,0,0.08)] active:scale-[0.99]"
      >
        <Image src="/image/nav-icons/kakaomap.png" alt="카카오맵 아이콘" width={20} height={20} className="h-5 w-5 object-contain" />
        카카오맵
      </button>
      <button
        type="button"
        onClick={openNaver}
        className="flex items-center justify-center gap-2 rounded-md border border-black/10 bg-[#F6F6F6] px-2 py-2 text-[12px] sm:text-[13px] leading-none font-sans font-semibold text-[#3A3A3A] shadow-[0_1px_3px_rgba(0,0,0,0.08)] active:scale-[0.99]"
      >
        <Image src="/image/nav-icons/navermap.png" alt="네이버지도 아이콘" width={20} height={20} className="h-5 w-5 object-contain" />
        네이버지도
      </button>
    </div>
  );
}
