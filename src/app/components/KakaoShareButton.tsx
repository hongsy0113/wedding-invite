"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronUp, Share2 } from "lucide-react";

declare global {
  interface Window {
    Kakao?: {
      init: (appKey: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: "feed";
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

const KAKAO_SDK_URL = "https://developers.kakao.com/sdk/js/kakao.min.js";
const SHARE_TITLE = "홍성윤 ♥ 김민지 결혼합니다.";
const SHARE_DESCRIPTION = "2026년 7월 11일 토요일 오후 5시, 르비르모어 선릉";
const OG_IMAGE_PATH = "/image/optimized/main-image.jpg";
const FALLBACK_SITE_URL = "https://sungyoon-minji.vercel.app";

export default function KakaoShareButton() {
  const [isReady, setIsReady] = useState(false);

  const initializeKakao = useCallback(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey || !window.Kakao) return false;
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(appKey);
    }
    setIsReady(true);
    return true;
  }, []);

  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey) return;

    if (window.Kakao) {
      initializeKakao();
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = () => initializeKakao();
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [initializeKakao]);

  const onShare = useCallback(() => {
    const ready = initializeKakao() || isReady;
    if (!window.Kakao || !ready) {
      alert("카카오 공유를 초기화하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const { origin, href } = window.location;
    const baseOrigin = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL || origin;
    const pageUrl = href.split("#")[0];
    const ogImageMeta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
    const ogImageUrl = ogImageMeta?.content
      ? new URL(ogImageMeta.content, baseOrigin).toString()
      : new URL(OG_IMAGE_PATH, baseOrigin).toString();

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: SHARE_TITLE,
        description: SHARE_DESCRIPTION,
        imageUrl: ogImageUrl,
        link: {
          mobileWebUrl: pageUrl,
          webUrl: pageUrl,
        },
      },
      buttons: [
        {
          title: "청첩장 보기",
          link: {
            mobileWebUrl: pageUrl,
            webUrl: pageUrl,
          },
        },
      ],
    });
  }, [initializeKakao, isReady]);

  const onScrollTop = useCallback(() => {
    const main = document.querySelector("main");
    if (main instanceof HTMLElement && main.scrollHeight > main.clientHeight) {
      main.scrollTo({ top: 0, behavior: "smooth" });
    }
    const scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      scrollingElement.scrollTo({ top: 0, behavior: "smooth" });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="fixed bottom-8 right-5 z-40 flex flex-col items-center gap-3.5 sm:bottom-10 sm:right-7">
      <button
        type="button"
        onClick={onScrollTop}
        aria-label="맨 위로 이동"
        className="flex h-[clamp(42px,11.5vw,50px)] w-[clamp(42px,11.5vw,50px)] items-center justify-center rounded-full bg-[#D9D9D9]/95 text-white shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition hover:brightness-95 active:scale-[0.98]"
      >
        <ChevronUp size={20} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        onClick={onShare}
        aria-label="카카오톡 공유하기"
        className="flex h-[clamp(42px,11.5vw,50px)] w-[clamp(42px,11.5vw,50px)] items-center justify-center rounded-full bg-[#D9D9D9]/95 text-white shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition hover:brightness-95 active:scale-[0.98]"
      >
        <Share2 size={16} strokeWidth={2.1} />
      </button>
    </div>
  );
}
