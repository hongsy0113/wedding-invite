"use client";

import Image from "next/image";
import { useState } from "react";

export default function GalleryClient({ initialCount }: { initialCount: number }) {
  const [visible, setVisible] = useState(initialCount);
  const images = Array.from({ length: 12 }).map((_, i) => `/gallery/${i + 1}.jpg`);
  const canShowMore = visible < images.length;

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {images.slice(0, visible).map((src) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-md">
            <Image src={src} alt="갤러리 이미지" fill className="object-cover" />
          </div>
        ))}
      </div>
      {canShowMore && (
        <div className="mt-4 flex justify-center">
          <button
            className="px-4 py-2 text-sm rounded-full border border-black/10 hover:bg-gray-50"
            onClick={() => setVisible((v) => v + 6)}
          >
            더보기
          </button>
        </div>
      )}
    </div>
  );
}


