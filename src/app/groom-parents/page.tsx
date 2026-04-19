import WeddingInvitationPage from "@/app/components/WeddingInvitationPage";

export default function GroomParentsPage() {
  return (
    <WeddingInvitationPage
      showCountdown={false}
      showGallery
      galleryImageFileNames={[
        "HI201690.jpg",
        "HIS07869.jpg",
        "HIS08662.jpg",
        "DSC00394.jpg",
        "DSC00757.jpg",
        "DSC00800.jpg",
      ]}
      showCoupleSection={false}
      invitationHeading="소중한 분들을 모십니다"
      invitationMessageBlocks={[
        [
          "저희의 아들 성윤이가 소중한 인연을 만나",
          "평생을 함께할 짝을 이루게 되었습니다.",
          "기쁜 날 귀한 걸음 하시어",
          "따뜻한 축복과 덕담을 나누어 주시면 감사하겠습니다.",
        ],
      ]}
      invitationSignature={
        <>
          신랑 혼주{"\u00A0\u00A0"}
          <span className="font-semibold">홍근표 · 최문주</span>
          {" 拜上"}
        </>
      }
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
    />
  );
}
