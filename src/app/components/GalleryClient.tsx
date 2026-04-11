"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function GalleryClient({ initialCount }: { initialCount: number }) {
  const [visible, setVisible] = useState(initialCount);
  const imageIds = Array.from({ length: 12 }).map((_, i) => {
    const idx = String(i + 1).padStart(2, "0");
    return idx;
  });
  const canShowMore = visible < imageIds.length;
  const canCollapse = visible > initialCount;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lightboxIdx !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      // Prevent pinch/double-tap zoom on iOS within overlay
      const el = overlayRef.current;
      const gestureHandler: EventListener = (e: Event) => {
        e.preventDefault();
      };
      const wheelHandler = (e: WheelEvent) => {
        if (e.ctrlKey) {
          e.preventDefault();
        }
      };
      if (el) {
        el.addEventListener("gesturestart", gestureHandler, { passive: false });
        el.addEventListener("gesturechange", gestureHandler, { passive: false });
        el.addEventListener("gestureend", gestureHandler, { passive: false });
        el.addEventListener("wheel", wheelHandler as EventListener, { passive: false });
      }
      return () => {
        document.body.style.overflow = prev;
        if (el) {
          el.removeEventListener("gesturestart", gestureHandler);
          el.removeEventListener("gesturechange", gestureHandler);
          el.removeEventListener("gestureend", gestureHandler);
          el.removeEventListener("wheel", wheelHandler as EventListener);
        }
      };
    }
    return undefined;
  }, [lightboxIdx]);

  const showPrev = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + imageIds.length - 1) % imageIds.length);
  };
  const showNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % imageIds.length);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {imageIds.slice(0, visible).map((id, idx) => (
          <button
            key={id}
            type="button"
            aria-label="이미지 확대 보기"
            className="relative aspect-square overflow-hidden rounded-md"
            onClick={() => setLightboxIdx(idx)}
          >
            <Image
              src={`/image/optimized/thumb/detail-image-${id}.jpg`}
              alt="갤러리 이미지"
              fill
              sizes="(max-width: 640px) 33vw, 220px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
      {(canShowMore || canCollapse) && (
        <div className="mt-4 flex justify-center">
          {canShowMore ? (
            <button
              type="button"
              aria-label="갤러리 더보기"
              className="px-3 py-2 text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setVisible((v) => v + 6)}
            >
              <span className="inline-flex items-center gap-1 leading-none">
                <span>더보기</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>
          ) : (
            <button
              type="button"
              aria-label="갤러리 접기"
              className="px-3 py-2 text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setVisible(initialCount)}
            >
              <span className="inline-flex items-center gap-1 leading-none">
                <span>접기</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 15l6-6 6 6" />
                </svg>
              </span>
            </button>
          )}
        </div>
      )}
      {lightboxIdx !== null && (
        <div ref={overlayRef} className="fixed inset-0 z-50 bg-black/90 text-white flex items-center justify-center touch-none select-none">
          <button
            type="button"
            aria-label="닫기"
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setLightboxIdx(null)}
          >
            <span className="block h-6 w-6 text-xl leading-6">×</span>
          </button>
          <button
            type="button"
            aria-label="이전"
            className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20"
            onClick={showPrev}
          >
            <span className="block h-6 w-6 text-2xl leading-6">‹</span>
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={`/image/optimized/large/detail-image-${imageIds[lightboxIdx]}.jpg`}
              alt="확대 이미지"
              fill
              className="object-contain"
              sizes="90vw"
              draggable={false}
            />
          </div>
          <button
            type="button"
            aria-label="다음"
            className="absolute right-2 sm:right-4 p-3 rounded-full bg-white/10 hover:bg-white/20"
            onClick={showNext}
          >
            <span className="block h-6 w-6 text-2xl leading-6">›</span>
          </button>
        </div>
      )}
    </div>
  );
}
