"use client";

import { useCallback, useEffect, useState } from "react";

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
const SHARE_DESCRIPTION = "2026년 7월 11일 토요일 17시, 르비르모어 선릉";
const OG_IMAGE_PATH = "/image/optimized/main-image.jpg";
const FALLBACK_SITE_URL = "https://sungyoon-minji.vercel.app";

export default function KakaoShareButton() {
  const [isReady, setIsReady] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey) return;

    const initialize = () => {
      if (!window.Kakao) return;
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(appKey);
      }
      setIsReady(true);
    };

    if (window.Kakao) {
      initialize();
      return;
    }

    const script = document.createElement("script");
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.onload = initialize;
    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  const onShare = useCallback(() => {
    if (!window.Kakao || !isReady) {
      alert("카카오 공유를 초기화하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const { origin, pathname } = window.location;
    const baseOrigin = process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL || origin;
    const pageUrl = new URL(pathname, baseOrigin).toString();
    const venuePageUrl = new URL("/venue-map", baseOrigin).toString();
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
        {
          title: "위치 보기",
          link: {
            mobileWebUrl: venuePageUrl,
            webUrl: venuePageUrl,
          },
        },
      ],
    });
  }, [isReady]);

  const onCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1500);
    } catch {
      alert("링크 복사에 실패했습니다. 다시 시도해 주세요.");
    }
  }, []);

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={onCopyLink}
        className="rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
      >
        {isCopied ? "복사됨" : "링크 복사"}
      </button>
      <button
        type="button"
        onClick={onShare}
        className="rounded-lg bg-[#FEE500] px-3 py-2 text-[12px] font-semibold text-[#181600] shadow-sm transition hover:brightness-95"
      >
        카카오톡 공유
      </button>
    </div>
  );
}
