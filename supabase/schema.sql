-- ============================================
-- 벌툰만화카페 - 데이터베이스 스키마
-- Supabase SQL Editor에서 실행하세요
-- ============================================

-- 메뉴 카테고리
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 메뉴 아이템
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price INT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 방 정보
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number TEXT NOT NULL UNIQUE,
  room_type TEXT NOT NULL CHECK (room_type IN ('honeybee', 'cave', 'standard')),
  qr_code_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 주문
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id),
  room_number TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total_price INT NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'preparing', 'served', 'cancelled')),
  customer_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_room ON orders(room_id);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- RLS (Row Level Security) 정책
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 메뉴 카테고리: 모든 사용자 읽기 가능, 인증된 사용자만 수정
CREATE POLICY "menu_categories_read" ON menu_categories FOR SELECT USING (true);
CREATE POLICY "menu_categories_write" ON menu_categories FOR ALL USING (auth.role() = 'authenticated');

-- 메뉴 아이템: 모든 사용자 읽기 가능, 인증된 사용자만 수정
CREATE POLICY "menu_items_read" ON menu_items FOR SELECT USING (true);
CREATE POLICY "menu_items_write" ON menu_items FOR ALL USING (auth.role() = 'authenticated');

-- 방: 모든 사용자 읽기 가능, 인증된 사용자만 수정
CREATE POLICY "rooms_read" ON rooms FOR SELECT USING (true);
CREATE POLICY "rooms_write" ON rooms FOR ALL USING (auth.role() = 'authenticated');

-- 주문: 모든 사용자 생성/읽기 가능, 인증된 사용자만 상태 수정
CREATE POLICY "orders_read" ON orders FOR SELECT USING (true);
CREATE POLICY "orders_insert" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_update" ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- Realtime 구독 활성화
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- ============================================
-- 초기 데이터 (선택사항)
-- ============================================

-- 메뉴 카테고리 삽입
INSERT INTO menu_categories (name, sort_order) VALUES
  ('☕ 음료', 1),
  ('🍜 식사', 2),
  ('🍕 스낵', 3),
  ('🍰 디저트', 4)
ON CONFLICT DO NOTHING;

-- 방 정보 삽입
INSERT INTO rooms (room_number, room_type) VALUES
  ('101', 'honeybee'),
  ('102', 'honeybee'),
  ('103', 'honeybee'),
  ('201', 'cave'),
  ('202', 'cave'),
  ('203', 'cave'),
  ('301', 'standard'),
  ('302', 'standard')
ON CONFLICT (room_number) DO NOTHING;
