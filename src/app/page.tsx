import Image from "next/image";
import GalleryClient from "@/app/components/GalleryClient";
import { MapPin, Calendar, Gift, Users } from "lucide-react";
import KakaoMap from "@/app/components/KakaoMap";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <div className="font-sans bg-background text-foreground">
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Hero Section */}
        <section className="relative w-full h-[65vh] sm:h-[72vh] overflow-hidden">
        <Image
            src="/image/main-image.jpg"
            alt="메인 이미지"
            fill
          priority
            className="object-cover"
          />
          <div className="absolute inset-0">
            {/* Top soft white gradient for readability */}
            <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-white/95 to-transparent" />
            {/* Top labels */}
            <div className="absolute top-6 left-0 right-0 text-center px-6 text-gray-900">
              <p className="text-[10px] tracking-[0.35em] mb-2 font-light uppercase">WEDDING INVITATION</p>
              <p className="text-sm sm:text-base font-light">홍성윤 <span className="mx-1">|</span> 김민지</p>
            </div>
            {/* Bottom gradient for legibility */}
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white/95" />
            {/* Bottom names + details */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-6">
              <p className={`${greatVibes.className} text-2xl sm:text-3xl text-gray-800 mb-3`}>Sungyoon and Minji</p>
              <p className="text-xs sm:text-sm font-light text-gray-700 mb-1">2026년 7월 11일 토요일 오후 5시</p>
              <p className="text-xs sm:text-sm font-light text-gray-700">르비르모어 선릉</p>
            </div>
          </div>
        </section>

        {/* Invitation Message */}
        <section className="px-6 py-10">
          <p className="whitespace-pre-line text-center leading-7 text-sm sm:text-base font-light text-gray-700">
            서로가 마주 보며 다져온 사랑을 이제 함께 한 곳을 바라보며
            걸어가고자 합니다. 귀한 걸음 하시어 축복해 주시면
            감사하겠습니다.
          </p>
        </section>

        {/* Couple Section */}
        <section className="px-6 py-8 grid grid-cols-1 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
              <Image src="/groom.jpg" alt="신랑 사진" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 flex items-center gap-1"><Users className="h-3 w-3" />신랑</p>
              <p className="text-lg font-light">홍성윤</p>
              <p className="text-sm text-gray-600 font-light">홍근표 · 최문주 의 장남</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
              <Image src="/bride.jpg" alt="신부 사진" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 flex items-center gap-1"><Users className="h-3 w-3" />신부</p>
              <p className="text-lg font-light">김민지</p>
              <p className="text-sm text-gray-600 font-light">김덕규 · 손정희 의 장녀</p>
            </div>
          </div>
        </section>

        {/* Date / Calendar Section */}
        <section className="px-6 py-8">
          <div className="rounded-2xl border border-black/10 overflow-hidden shadow-sm">
            <div className="px-5 py-4 bg-[#F5EFE6] border-b border-black/10">
              <p className="text-sm font-light flex items-center gap-2 tracking-wide">
                <Calendar className="h-4 w-4" /> 2026년 7월
              </p>
            </div>
            <div className="px-2 sm:px-4 py-2">
              <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={`dw-${i}`} className="pt-2 text-gray-500 font-light">
                    {["일","월","화","수","목","금","토"][i]}
                  </div>
                ))}
                {/* July 2026 calendar: starts Wed (index 3), 31 days */}
                {Array.from({ length: 35 }).map((_, i) => {
                  const startOffset = 3; // Sun=0, Mon=1, Tue=2, Wed=3
                  const daysInMonth = 31;
                  const day = i - startOffset + 1;
                  const isValid = day >= 1 && day <= daysInMonth;
                  const isWedding = day === 11;
                  if (!isValid) {
                    return (
                      <div key={`d-${i}`} className="py-3 opacity-30" />
                    );
                  }
                  if (isWedding) {
                    return (
                      <div key={`d-${i}`} className="flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-rose-50 flex items-center justify-center shadow-sm border border-rose-100">
                          <span className="font-medium text-white bg-rose-400 h-8 w-8 rounded-full flex items-center justify-center">
                            {day}
                          </span>
                        </div>
                        <span className="mt-1 text-[10px] text-gray-900">오후 5시</span>
                      </div>
                    );
                  }
                  return (
                    <div key={`d-${i}`} className="py-3 font-light">
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">예식일: 7월 11일 (토) 오후 5시</p>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Location Section */}
        <section className="px-6 py-10">
          <h2 className="text-lg font-light mb-3 flex items-center gap-2"><MapPin className="h-5 w-5" />오시는 길</h2>
          <p className="text-sm text-gray-600 mb-3 font-light">르비르모어 선릉 · 서울시 강남구 테헤란로 406 A동</p>
          <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-sm">
            <KakaoMap address="서울 강남구 테헤란로 406" />
          </div>
          <p className="text-sm text-gray-600 mt-3 font-light">
            2호선 ○○역 3번 출구에서 도보 5분, 주차 2시간 무료 제공
          </p>
        </section>

        {/* Gift Section */}
        <section className="px-6 py-10">
          <h2 className="text-lg font-light mb-3 flex items-center gap-2"><Gift className="h-5 w-5" />마음 전하실 곳</h2>
          <p className="text-sm text-gray-600 mb-4 font-light">
            축하의 마음을 전해주시는 분들을 위해 계좌번호를 안내드립니다.
          </p>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="rounded-2xl border border-black/10 p-4 shadow-sm">
              <p className="font-light mb-1">신랑측</p>
              <p className="text-gray-700 font-light">국민 000000-00-000000 (홍길동)</p>
            </div>
            <div className="rounded-2xl border border-black/10 p-4 shadow-sm">
              <p className="font-light mb-1">신부측</p>
              <p className="text-gray-700 font-light">신한 000-000-000000 (김하나)</p>
            </div>
        </div>
        </section>

        <footer className="px-6 py-10 text-center text-xs text-gray-500 font-light">감사합니다.</footer>
      </main>
    </div>
  );
}

function Gallery() {
  const initialCount = 6;
  return (
    <section className="px-6 py-10">
      <h2 className="text-lg font-medium mb-3">갤러리</h2>
      <GalleryClient initialCount={initialCount} />
    </section>
  );
}
