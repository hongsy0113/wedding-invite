import type { Metadata } from "next";
import WeddingInvitationPage from "@/app/components/WeddingInvitationPage";

const groomParentsOgImagePath = "/image/optimized/large/HIS07303.jpg";

export const metadata: Metadata = {
  title: "성윤 💕 민지 결혼식 초대장",
  description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
  openGraph: {
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: [
      {
        url: groomParentsOgImagePath,
        alt: "신랑 혼주용 메인 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "성윤 💕 민지 결혼식 초대장",
    description: "2026년 7월 11일 토요일 17시, 르비르모어 선릉",
    images: [groomParentsOgImagePath],
  },
};

export default function GroomParentsPage() {
  return (
    <WeddingInvitationPage
      heroImageSrc={groomParentsOgImagePath}
      showCountdown
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
      invitationHeading="소중한 분들을 모십니다"
      invitationMessageBlocks={[
        [
          "저희 아들 성윤이가 귀한 인연을 만나",
          "평생의 반려자를 맞이하게 되었습니다.",
          "기쁜 날 귀한 걸음 하시어",
          "따뜻한 축복과 덕담 주시면 감사하겠습니다.",
        ],
      ]}
      invitationSignature={
        <>
          신랑 혼주{"\u00A0\u00A0"}
          <span className="font-semibold">홍근표 · 최문주</span>
          {" 배상"}
        </>
      }
      showGiftIntroMessage={false}
      accountItems={[
        {
          id: "groom-father",
          label: "신랑 아버지 계좌",
          number: "001240441141",
          detail: "국민은행 홍근표",
          copyValue: "국민은행 001240441141 홍근표",
        },
        {
          id: "groom-mother",
          label: "신랑 어머니 계좌",
          number: "814210729568",
          detail: "국민은행 최문주",
          copyValue: "국민은행 814210729568 최문주",
        },
      ]}
      contactItems={[
        {
          id: "groom-father-contact",
          role: "신랑 아버지",
          name: "홍근표",
          phone: "010-9770-0813",
        },
        {
          id: "groom-mother-contact",
          role: "신랑 어머니",
          name: "최문주",
          phone: "010-3360-0421",
        },
      ]}
    />
  );
}
