import Image from "next/image";
import GalleryClient from "@/app/components/GalleryClient";
import KakaoMap from "@/app/components/KakaoMap";

export default function Home() {
  return (
    <div className="font-sans bg-background text-foreground">
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Hero Section */}
        <section>
          <div className="relative w-full h-[65vh] sm:h-[72vh] overflow-hidden">
            <Image
              src="/image/optimized/main-image.jpg"
              alt="메인 이미지"
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1024px"
              className="object-cover"
            />
            <div className="absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-white/95 to-transparent" />
              <div className="absolute top-6 left-0 right-0 text-center px-6 text-gray-900">
                <p className="text-[10px] tracking-[0.35em] mb-2 font-light uppercase">WEDDING INVITATION</p>
                <p className="text-sm sm:text-base font-light">홍성윤 <span className="mx-1">|</span> 김민지</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white/70" />
              <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                <p className="text-2xl sm:text-3xl text-gray-800 italic font-serif">Sungyoon and Minji</p>
              </div>
            </div>
          </div>
          <div className="px-6 pt-7 pb-4 text-center">
            <div className="mx-auto max-w-[34rem] border-y border-black/35 py-6">
              <p className="text-[1.2rem] sm:text-[1.35rem] leading-snug text-gray-800 font-normal tracking-[-0.01em]">
                2026년 7월 11일 토요일 오후 5시
              </p>
              <p className="mt-2 text-[1.3rem] sm:text-[1.45rem] leading-snug text-gray-700 font-medium tracking-[-0.01em]">
                르비르모어 선릉
              </p>
            </div>
          </div>
        </section>

        {/* Invitation Message */}
        <section className="px-6 py-14 sm:py-16">
          <h2
            className="mx-auto mb-10 w-fit text-center text-[1.4rem] sm:text-[1.55rem] font-normal tracking-[-0.01em] text-emerald-700"
            style={{ fontFamily: "var(--font-gungsuh)" }}
          >
            소중한 분들을 초대합니다.
          </h2>
          <div
            className="mx-auto max-w-[31rem] text-center text-[0.98rem] sm:text-[1.08rem] leading-[2rem] sm:leading-[2.2rem] font-light tracking-[-0.01em] text-gray-700"
            style={{ fontFamily: "var(--font-gungsuh)" }}
          >
            <p>
              7번째 여름을 함께 맞이하며,<br />
              7월의 햇살 아래에서<br />
              저희 두 사람이 사랑의 결실을 맺고자 합니다.
            </p>
            <p className="mt-8">
              익숙함에 기대어 서로를 당연하게 여기기보다,<br />
              매 순간 서로의 소중함을 잊지 않고 살아가겠습니다.<br />
              저희 두 사람이 함께하는 새로운 시작에<br />
              귀한 발걸음으로 축복해 주시면 감사하겠습니다.
            </p>
          </div>
        </section>

        {/* Couple Section */}
        <section className="px-6 py-10">
          <div className="mx-auto w-full whitespace-nowrap text-[clamp(0.8rem,2.45vw,1.08rem)] sm:text-[1.1rem] leading-[1.95rem] sm:leading-[2.05rem] tracking-[-0.01em] text-gray-700 font-light">
            <div className="mx-auto grid w-fit grid-cols-[auto_1.2em_2.4em_auto] items-baseline gap-y-5">
              <span className="justify-self-end">홍근표 · 최문주</span>
              <span className="w-full text-center text-[0.88em]">의</span>
              <span className="w-full text-center text-[0.88em]">아들</span>
              <span className="justify-self-start">성윤</span>
              <span className="justify-self-end">김덕규 · 손정희</span>
              <span className="w-full text-center text-[0.88em]">의</span>
              <span className="w-full text-center text-[0.88em]">딸</span>
              <span className="justify-self-start">민지</span>
            </div>
          </div>
        </section>

        {/* Date / Calendar Section */}
        <section className="px-8 sm:px-10 py-12">
          <div className="mx-auto max-w-[27rem] text-center">
            <h2 className="text-[1.35rem] sm:text-[1.5rem] font-normal text-[#C9979C] tracking-[-0.01em]">
              예식 안내
            </h2>
            <p className="mt-8 whitespace-nowrap text-[1.05rem] sm:text-[1.2rem] leading-snug font-normal text-[#333333] tracking-[-0.01em]">
              2026년 7월 11일 토요일 오후 5시
            </p>
            <p className="mt-4 whitespace-nowrap text-[1.05rem] sm:text-[1.2rem] leading-snug font-normal text-[#333333] tracking-[-0.01em]">
              르비르모어 선릉
            </p>

            <p className="mt-14 text-[1.5rem] sm:text-[1.7rem] font-normal text-[#C9979C] tracking-[-0.01em]">7월</p>

            <div className="mt-10 grid grid-cols-7 gap-y-4 sm:gap-y-6 text-center text-[1.05rem] sm:text-[1.9rem] leading-none">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={`dw-${i}`}
                  className={`font-normal ${i === 0 ? "text-[#C9979C]" : "text-[#444444]"}`}
                >
                  {["일", "월", "화", "수", "목", "금", "토"][i]}
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
                  return <div key={`d-${i}`} className="h-10 sm:h-14" />;
                }

                if (isWedding) {
                  return (
                    <div key={`d-${i}`} className="flex items-center justify-center h-10 sm:h-14">
                      <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-full bg-[#EAC5CC] flex items-center justify-center text-white font-normal shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                        {day}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={`d-${i}`} className="h-10 sm:h-14 flex items-center justify-center font-normal text-[#505050]">
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Location Section */}
        <section className="px-6 py-10">
          <h2 className="text-lg font-light mb-3 text-center text-gray-800" style={{ fontFamily: 'var(--font-noto-serif-kr)' }}>오시는 길</h2>
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
          <h2 className="text-lg font-light mb-3 text-center text-gray-800" style={{ fontFamily: 'var(--font-noto-serif-kr)' }}>마음 전하실 곳</h2>
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
      <h2 className="text-lg font-light mb-3 text-center text-gray-800" style={{ fontFamily: 'var(--font-noto-serif-kr)' }}>갤러리</h2>
      <GalleryClient initialCount={initialCount} />
    </section>
  );
}
