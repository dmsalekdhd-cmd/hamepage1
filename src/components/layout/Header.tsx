"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { storeInfo } from "@/lib/data";

const navItems = [
  { label: "홈", href: "/" },
  { label: "공간소개", href: "/#spaces" },
  { label: "메뉴", href: "/menu" },
  { label: "오시는 길", href: "/#location" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-hanji py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <span className="text-3xl">📚</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-pulse-soft" />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg font-bold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-ink" : "text-cloud"
                }`}
              >
                {storeInfo.name}
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  isScrolled ? "text-gold-dark" : "text-gold-light"
                }`}
              >
                {storeInfo.branch}
              </span>
            </div>
          </Link>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-peach group ${
                  isScrolled ? "text-ink-light" : "text-cloud"
                }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-peach to-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="/order/room-1"
              className="btn-peach px-5 py-2 rounded-full text-sm font-medium"
            >
              주문하기
            </Link>
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? "text-ink" : "text-cloud"
            }`}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* 모바일 메뉴 */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            isMobileMenuOpen ? "max-h-80 mt-4" : "max-h-0"
          }`}
        >
          <div className="glass-hanji rounded-2xl p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleNavClick(e, item.href);
                }}
                className="block text-ink-light hover:text-peach transition-colors text-sm font-medium py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/order/room-1"
              className="block btn-peach text-center py-3 rounded-xl text-sm font-medium mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              주문하기
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
