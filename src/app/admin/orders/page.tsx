"use client";

import { useState } from "react";

type OrderStatus = "pending" | "preparing" | "served" | "cancelled";

interface DemoOrder {
  id: string;
  room: string;
  items: string;
  total: number;
  status: OrderStatus;
  note: string;
  time: string;
}

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<string>("all");

  const [orders, setOrders] = useState<DemoOrder[]>([
    { id: "ord-1", room: "101", items: "아메리카노 x2, 허니브레드", total: 14000, status: "pending", note: "", time: "11:05" },
    { id: "ord-2", room: "203", items: "치즈불닭볶음면, 카페라떼", total: 10500, status: "pending", note: "매운맛 적게", time: "11:02" },
    { id: "ord-3", room: "102", items: "대패삼겹살 비빔면 x2", total: 15000, status: "preparing", note: "", time: "10:55" },
    { id: "ord-4", room: "301", items: "복숭아 아이스티, 감자튀김", total: 8000, status: "preparing", note: "얼음 많이", time: "10:48" },
    { id: "ord-5", room: "201", items: "로제떡볶이, 닭꼬치 세트", total: 11500, status: "served", note: "", time: "10:35" },
    { id: "ord-6", room: "302", items: "카페라떼, 와플", total: 10500, status: "served", note: "", time: "10:20" },
    { id: "ord-7", room: "103", items: "참치마요덮밥, 초코라떼", total: 11000, status: "served", note: "", time: "10:10" },
  ]);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

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

  const getNextStatus = (status: OrderStatus): OrderStatus | null => {
    const flow: Record<OrderStatus, OrderStatus | null> = {
      pending: "preparing",
      preparing: "served",
      served: null,
      cancelled: null,
    };
    return flow[status];
  };

  const getActionLabel = (status: OrderStatus): string => {
    const labels: Record<OrderStatus, string> = {
      pending: "접수하기",
      preparing: "서빙완료",
      served: "",
      cancelled: "",
    };
    return labels[status];
  };

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    served: orders.filter((o) => o.status === "served").length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 페이지 타이틀 */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink">
          주문 관리
        </h1>
        <p className="text-ink-light text-sm mt-1">
          실시간으로 주문을 확인하고 상태를 변경하세요
        </p>
      </div>

      {/* 필터 탭 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "all", label: "전체", count: counts.all },
          { key: "pending", label: "⏳ 대기중", count: counts.pending },
          { key: "preparing", label: "🔥 조리중", count: counts.preparing },
          { key: "served", label: "✅ 서빙완료", count: counts.served },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              filter === tab.key
                ? "bg-gold text-white shadow-md"
                : "bg-cloud/80 text-ink-light border border-gold/10 hover:border-gold/20"
            }`}
          >
            {tab.label}
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                filter === tab.key
                  ? "bg-white/20"
                  : "bg-ink/5"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 주문 카드 리스트 */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={`glass-hanji rounded-2xl p-5 md:p-6 transition-all ${
              order.status === "pending"
                ? "border-l-4 border-l-gold"
                : order.status === "preparing"
                  ? "border-l-4 border-l-peach"
                  : ""
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* 방번호 & 시간 */}
              <div className="flex items-center gap-3 md:w-24 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <span className="font-serif text-lg font-bold text-gold-dark">
                    {order.room}
                  </span>
                </div>
                <div className="md:hidden">
                  <p className="text-xs text-ink-light">{order.time}</p>
                  {getStatusBadge(order.status)}
                </div>
              </div>

              {/* 주문 내용 */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink mb-1">
                  {order.items}
                </p>
                {order.note && (
                  <p className="text-xs text-peach-dark bg-peach/5 px-3 py-1 rounded-lg inline-block">
                    📝 {order.note}
                  </p>
                )}
              </div>

              {/* 금액 & 상태 & 액션 */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="font-bold text-ink text-sm">
                  {order.total.toLocaleString()}원
                </span>
                <span className="hidden md:inline">{getStatusBadge(order.status)}</span>
                <span className="hidden md:inline text-xs text-ink-light/50">
                  {order.time}
                </span>

                {/* 액션 버튼 */}
                {getNextStatus(order.status) && (
                  <button
                    onClick={() =>
                      updateStatus(
                        order.id,
                        getNextStatus(order.status) as OrderStatus
                      )
                    }
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                      order.status === "pending"
                        ? "btn-gold"
                        : "btn-jade"
                    }`}
                  >
                    {getActionLabel(order.status)}
                  </button>
                )}

                {order.status === "pending" && (
                  <button
                    onClick={() => updateStatus(order.id, "cancelled")}
                    className="px-3 py-2 rounded-xl text-xs text-ink-light/40 hover:text-red-400 border border-ink/5 hover:border-red-200 transition-all"
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-16 text-ink-light/40">
            <span className="text-4xl block mb-3">📭</span>
            <p className="text-sm">해당 상태의 주문이 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
