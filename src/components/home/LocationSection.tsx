"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { storeInfo } from "@/lib/data";

export default function LocationSection() {
  return (
    <section
      id="location"
      className="relative py-24 md:py-32 bg-hanji-texture overflow-hidden"
    >
      {/* 배경 장식 */}
      <div className="absolute top-[20%] right-0 w-[300px] h-[300px] rounded-full bg-jade/[0.04] blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-serif">
            位置
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4">
            <span className="text-gradient-gold">오시는 길</span>
          </h2>
          <div className="ink-divider max-w-[120px] mx-auto mb-6" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* 지도 영역 */}
          <AnimatedSection>
            <div className="glass-hanji rounded-2xl overflow-hidden h-[350px] md:h-[400px] relative">
              {/* 카카오맵 플레이스홀더 */}
              <div className="absolute inset-0 bg-gradient-to-br from-hanji-dark to-hanji flex items-center justify-center">
                <div className="text-center p-8">
                  <span className="text-6xl mb-4 block">🗺️</span>
                  <p className="text-ink-light text-sm mb-4">
                    지도를 보려면 클릭하세요
                  </p>
                  <a
                    href={storeInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-jade px-6 py-3 rounded-full text-sm font-medium inline-block"
                  >
                    카카오맵에서 보기
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 매장 정보 카드 */}
          <AnimatedSection delay={200}>
            <div className="glass-hanji rounded-2xl p-8 md:p-10 h-full flex flex-col justify-center">
              <h3 className="font-serif text-2xl font-bold text-ink mb-8">
                {storeInfo.name}{" "}
                <span className="text-peach">{storeInfo.branch}</span>
              </h3>

              <div className="space-y-6">
                {/* 주소 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-xs text-gold-dark font-medium mb-1 tracking-wider">
                      주소
                    </p>
                    <p className="text-ink text-sm leading-relaxed">
                      {storeInfo.address}
                    </p>
                  </div>
                </div>

                {/* 전화번호 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-peach/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-xs text-gold-dark font-medium mb-1 tracking-wider">
                      전화
                    </p>
                    <a
                      href={`tel:${storeInfo.phone}`}
                      className="text-ink text-sm hover:text-peach transition-colors"
                    >
                      {storeInfo.phone}
                    </a>
                  </div>
                </div>

                {/* 영업시간 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-jade/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">🕐</span>
                  </div>
                  <div>
                    <p className="text-xs text-gold-dark font-medium mb-1 tracking-wider">
                      영업시간
                    </p>
                    <p className="text-ink text-sm">{storeInfo.hours}</p>
                  </div>
                </div>

                {/* SNS */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-lg">💬</span>
                  </div>
                  <div>
                    <p className="text-xs text-gold-dark font-medium mb-1 tracking-wider">
                      SNS
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={storeInfo.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-pink-600 border border-pink-200/30 hover:border-pink-400/50 transition-colors"
                      >
                        Instagram
                      </a>
                      <a
                        href={storeInfo.kakao}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full bg-yellow-400/10 text-yellow-700 border border-yellow-300/30 hover:border-yellow-500/50 transition-colors"
                      >
                        KakaoTalk
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
