"use client";

import Link from "next/link";

export default function AdminDashboard() {
  // 데모 데이터
  const stats = [
    {
      label: "오늘 주문",
      value: "23",
      sub: "+5 전일 대비",
      icon: "📋",
      color: "peach",
    },
    {
      label: "오늘 매출",
      value: "287,500",
      sub: "원",
      icon: "💰",
      color: "gold",
    },
    {
      label: "대기중 주문",
      value: "3",
      sub: "처리 필요",
      icon: "⏳",
      color: "jade",
    },
    {
      label: "활성 방",
      value: "8",
      sub: "/ 8 전체",
      icon: "🔑",
      color: "ink",
    },
  ];

  const recentOrders = [
    { id: "1", room: "101", items: "아메리카노 x2, 허니브레드", total: 14000, status: "pending", time: "2분 전" },
    { id: "2", room: "203", items: "치즈불닭볶음면, 카페라떼", total: 10500, status: "preparing", time: "8분 전" },
    { id: "3", room: "102", items: "대패삼겹살 비빔면 x2", total: 15000, status: "preparing", time: "12분 전" },
    { id: "4", room: "301", items: "복숭아 아이스티, 감자튀김", total: 8000, status: "served", time: "25분 전" },
    { id: "5", room: "201", items: "로제떡볶이, 닭꼬치 세트", total: 11500, status: "served", time: "30분 전" },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { className: string; label: string }> = {
      pending: { className: "status-pending", label: "대기중" },
      preparing: { className: "status-preparing", label: "조리중" },
      served: { className: "status-served", label: "서빙완료" },
      cancelled: { className: "status-cancelled", label: "취소" },
    };
    const s = styles[status] || styles.pending;
    return (
      <span className={`${s.className} text-[11px] px-2.5 py-1 rounded-full font-medium`}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 페이지 타이틀 */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink">
          대시보드
        </h1>
        <p className="text-ink-light text-sm mt-1">
          오늘의 매장 현황을 확인하세요
        </p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-hanji rounded-2xl p-5 md:p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-xs text-ink-light mb-1">{stat.label}</p>
            <p className="text-2xl md:text-3xl font-bold text-ink font-serif">
              {stat.value}
            </p>
            <p className="text-[11px] text-ink-light/50 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* 최근 주문 */}
      <div className="glass-hanji rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-lg font-bold text-ink">최근 주문</h2>
          <Link
            href="/admin/orders"
            className="text-xs text-gold-dark hover:text-gold transition-colors"
          >
            전체 보기 →
          </Link>
        </div>

        {/* 테이블 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gold/10">
                <th className="text-left py-3 px-2 text-xs text-ink-light font-medium">
                  방
                </th>
                <th className="text-left py-3 px-2 text-xs text-ink-light font-medium">
                  주문 내용
                </th>
                <th className="text-right py-3 px-2 text-xs text-ink-light font-medium">
                  금액
                </th>
                <th className="text-center py-3 px-2 text-xs text-ink-light font-medium">
                  상태
                </th>
                <th className="text-right py-3 px-2 text-xs text-ink-light font-medium">
                  시간
                </th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gold/5 last:border-0 hover:bg-gold/3 transition-colors"
                >
                  <td className="py-3.5 px-2">
                    <span className="font-bold text-ink">{order.room}</span>
                  </td>
                  <td className="py-3.5 px-2 text-ink-light max-w-[200px] truncate">
                    {order.items}
                  </td>
                  <td className="py-3.5 px-2 text-right font-medium text-ink">
                    {order.total.toLocaleString()}원
                  </td>
                  <td className="py-3.5 px-2 text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-3.5 px-2 text-right text-ink-light/50 text-xs">
                    {order.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
