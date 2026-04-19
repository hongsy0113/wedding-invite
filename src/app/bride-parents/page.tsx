import WeddingInvitationPage from "@/app/components/WeddingInvitationPage";

export default function BrideParentsPage() {
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
          {" 拜上"}
        </>
      }
      accountItems={[
        {
          id: "bride-father",
          label: "신부 아버지 계좌",
          number: "815240286382",
          detail: "국민은행 김덕규",
          copyValue: "국민은행 815240286382 김덕규",
        },
        {
          id: "bride-mother",
          label: "신부 어머니 계좌",
          number: "829210424321",
          detail: "국민은행 손정희",
          copyValue: "국민은행 829210424321 손정희",
        },
      ]}
    />
  );
}
