import { redirect } from "next/navigation";
import type { Metadata } from "next";

const KAKAO_MAP_SHARE_URL = "https://m.map.kakao.com/actions/detailMapView?id=404070599";

export const metadata: Metadata = {
  title: "위치 보기",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VenueMapRedirectPage() {
  redirect(KAKAO_MAP_SHARE_URL);
}
