"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 떨어지는 꽃잎 컴포넌트
function FallingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 10 + Math.random() * 16,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            fontSize: `${petal.size}px`,
          }}
        >
          🌸
        </div>
      ))}
    </>
  );
}

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 그라디언트 - 몽유도원 느낌 */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light to-night-lighter" />

      {/* 수묵화 배경 효과 */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-peach/[0.04] blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[500px] h-[500px] rounded-full bg-jade/[0.05] blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[80px]" />
      </div>

      {/* 떨어지는 꽃잎 */}
      <FallingPetals />

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* 한자 타이틀 */}
        <div
          className={`transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-gold/60 text-sm tracking-[0.4em] mb-6 font-serif">
            夢遊桃源
          </p>
        </div>

        {/* 메인 타이틀 */}
        <h1
          className={`font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cloud mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-gradient-gold">만화카페</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl font-normal text-cloud/80">
            홈페이지
          </span>
        </h1>

        {/* 서브타이틀 */}
        <p
          className={`text-cloud/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed font-light transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          꿈 속의 복숭아꽃 낙원에서
          <br className="sm:hidden" />
          특별한 시간을 보내세요
        </p>

        {/* 영업시간 */}
        <p
          className={`text-gold/50 text-xs tracking-[0.15em] mb-10 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          매일 10:00 - 02:00 (다음날)
        </p>

        {/* CTA 버튼 */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-600 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Link
            href="/menu"
            className="btn-peach px-8 py-4 rounded-full text-base font-medium tracking-wide min-w-[180px]"
          >
            메뉴 보기
          </Link>
          <Link
            href="/#spaces"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("spaces")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 rounded-full text-base font-medium tracking-wide text-cloud/70 border border-cloud/20 hover:border-gold/50 hover:text-gold transition-all duration-300 min-w-[180px]"
          >
            공간 둘러보기
          </Link>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-cloud/30">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-cloud/30 to-transparent animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
}
