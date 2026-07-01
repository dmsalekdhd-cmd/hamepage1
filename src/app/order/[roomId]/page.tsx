"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { sampleCategories, sampleMenuItems, sampleRooms } from "@/lib/data";
import type { CartItem } from "@/types";

export default function OrderPage({ params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = use(params);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [customerNote, setCustomerNote] = useState("");

  const {
    items: cartItems,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setRoom,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  // 방 정보 설정
  const room = sampleRooms.find((r) => r.id === roomId);
  const roomNumber = room?.room_number || roomId.replace("room-", "");

  useEffect(() => {
    setRoom(roomId, roomNumber);
  }, [roomId, roomNumber, setRoom]);

  const filteredItems =
    activeCategory === "all"
      ? sampleMenuItems.filter((item) => item.is_available)
      : sampleMenuItems.filter(
          (item) => item.category_id === activeCategory && item.is_available
        );

  const handleAddToCart = (item: (typeof sampleMenuItems)[0]) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      category_id: item.category_id,
      image_url: item.image_url,
    };
    addItem(cartItem);
  };

  const handleSubmitOrder = () => {
    // 실제로는 Supabase에 주문 저장
    setOrderSubmitted(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

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

  if (orderSubmitted) {
    return (
      <div className="min-h-screen bg-hanji-texture flex items-center justify-center p-4">
        <div className="glass-hanji rounded-2xl p-10 md:p-14 text-center max-w-md animate-fade-up">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-3">
            주문 완료!
          </h2>
          <p className="text-ink-light text-sm mb-2">
            <span className="text-gold-dark font-bold">{roomNumber}번 방</span>
            으로 음식을 가져다 드리겠습니다
          </p>
          <p className="text-ink-light/60 text-xs mb-8">
            잠시만 기다려 주세요 🐝
          </p>
          <div className="space-y-3">
            <Link
              href={`/order/${roomId}`}
              onClick={() => setOrderSubmitted(false)}
              className="btn-peach block w-full py-3 rounded-xl text-sm font-medium"
            >
              추가 주문하기
            </Link>
            <Link
              href="/"
              className="block w-full py-3 rounded-xl text-sm font-medium text-ink-light border border-ink/10 hover:border-gold/30 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hanji-texture">
      {/* 상단 바 */}
      <header className="sticky top-0 z-40 glass-hanji border-b border-gold/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-ink-light hover:text-ink transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="font-serif text-base font-bold text-ink">QR 주문</h1>
              <p className="text-[11px] text-gold-dark">
                🐝 {roomNumber}번 방
              </p>
            </div>
          </div>

          {/* 장바구니 버튼 */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
          >
            <svg className="w-5 h-5 text-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5.4 5M7 13l-2.3 2.3c-.4.4-.2 1.1.4 1.2.3 0 .5 0 .8 0h11.6M16 16a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-peach text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 카테고리 탭 */}
      <div className="sticky top-[57px] z-30 bg-hanji/95 backdrop-blur-md border-b border-gold/5">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                activeCategory === "all"
                  ? "btn-gold shadow-md"
                  : "bg-cloud/60 text-ink-light border border-gold/10 hover:border-gold/30 hover:bg-cloud"
              }`}
            >
              전체
            </button>
            {sampleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "btn-gold shadow-md"
                    : "bg-cloud/60 text-ink-light border border-gold/10 hover:border-gold/30 hover:bg-cloud"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const cartItem = cartItems.find((ci) => ci.id === item.id);
            return (
              <div
                key={item.id}
                className="glass-hanji rounded-xl p-4 flex items-center gap-4 card-hover"
              >
                {/* 클릭 가능 영역 (이미지 + 정보) */}
                <div
                  onClick={() => handleAddToCart(item)}
                  className="flex-1 flex items-center gap-4 min-w-0 cursor-pointer"
                >
                  {/* 썸네일 이미지 */}
                  <div className="w-14 h-14 rounded-xl bg-hanji-dark overflow-hidden flex items-center justify-center shrink-0 border border-gold/10">
                    <img
                      src={getMenuImage(item)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-sm font-bold text-ink truncate">
                        {item.name}
                      </h3>
                      {item.is_popular && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-peach/10 text-peach-dark shrink-0">
                          인기
                        </span>
                      )}
                    </div>
                    <p className="text-ink-light/60 text-[11px] line-clamp-1 mt-0.5">
                      {item.description}
                    </p>
                    <p className="text-gold-dark font-bold text-sm mt-1">
                      {item.price.toLocaleString()}원
                    </p>
                  </div>
                </div>

                {/* 수량 컨트롤 */}
                <div className="shrink-0">
                  {cartItem ? (
                    <div className="flex items-center gap-2 bg-gold/10 rounded-full px-2 py-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, cartItem.quantity - 1)
                        }
                        className="w-7 h-7 rounded-full bg-cloud flex items-center justify-center text-ink-light hover:bg-peach/10 transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-ink min-w-[20px] text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, cartItem.quantity + 1)
                        }
                        className="w-7 h-7 rounded-full bg-cloud flex items-center justify-center text-ink-light hover:bg-peach/10 transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center text-gold-dark hover:bg-gold/20 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 하단 장바구니 바 */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-hanji via-hanji to-transparent pt-8">
          <button
            onClick={() => setIsCartOpen(true)}
            className="btn-peach w-full max-w-3xl mx-auto py-4 rounded-2xl text-base font-medium flex items-center justify-center gap-3 block"
          >
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-sm">
              {getTotalItems()}
            </span>
            장바구니 보기
            <span className="font-bold">
              {getTotalPrice().toLocaleString()}원
            </span>
          </button>
        </div>
      )}

      {/* 장바구니 슬라이드 패널 */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* 오버레이 */}
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* 패널 */}
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-hanji rounded-t-3xl animate-slide-up overflow-hidden flex flex-col">
            {/* 핸들 */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-ink/15" />
            </div>

            {/* 헤더 */}
            <div className="px-6 pb-4 flex items-center justify-between border-b border-gold/10">
              <div>
                <h2 className="font-serif text-lg font-bold text-ink">
                  장바구니
                </h2>
                <p className="text-[11px] text-gold-dark">
                  🐝 {roomNumber}번 방
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full hover:bg-ink/5 transition-colors"
              >
                <svg className="w-5 h-5 text-ink-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 아이템 리스트 */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-12 text-ink-light/40">
                  <span className="text-4xl block mb-3">🛒</span>
                  <p className="text-sm">장바구니가 비어있습니다</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-gold/5 last:border-0"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-ink truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gold-dark mt-0.5">
                          {item.price.toLocaleString()}원
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-2 bg-gold/10 rounded-full px-2 py-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-cloud flex items-center justify-center text-ink-light text-xs font-bold"
                          >
                            −
                          </button>
                          <span className="text-xs font-bold text-ink min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-cloud flex items-center justify-center text-ink-light text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-sm font-bold text-ink min-w-[60px] text-right">
                          {(item.price * item.quantity).toLocaleString()}원
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-ink-light/30 hover:text-red-400 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 요청사항 */}
              {cartItems.length > 0 && (
                <div className="mt-6">
                  <label className="text-xs text-ink-light font-medium block mb-2">
                    요청사항 (선택)
                  </label>
                  <textarea
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="예: 매운맛 적게, 얼음 많이 등"
                    className="w-full px-4 py-3 rounded-xl bg-cloud/50 border border-gold/10 text-sm text-ink placeholder:text-ink-light/30 focus:outline-none focus:border-gold/30 resize-none"
                    rows={2}
                  />
                </div>
              )}
            </div>

            {/* 결제 영역 */}
            {cartItems.length > 0 && (
              <div className="px-6 py-5 border-t border-gold/10 bg-hanji">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-ink-light">총 주문금액</span>
                  <span className="text-xl font-bold text-ink font-serif">
                    {getTotalPrice().toLocaleString()}
                    <span className="text-sm font-normal ml-0.5">원</span>
                  </span>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="btn-peach w-full py-4 rounded-2xl text-base font-medium"
                >
                  주문하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
