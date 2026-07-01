"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { storeInfo } from "@/lib/data";

export default function Footer() {
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (href.startsWith("/#")) {
        const id = href.substring(2);
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className="bg-night text-cloud/80">
      {/* 상단 구분선 */}
      <div className="ink-divider-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 매장 정보 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🐝</span>
              <div>
                <h3 className="font-serif text-lg font-bold text-cloud">
                  {storeInfo.name}
                </h3>
                <p className="text-gold text-xs tracking-[0.15em]">
                  {storeInfo.branch}
                </p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-cloud/60">
              <p className="flex items-start gap-2">
                <span className="text-gold mt-0.5">📍</span>
                {storeInfo.address}
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <a
                  href={`tel:${storeInfo.phone}`}
                  className="hover:text-peach transition-colors"
                >
                  {storeInfo.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">🕐</span>
                {storeInfo.hours}
              </p>
            </div>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold mb-6 tracking-wider">
              바로가기
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "공간 소개", href: "/#spaces" },
                { label: "메뉴 보기", href: "/menu" },
                { label: "QR 주문", href: "/order/room-1" },
                { label: "오시는 길", href: "/#location" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-cloud/60 hover:text-peach transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-gold/40 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SNS */}
          <div>
            <h4 className="font-serif text-sm font-bold text-gold mb-6 tracking-wider">
              소셜 미디어
            </h4>
            <div className="space-y-4">
              <a
                href={storeInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cloud/60 hover:text-peach transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center text-white text-sm group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm block">Instagram</span>
                  <span className="text-xs text-cloud/40">@beeltoon_gyeongin</span>
                </div>
              </a>
              <a
                href={storeInfo.kakao}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-cloud/60 hover:text-yellow-400 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-900 text-sm group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.722 1.804 5.108 4.528 6.458l-.943 3.506a.386.386 0 00.573.416l4.17-2.745c.55.074 1.108.113 1.672.113 5.523 0 10-3.463 10-7.748S17.523 3 12 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm block">KakaoTalk</span>
                  <span className="text-xs text-cloud/40">벌툰만화카페 채널</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 하단 */}
        <div className="ink-divider-gold mt-12 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-cloud/30">
          <p>© 2024 {storeInfo.name} {storeInfo.branch}. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-serif italic text-gold/30">
            夢遊桃源 · 꿈 속의 복숭아꽃 낙원
          </p>
        </div>
      </div>
    </footer>
  );
}
