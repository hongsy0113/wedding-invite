"use client";

import { useEffect, useMemo, useState } from "react";

const WEDDING_DATE_KST = Date.UTC(2026, 6, 11, 8, 0, 0); // 2026-07-11 17:00:00 KST

function getTimeLeft(now: number) {
  const totalSeconds = Math.floor(Math.max(0, WEDDING_DATE_KST - now) / 1000);
  return {
    days: Math.floor(totalSeconds / (60 * 60 * 24)),
    hours: Math.floor((totalSeconds / (60 * 60)) % 24),
    minutes: Math.floor((totalSeconds / 60) % 60),
    seconds: Math.floor(totalSeconds % 60),
  };
}

function getDaysAfterWedding(now: number) {
  const diffMs = Math.max(0, now - WEDDING_DATE_KST);
  return Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
}

export default function WeddingCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const timeLeft = useMemo(() => getTimeLeft(now), [now]);
  const isAfterWedding = now >= WEDDING_DATE_KST;
  const dPlusDay = useMemo(() => getDaysAfterWedding(now), [now]);

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
          {isAfterWedding ? "성윤 ♥ 민지 결혼식" : "성윤 ♥ 민지 결혼식까지"}
        </h2>
        {isAfterWedding ? (
          <>
            <p className="mt-4 text-[0.96rem] sm:text-[1.06rem] text-[#666666]">
              소중한 날에 함께해 주셔서 감사합니다
            </p>
            <div className="mt-8 flex flex-col items-center">
              <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#EAC5CC] shadow-[0_6px_14px_rgba(0,0,0,0.08)] flex items-center justify-center">
                <span className="text-white text-[1.5rem] sm:text-[1.9rem] font-normal tabular-nums">
                  D+{dPlusDay}
                </span>
              </div>
              <p className="mt-3 text-[0.9rem] sm:text-[1rem] text-[#4D4D4D]">Day</p>
            </div>
          </>
        ) : (
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
        )}
      </div>
    </section>
  );
}
