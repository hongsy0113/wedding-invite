import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://sungyoon-minji.vercel.app";
const ogImagePath = "/image/optimized/main-image.jpg";

export const metadata: Metadata = {
  title: "성윤 💕 민지 결혼식 초대장",
  description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    type: "website",
    locale: "ko_KR",
    siteName: "Sungyoon& Minji Wedding",
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 1800,
        alt: "성윤 민지 결혼식 초대장",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: [ogImagePath],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
