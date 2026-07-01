/* ============================================
   TypeScript Types for 벌툰만화카페
   ============================================ */

// ─── Supabase DB Types ───
export interface MenuCategory {
  id: string;
  name: string;
  sort_order: number;
  created_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_popular: boolean;
  sort_order: number;
  created_at: string;
}

export interface Room {
  id: string;
  room_number: string;
  room_type: 'honeybee' | 'cave' | 'standard'; // 허니박스, 소굴방, 일반석
  qr_code_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  room_id: string;
  room_number: string;
  items: OrderItem[];
  total_price: number;
  status: OrderStatus;
  customer_note: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'preparing' | 'served' | 'cancelled';

// ─── Cart Types ───
export interface CartItem extends OrderItem {
  category_id: string;
  image_url: string | null;
}

export interface CartState {
  items: CartItem[];
  roomId: string | null;
  roomNumber: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setRoom: (roomId: string, roomNumber: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// ─── UI Types ───
export interface StoreInfo {
  name: string;
  branch: string;
  address: string;
  phone: string;
  hours: string;
  instagram: string;
  kakao: string;
  mapUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SpaceInfo {
  title: string;
  description: string;
  icon: string;
  image_url: string;
  features: string[];
}
