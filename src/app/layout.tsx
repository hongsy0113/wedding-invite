import type { Metadata } from "next";
import "./globals.css";

function resolveMetadataBase(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const rawVercelUrl = process.env.VERCEL_URL?.trim();
  const candidate = rawSiteUrl || rawVercelUrl;

  if (!candidate) return new URL("http://localhost:3000");

  try {
    return new URL(candidate);
  } catch {
    // Some deployments provide a bare hostname (e.g. "my-site.vercel.app").
  }

  try {
    return new URL(`https://${candidate}`);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const ogImagePath = "/image/optimized/main-image.jpg";

export const metadata: Metadata = {
  title: "성윤 💕 민지 결혼식 초대장",
  description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
  robots: {
    index: false,
    follow: false,
  },
  metadataBase: resolveMetadataBase(),
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
        height: 630,
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
