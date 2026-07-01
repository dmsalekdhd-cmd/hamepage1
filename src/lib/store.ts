import { create } from "zustand";
import type { CartItem, CartState } from "@/types";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  roomId: null,
  roomNumber: null,

  addItem: (item: CartItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeItem: (itemId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }));
  },

  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.id !== itemId) };
      }
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
      };
    });
  },

  clearCart: () => set({ items: [] }),

  setRoom: (roomId: string, roomNumber: string) =>
    set({ roomId, roomNumber }),

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
