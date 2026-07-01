"use client";

import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sampleMenuItems } from "@/lib/data";

export default function MenuPreview() {
  const popularItems = sampleMenuItems.filter((item) => item.is_popular);

  const getMenuImage = (item: (typeof sampleMenuItems)[0]) => {
    if (item.image_url) return item.image_url;
    const fallbacks: Record<string, string> = {
      "cat-1": "/images/menu/fallback_drink.png",
      "cat-2": "/images/menu/fallback_meal.png",
      "cat-3": "/images/menu/fallback_snack.png",
      "cat-4": "/images/menu/fallback_dessert.png",
    };
    return fallbacks[item.category_id] || "/images/menu/fallback_meal.png";
  };

  return (
    <section className="relative py-24 md:py-32 bg-night-texture overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-peach/[0.03] blur-[100px]" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] rounded-full bg-gold/[0.03] blur-[80px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-gold/50 text-xs tracking-[0.4em] uppercase mb-3 font-serif">
            人氣
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cloud mb-4">
            인기 <span className="text-gradient-gold">메뉴</span>
          </h2>
          <div className="ink-divider-gold max-w-[120px] mx-auto mb-6" />
          <p className="text-cloud/50 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            만화카페의 시그니처 메뉴를 만나보세요
          </p>
        </AnimatedSection>

        {/* 인기 메뉴 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {popularItems.map((item, index) => (
            <AnimatedSection key={item.id} delay={index * 100}>
              <div className="glass-dark rounded-2xl overflow-hidden card-hover group">
                {/* 이미지 영역 */}
                <div className="relative h-48 overflow-hidden bg-night-lighter flex items-center justify-center">
                  <img
                    src={getMenuImage(item)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 인기 배지 */}
                  <span className="absolute top-3 right-3 text-[10px] px-3 py-1 rounded-full bg-peach/20 text-peach border border-peach/30 backdrop-blur-sm z-10">
                    인기
                  </span>
                </div>

                {/* 정보 */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-cloud mb-2 group-hover:text-peach-light transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-cloud/40 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-bold text-lg">
                      {item.price.toLocaleString()}원
                    </span>
                    <span className="text-cloud/20 text-xs">QR로 주문하기</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection className="text-center" delay={600}>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 btn-gold px-8 py-4 rounded-full text-base font-medium tracking-wide"
          >
            전체 메뉴 보기
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
