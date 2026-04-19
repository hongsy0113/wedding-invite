"use client";

import Image from "next/image";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

type GalleryClientProps = {
  initialCount: number;
  images: Array<{
    thumbSrc: string;
    largeSrc: string;
    alt: string;
  }>;
};

export default function GalleryClient({ initialCount, images }: GalleryClientProps) {
  const [visible, setVisible] = useState(initialCount);
  const canShowMore = visible < images.length;
  const canCollapse = visible > initialCount;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const slideViewportRef = useRef<HTMLDivElement | null>(null);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragOffsetXRef = useRef(0);
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [slideDirection, setSlideDirection] = useState<-1 | 0 | 1>(0);
  const [isSnapBack, setIsSnapBack] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

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

  useEffect(() => {
    if (lightboxIdx === null) {
      setDragOffsetX(0);
      setSlideDirection(0);
      setIsSnapBack(false);
      setIsDragging(false);
      pointerIdRef.current = null;
      dragStartXRef.current = 0;
      dragOffsetXRef.current = 0;
    }
  }, [lightboxIdx]);

  useEffect(() => {
    if (!isSnapBack) return;
    const timer = window.setTimeout(() => {
      setIsSnapBack(false);
    }, 380);
    return () => window.clearTimeout(timer);
  }, [isSnapBack]);

  const showPrev = () => {
    if (lightboxIdx === null || slideDirection !== 0) return;
    setIsSnapBack(false);
    setDragOffsetX(0);
    setSlideDirection(-1);
  };
  const showNext = () => {
    if (lightboxIdx === null || slideDirection !== 0) return;
    setIsSnapBack(false);
    setDragOffsetX(0);
    setSlideDirection(1);
  };

  const getWrappedIndex = (baseIdx: number, offset: number) =>
    (baseIdx + offset + images.length) % images.length;

  const resetDragState = () => {
    pointerIdRef.current = null;
    dragStartXRef.current = 0;
    dragOffsetXRef.current = 0;
    setIsDragging(false);
  };

  const handleSlidePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (slideDirection !== 0) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setIsSnapBack(false);
    pointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleSlidePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const delta = e.clientX - dragStartXRef.current;
    dragOffsetXRef.current = delta;
    setDragOffsetX(delta);
  };

  const handleSlidePointerEnd = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerIdRef.current !== e.pointerId) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }

    const viewportWidth = slideViewportRef.current?.clientWidth ?? 0;
    const threshold = Math.max(40, Math.min(120, viewportWidth * 0.16));
    const offset = dragOffsetXRef.current;
    const shouldMove = Math.abs(offset) > threshold;

    if (shouldMove) {
      setSlideDirection(offset < 0 ? 1 : -1);
      setDragOffsetX(0);
    } else if (Math.abs(offset) > 0.5) {
      setIsSnapBack(true);
      setDragOffsetX(0);
    } else {
      // No effective drag happened, so do not enter snap-back lock state.
      setIsSnapBack(false);
      setDragOffsetX(0);
    }

    resetDragState();
  };

  const handleSlideTrackTransitionEnd = () => {
    if (lightboxIdx === null) return;

    if (slideDirection === 0) {
      if (isSnapBack) {
        setIsSnapBack(false);
      }
      return;
    }

    setLightboxIdx(getWrappedIndex(lightboxIdx, slideDirection));
    setSlideDirection(0);
    setIsSnapBack(false);
    setDragOffsetX(0);
  };

  if (images.length === 0) {
    return (
      <p className="text-sm text-center text-gray-500 font-light py-6">
        갤러리 이미지를 준비 중입니다.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, visible).map((image, idx) => {
          const isTopAlignedThumb = image.thumbSrc.endsWith("/HIS08662.jpg");
          return (
          <button
            key={image.largeSrc}
            type="button"
            aria-label="이미지 확대 보기"
            className="relative aspect-square overflow-hidden rounded-md"
            onClick={() => setLightboxIdx(idx)}
          >
            <Image
              src={image.thumbSrc}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 33vw, 220px"
              className={isTopAlignedThumb ? "object-cover object-top" : "object-cover"}
            />
          </button>
          );
        })}
      </div>
      {(canShowMore || canCollapse) && (
        <div className="mt-4 flex justify-center">
          {canShowMore ? (
            <button
              type="button"
              aria-label="갤러리 더보기"
              className="px-3 py-2 text-sm font-light text-gray-700 hover:text-gray-900 transition-colors"
              onClick={() => setVisible(images.length)}
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
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20"
            onClick={() => setLightboxIdx(null)}
          >
            <span className="block h-6 w-6 text-xl leading-6">×</span>
          </button>
          <button
            type="button"
            aria-label="이전"
            className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20"
            onClick={showPrev}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div
            ref={slideViewportRef}
            className={`relative w-[90vw] h-[80vh] overflow-hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={handleSlidePointerDown}
            onPointerMove={handleSlidePointerMove}
            onPointerUp={handleSlidePointerEnd}
            onPointerCancel={handleSlidePointerEnd}
          >
            <div
              className="flex h-full w-[300%]"
              style={{
                transform:
                  slideDirection === 1
                    ? "translateX(-66.6667%)"
                    : slideDirection === -1
                      ? "translateX(0)"
                      : `translateX(calc(-33.3333% + ${dragOffsetX}px))`,
                transition:
                  slideDirection !== 0 || isSnapBack
                    ? "transform 340ms cubic-bezier(0.22, 1, 0.36, 1)"
                    : "none",
              }}
              onTransitionEnd={handleSlideTrackTransitionEnd}
            >
              {[getWrappedIndex(lightboxIdx, -1), lightboxIdx, getWrappedIndex(lightboxIdx, 1)].map(
                (idx) => (
                  <div key={`${images[idx].largeSrc}-${idx}`} className="relative h-full w-1/3 shrink-0">
                    <Image
                      src={images[idx].largeSrc}
                      alt={images[idx].alt}
                      fill
                      className="object-contain"
                      sizes="90vw"
                      draggable={false}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <button
            type="button"
            aria-label="다음"
            className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20"
            onClick={showNext}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
