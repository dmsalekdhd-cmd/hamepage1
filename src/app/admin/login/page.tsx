"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 데모용: 간단한 로그인 처리
    if (password === "admin1234") {
      // 쿠키에 간단한 세션 저장 (데모용)
      document.cookie = "admin_session=demo_token; path=/; max-age=86400";
      window.location.href = "/admin";
    } else {
      setError("비밀번호가 올바르지 않습니다");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-night-texture flex items-center justify-center p-4">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-peach/[0.03] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-gold/[0.03] blur-[80px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="glass-dark rounded-2xl p-8 md:p-10 animate-fade-up">
          {/* 로고 */}
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🐝</span>
            <h1 className="font-serif text-2xl font-bold text-cloud mb-1">
              관리자 로그인
            </h1>
            <p className="text-cloud/40 text-xs tracking-wider">
              벌툰만화카페 경기인천점
            </p>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* 로그인 폼 */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs text-cloud/50 font-medium block mb-2">
                관리자 비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full px-4 py-3 rounded-xl bg-cloud/5 border border-cloud/10 text-cloud text-sm placeholder:text-cloud/20 focus:outline-none focus:border-gold/30 transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {loading ? "로그인 중..." : "대시보드 접속"}
            </button>
          </form>

          {/* 데모 계정 안내 */}
          <div className="mt-6 p-4 rounded-xl bg-cloud/5 border border-cloud/5">
            <p className="text-[10px] text-cloud/30 text-center">
              비밀번호: admin1234
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
