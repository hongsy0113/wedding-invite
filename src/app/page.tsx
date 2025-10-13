import Image from "next/image";
import GalleryClient from "@/app/components/GalleryClient";

export default function Home() {
  return (
    <div className="font-sans bg-background text-foreground">
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
        <Image
            src="/cover.jpg"
            alt="신랑 신부 사진"
            fill
          priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 text-white">
            <p className="text-sm tracking-widest mb-2">우리 결혼합니다</p>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-2">홍길동 · 김하나</h1>
            <p className="text-sm sm:text-base mb-1">2025년 11월 22일 토요일 오후 1시</p>
            <p className="text-sm sm:text-base">서울 ○○웨딩홀 3층 라벤더홀</p>
          </div>
        </section>

        {/* Invitation Message */}
        <section className="px-6 py-10">
          <p className="whitespace-pre-line text-center leading-7 text-sm sm:text-base">
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
              <p className="text-xs text-gray-500">신랑</p>
              <p className="text-lg font-medium">홍길동</p>
              <p className="text-sm text-gray-600">홍판서 · 마님 의 아들</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0">
              <Image src="/bride.jpg" alt="신부 사진" fill className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500">신부</p>
              <p className="text-lg font-medium">김하나</p>
              <p className="text-sm text-gray-600">김○○ · 이○○ 의 딸</p>
            </div>
          </div>
        </section>

        {/* Date / Calendar Section */}
        <section className="px-6 py-8">
          <div className="rounded-2xl border border-black/10 overflow-hidden">
            <div className="px-5 py-3 bg-gray-50">
              <p className="text-sm font-medium">2025년 11월</p>
            </div>
            <div className="grid grid-cols-7 gap-0 text-center text-sm">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={`dw-${i}`} className="py-2 text-gray-500">
                  {["일","월","화","수","목","금","토"][i]}
                </div>
              ))}
              {/* Simple static calendar grid (placeholder) */}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 4; // pretend 1st starts on Fri
                const isValid = day > 0 && day <= 30;
                const isWedding = day === 22;
                return (
                  <div
                    key={`d-${i}`}
                    className={`py-3 ${
                      isValid ? "" : "opacity-30"
                    } ${isWedding ? "bg-pink-50 text-pink-700 font-medium" : ""}`}
                  >
                    {isValid ? day : ""}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mt-3">예식일: 11월 22일 (토)</p>
        </section>

        {/* Gallery Section */}
        <Gallery />

        {/* Location Section */}
        <section className="px-6 py-10">
          <h2 className="text-lg font-medium mb-3">오시는 길</h2>
          <p className="text-sm text-gray-600 mb-3">서울 ○○웨딩홀 3층 라벤더홀</p>
          <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-black/10">
            <iframe
              title="map"
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.590702994937!2d127.027583!3d37.496988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1589d9d9d9d%3A0x0000000000000000!2z7ISc7Jq47Yq567OE7Iuc7Yuw!5e0!3m2!1sko!2skr!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            2호선 ○○역 3번 출구에서 도보 5분, 주차 2시간 무료 제공
          </p>
        </section>

        {/* Gift Section */}
        <section className="px-6 py-10">
          <h2 className="text-lg font-medium mb-3">마음 전하실 곳</h2>
          <p className="text-sm text-gray-600 mb-4">
            축하의 마음을 전해주시는 분들을 위해 계좌번호를 안내드립니다.
          </p>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="rounded-xl border border-black/10 p-4">
              <p className="font-medium mb-1">신랑측</p>
              <p className="text-gray-700">국민 000000-00-000000 (홍길동)</p>
            </div>
            <div className="rounded-xl border border-black/10 p-4">
              <p className="font-medium mb-1">신부측</p>
              <p className="text-gray-700">신한 000-000-000000 (김하나)</p>
            </div>
          </div>
        </section>

        <footer className="px-6 py-10 text-center text-xs text-gray-500">감사합니다.</footer>
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
