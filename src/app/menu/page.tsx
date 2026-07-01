"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { sampleCategories, sampleMenuItems } from "@/lib/data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredItems =
    activeCategory === "all"
      ? sampleMenuItems
      : sampleMenuItems.filter((item) => item.category_id === activeCategory);

  const getCategoryEmoji = (categoryId: string) => {
    const map: Record<string, string> = {
      "cat-1": "☕",
      "cat-2": "🍜",
      "cat-3": "🍕",
      "cat-4": "🍰",
    };
    return map[categoryId] || "🍽️";
  };

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
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* 헤더 배너 */}
        <section className="relative bg-night-texture py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-peach/[0.04] blur-[100px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gold/[0.04] blur-[80px]" />
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <p className="text-gold/50 text-xs tracking-[0.4em] mb-3 font-serif">
              食單
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-cloud mb-4">
              <span className="text-gradient-gold">메뉴</span>
            </h1>
            <p className="text-cloud/40 text-sm md:text-base">
              만화카페에서 즐기는 맛있는 음식과 음료
            </p>
          </div>
        </section>

        {/* 메뉴 콘텐츠 */}
        <section className="bg-hanji-texture py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 카테고리 필터 */}
            <AnimatedSection className="mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === "all"
                      ? "btn-gold"
                      : "bg-cloud/60 text-ink-light border border-gold/10 hover:border-gold/30 hover:bg-cloud"
                  }`}
                >
                  전체 보기
                </button>
                {sampleCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "btn-gold"
                        : "bg-cloud/60 text-ink-light border border-gold/10 hover:border-gold/30 hover:bg-cloud"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* 메뉴 그리드 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <AnimatedSection key={item.id} delay={index * 80}>
                  <div
                    className={`glass-hanji rounded-2xl overflow-hidden card-hover group relative ${
                      !item.is_available ? "opacity-60" : ""
                    }`}
                  >
                    {/* 이미지 영역 */}
                    <div className="relative h-40 bg-hanji-dark overflow-hidden flex items-center justify-center">
                      <img
                        src={getMenuImage(item)}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.is_popular && (
                        <span className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-full bg-peach/15 text-peach-dark border border-peach/20 z-10">
                          인기
                        </span>
                      )}
                      {!item.is_available && (
                        <div className="absolute inset-0 bg-ink/40 flex items-center justify-center z-10">
                          <span className="text-cloud text-sm font-medium px-4 py-2 rounded-full bg-ink/60 backdrop-blur-sm">
                            품절
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 정보 */}
                    <div className="p-5">
                      <h3 className="font-serif text-base font-bold text-ink mb-1.5 group-hover:text-peach-dark transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-ink-light/70 text-xs leading-relaxed mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gold-dark font-bold text-lg">
                          {item.price.toLocaleString()}
                          <span className="text-xs font-normal ml-0.5">원</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* QR 주문 안내 */}
            <AnimatedSection className="mt-16" delay={400}>
              <div className="glass-hanji rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto">
                <span className="text-4xl mb-4 block">📱</span>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-ink mb-3">
                  QR코드로 간편 주문
                </h3>
                <p className="text-ink-light text-sm leading-relaxed mb-6">
                  각 방에 비치된 QR코드를 스캔하면
                  <br />
                  자리에서 바로 주문하실 수 있습니다
                </p>
                <div className="ink-divider max-w-[80px] mx-auto" />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
