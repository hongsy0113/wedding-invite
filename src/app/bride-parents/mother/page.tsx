import type { Metadata } from "next";
import WeddingInvitationPage from "@/app/components/WeddingInvitationPage";

const brideParentsMotherOgImagePath = "/image/optimized/large/HIS07303.jpg";

export const metadata: Metadata = {
  title: "성윤 💕 민지 결혼식 초대장",
  description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
  openGraph: {
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: [
      {
        url: brideParentsMotherOgImagePath,
        alt: "신부 혼주용 메인 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: [brideParentsMotherOgImagePath],
  },
};

export default function BrideParentsMotherPage() {
  return (
    <WeddingInvitationPage
      heroImageSrc={brideParentsMotherOgImagePath}
      showCountdown={false}
      showGallery
      galleryImageFileNames={[
        "HI201690.jpg",
        "HIS07869.jpg",
        "HIS08662.jpg",
        "DSC00394.jpg",
        "DSC00757.jpg",
        "DSC00800.jpg",
        "HIS07160.jpg",
        "HIS07508.jpg",
        "HI202193.jpg",
        "DSC00217.jpg",
        "DSC00262.jpg",
        "DSC01030.jpg",
      ]}
      showCoupleSection={false}
      invitationMessageBlocks={[
        [
          "곱게 자란 딸 민지가 소중한 인연을 만나",
          "평생을 함께할 짝을 이루게 되었습니다.",
          "기쁜 날 귀한 걸음 하시어",
          "따뜻한 축복과 덕담을 나누어 주시면 감사하겠습니다.",
        ],
      ]}
      invitationSignature={
        <>
          신부 혼주{"\u00A0\u00A0"}
          <span className="font-semibold">김덕규 · 손정희</span>
          <br />
          신랑 혼주{"\u00A0\u00A0"}
          <span className="font-semibold">홍근표 · 최문주</span>
        </>
      }
      accountItems={[
        {
          id: "bride-mother",
          label: "신부 어머니",
          number: "829210424321",
          detail: "국민은행 손정희",
          copyValue: "국민은행 829210424321 손정희",
        },
      ]}
      contactItems={[
        {
          id: "bride-mother-contact",
          role: "신부 어머니",
          name: "손정희",
          phone: "010-5039-6981",
        },
      ]}
    />
  );
}
