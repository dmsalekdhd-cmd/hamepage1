"use client";

import { useState } from "react";
import { sampleCategories, sampleMenuItems } from "@/lib/data";
import type { MenuItem } from "@/types";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>(sampleMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const getMenuImage = (item: MenuItem) => {
    if (item.image_url) return item.image_url;
    const fallbacks: Record<string, string> = {
      "cat-1": "/images/menu/fallback_drink.png",
      "cat-2": "/images/menu/fallback_meal.png",
      "cat-3": "/images/menu/fallback_snack.png",
      "cat-4": "/images/menu/fallback_dessert.png",
    };
    return fallbacks[item.category_id] || "/images/menu/fallback_meal.png";
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "cat-1",
    is_popular: false,
  });

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category_id === activeCategory);

  const toggleAvailability = (itemId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, is_available: !item.is_available }
          : item
      )
    );
  };

  const deleteItem = (itemId: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      category_id: item.category_id,
      is_popular: item.is_popular,
    });
    setIsAddingNew(false);
  };

  const startAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category_id: "cat-1",
      is_popular: false,
    });
    setIsAddingNew(true);
  };

  const saveItem = () => {
    if (!formData.name || !formData.price) return;

    if (editingItem) {
      // 수정
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                name: formData.name,
                description: formData.description,
                price: parseInt(formData.price),
                category_id: formData.category_id,
                is_popular: formData.is_popular,
              }
            : item
        )
      );
    } else {
      // 추가
      const newItem: MenuItem = {
        id: `item-new-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category_id: formData.category_id,
        image_url: null,
        is_available: true,
        is_popular: formData.is_popular,
        sort_order: items.length + 1,
        created_at: new Date().toISOString(),
      };
      setItems((prev) => [...prev, newItem]);
    }

    setEditingItem(null);
    setIsAddingNew(false);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setIsAddingNew(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* 페이지 타이틀 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink">
            메뉴 관리
          </h1>
          <p className="text-ink-light text-sm mt-1">
            메뉴를 추가, 수정, 삭제하세요
          </p>
        </div>
        <button
          onClick={startAdd}
          className="btn-gold px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2"
        >
          <span>+</span> 메뉴 추가
        </button>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
            activeCategory === "all"
              ? "bg-gold text-white"
              : "bg-cloud/80 text-ink-light border border-gold/10"
          }`}
        >
          전체 ({items.length})
        </button>
        {sampleCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? "bg-gold text-white"
                : "bg-cloud/80 text-ink-light border border-gold/10"
            }`}
          >
            {cat.name} ({items.filter((i) => i.category_id === cat.id).length})
          </button>
        ))}
      </div>

      {/* 추가/수정 폼 */}
      {(isAddingNew || editingItem) && (
        <div className="glass-hanji rounded-2xl p-6 mb-6 border-2 border-gold/20">
          <h3 className="font-serif text-lg font-bold text-ink mb-4">
            {editingItem ? "메뉴 수정" : "새 메뉴 추가"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-ink-light font-medium block mb-1.5">
                메뉴명 *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-cloud border border-gold/10 text-sm text-ink focus:outline-none focus:border-gold/30"
                placeholder="메뉴 이름"
              />
            </div>
            <div>
              <label className="text-xs text-ink-light font-medium block mb-1.5">
                가격 (원) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-cloud border border-gold/10 text-sm text-ink focus:outline-none focus:border-gold/30"
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-ink-light font-medium block mb-1.5">
                설명
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-cloud border border-gold/10 text-sm text-ink focus:outline-none focus:border-gold/30"
                placeholder="메뉴 설명"
              />
            </div>
            <div>
              <label className="text-xs text-ink-light font-medium block mb-1.5">
                카테고리
              </label>
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-cloud border border-gold/10 text-sm text-ink focus:outline-none focus:border-gold/30"
              >
                {sampleCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_popular}
                  onChange={(e) =>
                    setFormData({ ...formData, is_popular: e.target.checked })
                  }
                  className="w-4 h-4 rounded accent-gold"
                />
                <span className="text-sm text-ink">인기 메뉴로 표시</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={saveItem}
              className="btn-gold px-6 py-2.5 rounded-xl text-sm font-medium"
            >
              {editingItem ? "수정 완료" : "추가하기"}
            </button>
            <button
              onClick={cancelEdit}
              className="px-6 py-2.5 rounded-xl text-sm text-ink-light border border-ink/10 hover:border-ink/20 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 메뉴 리스트 */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`glass-hanji rounded-xl p-4 flex items-center gap-4 transition-all ${
              !item.is_available ? "opacity-50" : ""
            }`}
          >
            {/* 썸네일 이미지 */}
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-hanji-dark flex items-center justify-center shrink-0 border border-gold/5">
              <img
                src={getMenuImage(item)}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 정보 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-sm font-bold text-ink truncate">
                  {item.name}
                </h3>
                {item.is_popular && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-peach/10 text-peach-dark shrink-0">
                    인기
                  </span>
                )}
                {!item.is_available && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-ink/10 text-ink-light shrink-0">
                    품절
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-light/60 truncate">
                {item.description}
              </p>
            </div>

            {/* 가격 */}
            <span className="font-bold text-gold-dark text-sm shrink-0">
              {item.price.toLocaleString()}원
            </span>

            {/* 액션 */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => toggleAvailability(item.id)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  item.is_available
                    ? "bg-jade/10 text-jade-dark hover:bg-jade/20"
                    : "bg-ink/5 text-ink-light hover:bg-ink/10"
                }`}
              >
                {item.is_available ? "판매중" : "품절"}
              </button>
              <button
                onClick={() => startEdit(item)}
                className="p-2 rounded-lg text-ink-light/40 hover:text-gold-dark hover:bg-gold/5 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="p-2 rounded-lg text-ink-light/40 hover:text-red-400 hover:bg-red-50 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
