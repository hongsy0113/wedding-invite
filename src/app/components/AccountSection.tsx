"use client";

import { useState } from "react";

type AccountItem = {
  id: string;
  label: string;
  number: string;
  detail: string;
  copyValue: string;
};

const ACCOUNT_ITEMS: AccountItem[] = [
  {
    id: "groom",
    label: "신랑 계좌",
    number: "110-557-648615",
    detail: "신한은행 홍성윤",
    copyValue: "신한은행 110-557-648615 홍성윤",
  },
  {
    id: "bride",
    label: "신부 계좌",
    number: "506102-01-258360",
    detail: "국민은행 김민지",
    copyValue: "국민은행 506102-01-258360 김민지",
  },
];

export default function AccountSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (item: AccountItem) => {
    try {
      await navigator.clipboard.writeText(item.copyValue);
      setCopiedId(item.id);
      window.setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 1600);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {ACCOUNT_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-[#D7D7D7] bg-[#F5F5F5] px-5 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.05)]"
        >
          <div className="min-w-0">
            <p className={`text-[14px] sm:text-[15px] font-medium ${item.id === "groom" ? "text-[#6E89B6]" : "text-[#B47474]"}`}>
              {item.label}
            </p>
            <p className="mt-2 text-[14px] sm:text-[15px] leading-tight font-light text-[#333333] tracking-[-0.01em]">
              {item.number}
            </p>
            <p className="mt-2 text-[14px] sm:text-[15px] leading-tight font-light text-[#333333]">
              {item.detail}
            </p>
          </div>
          <button
            type="button"
            aria-label={`${item.label} 복사`}
            onClick={() => void handleCopy(item)}
            className="shrink-0 min-w-[86px] rounded-[10px] border border-[#BFBFBF] bg-[#EEEEEE] px-6 py-3 text-[14px] sm:text-[15px] leading-none font-light text-[#4B4B4B] shadow-[0_2px_8px_rgba(0,0,0,0.12)] active:translate-y-[1px]"
          >
            {copiedId === item.id ? "복사됨" : "복사"}
          </button>
        </div>
      ))}
    </div>
  );
}
