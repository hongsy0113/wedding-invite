"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function GalleryClient({ initialCount }: { initialCount: number }) {
  const [visible, setVisible] = useState(initialCount);
  const images = Array.from({ length: 12 }).map((_, i) => {
    const idx = String(i + 1).padStart(2, "0");
    return `/image/detail-image-${idx}.jpg`;
  });
  const canShowMore = visible < images.length;
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
    setLightboxIdx((lightboxIdx + images.length - 1) % images.length);
  };
  const showNext = () => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % images.length);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, visible).map((src, idx) => (
          <button
            key={src}
            type="button"
            aria-label="이미지 확대 보기"
            className="relative aspect-square overflow-hidden rounded-md"
            onClick={() => setLightboxIdx(idx)}
          >
            <Image src={src} alt="갤러리 이미지" fill className="object-cover" />
          </button>
        ))}
      </div>
      {canShowMore && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 text-sm rounded-2xl border border-black/10 hover:bg-[#F5EFE6] shadow-sm font-light"
            onClick={() => setVisible((v) => v + 6)}
          >
            더보기
          </button>
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
            <X className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="이전"
            className="absolute left-2 sm:left-4 p-3 rounded-full bg-white/10 hover:bg-white/20"
            onClick={showPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[lightboxIdx]}
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
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}


