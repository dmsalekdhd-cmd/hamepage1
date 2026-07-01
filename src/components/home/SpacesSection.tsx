"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";
import { spaces } from "@/lib/data";

export default function SpacesSection() {
  return (
    <section id="spaces" className="relative py-24 md:py-32 bg-hanji-texture overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-peach/[0.04] blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-jade/[0.05] blur-[60px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 섹션 타이틀 */}
        <AnimatedSection className="text-center mb-16 md:mb-20">
          <p className="text-gold/60 text-xs tracking-[0.4em] uppercase mb-3 font-serif">
            空間
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4">
            나만의 <span className="text-gradient-peach">특별한 공간</span>
          </h2>
          <div className="ink-divider max-w-[120px] mx-auto mb-6" />
          <p className="text-ink-light text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            벌툰만화카페에서 당신만을 위한 아늑하고 특별한 공간을 만나보세요
          </p>
        </AnimatedSection>

        {/* 공간 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {spaces.map((space, index) => (
            <AnimatedSection key={space.title} delay={index * 150}>
              <div className="glass-hanji rounded-2xl overflow-hidden card-hover group cursor-pointer h-full flex flex-col">
                {/* 이미지 영역 */}
                <div className="relative h-44 w-full overflow-hidden bg-hanji-dark">
                  <img
                    src={space.image_url}
                    alt={space.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* 이모지 아이콘은 우측 하단에 배지 형태로 노출하여 위트를 더함 */}
                  <span className="absolute bottom-3 right-3 text-xl bg-cloud/90 backdrop-blur-sm px-2 py-1.5 rounded-xl shadow-sm border border-gold/10">
                    {space.icon}
                  </span>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* 타이틀 */}
                    <h3 className="font-serif text-lg md:text-xl font-bold text-ink mb-3 group-hover:text-peach-dark transition-colors">
                      {space.title}
                    </h3>

                    {/* 설명 */}
                    <p className="text-ink-light/80 text-sm leading-relaxed mb-5 min-h-[60px]">
                      {space.description}
                    </p>
                  </div>

                  {/* 특징 태그 */}
                  <div className="flex flex-wrap gap-1.5">
                    {space.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold-dark border border-gold/15 whitespace-nowrap"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
