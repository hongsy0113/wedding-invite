import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "성윤 💕 민지 결혼식 초대장",
  description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
  metadataBase: new URL("https://example.com"), // 배포 도메인 확정 시 교체 필요
  openGraph: {
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    type: "website",
    locale: "ko_KR",
    siteName: "Sungyoon& Minji Wedding",
    images: [
      {
        url: "/images/og-cover.jpg", // 1200x630 권장. 배포 시 절대 URL 권장
        width: 1200,
        height: 630,
        alt: "성윤 민지 결혼식 초대장",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: ["/images/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
      <meta name="robots" content="noindex, nofollow" />
      {/**
       * Note: 배포 후 og:image가 변경되었는데도 카카오/인스타 미리보기 캐시가 남아있다면,
       * 이미지 파일명에 버전을 추가하거나 쿼리스트링(?v=timestamp)으로 캐시 무력화를 시도하세요.
       * 예: /images/og-cover.jpg?v=20260711
       */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
