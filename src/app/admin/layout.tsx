"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  { label: "대시보드", href: "/admin", icon: "📊" },
  { label: "주문 관리", href: "/admin/orders", icon: "📋" },
  { label: "메뉴 관리", href: "/admin/menu", icon: "🍽️" },
  { label: "방/QR 관리", href: "/admin/rooms", icon: "🔑" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 로그인 페이지는 레이아웃 적용 안 함
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; max-age=0";
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-hanji-texture flex">
      {/* 사이드바 - 데스크탑 */}
      <aside className="hidden lg:flex flex-col w-64 bg-night text-cloud shrink-0">
        {/* 로고 */}
        <div className="p-6 border-b border-cloud/5">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-2xl">📚</span>
            <div>
              <h1 className="font-serif text-sm font-bold text-cloud">
                만화카페
              </h1>
              <p className="text-[10px] text-gold/60 tracking-wider">
                관리자 패널
              </p>
            </div>
          </Link>
        </div>

        {/* 네비게이션 */}
        <nav className="flex-1 p-4 space-y-1">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                pathname === item.href
                  ? "bg-gold/15 text-gold font-medium"
                  : "text-cloud/50 hover:text-cloud hover:bg-cloud/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 하단 */}
        <div className="p-4 border-t border-cloud/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-cloud/30 hover:text-cloud/60 transition-colors"
          >
            <span>🏠</span>
            홈페이지 보기
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-cloud/30 hover:text-red-400 transition-colors mt-1"
          >
            <span>🚪</span>
            로그아웃
          </button>
        </div>
      </aside>

      {/* 모바일 사이드바 오버레이 */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-night text-cloud animate-slide-up flex flex-col">
            <div className="p-6 border-b border-cloud/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📚</span>
                <h1 className="font-serif text-sm font-bold">관리자</h1>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 text-cloud/40"
              >
                ✕
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    pathname === item.href
                      ? "bg-gold/15 text-gold font-medium"
                      : "text-cloud/50 hover:text-cloud"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-cloud/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-cloud/30 hover:text-red-400 transition-colors"
              >
                <span>🚪</span>
                로그아웃
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 모바일 헤더 */}
        <header className="lg:hidden sticky top-0 z-30 glass-hanji border-b border-gold/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-ink/5 transition-colors"
          >
            <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-serif text-sm font-bold text-ink">📚 관리자</span>
          <div className="w-9" />
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
