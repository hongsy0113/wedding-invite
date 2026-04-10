"use client";

import { useEffect, useMemo, useState } from "react";

const WEDDING_DATE_KST = Date.UTC(2026, 6, 11, 8, 0, 0); // 2026-07-11 17:00 KST

function getTimeLeft(now: number) {
  const totalSeconds = Math.floor(Math.max(0, WEDDING_DATE_KST - now) / 1000);
  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hours: Math.floor((totalSeconds / (60 * 60)) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

type WeddingCountdownProps = {
  initialNow: number;
};

export default function WeddingCountdown({ initialNow }: WeddingCountdownProps) {
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLeft = useMemo(() => getTimeLeft(now), [now]);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="px-8 sm:px-10 py-10">
      <div className="mx-auto max-w-[27rem] text-center">
        <h2 className="text-[1.35rem] sm:text-[1.5rem] font-normal text-[#333333] tracking-[-0.01em]">
          성윤 ♥ 민지 결혼식까지
        </h2>
        <div className="mt-8 grid grid-cols-4 gap-x-2 sm:gap-x-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-[#EAC5CC] shadow-[0_6px_14px_rgba(0,0,0,0.08)] flex items-center justify-center">
                <span className="text-white text-[1.5rem] sm:text-[1.8rem] font-normal tabular-nums">
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-3 text-[0.9rem] sm:text-[1rem] text-[#4D4D4D]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
