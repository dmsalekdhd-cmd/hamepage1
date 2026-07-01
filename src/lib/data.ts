import type { StoreInfo, MenuItem, MenuCategory, Room, SpaceInfo } from "@/types";

// ─── 매장 정보 (나중에 직접 수정하세요) ───
export const storeInfo: StoreInfo = {
  name: "만화카페 홈페이지",
  branch: "만들기 연습용",
  address: "경기도 부천시 원미구 중동로 123, 2층",
  phone: "032-123-4567",
  hours: "매일 10:00 - 02:00 (다음날)",
  instagram: "https://www.instagram.com/beeltoon_gyeongin",
  kakao: "https://pf.kakao.com/_BeelToon",
  mapUrl: "https://map.kakao.com/",
};

// ─── 공간 소개 ───
export const spaces: SpaceInfo[] = [
  {
    title: "허니박스",
    description:
      "프라이빗한 공간에서 빔프로젝터와 대형 스크린으로 넷플릭스, 티빙, 유튜브를 무제한 시청하세요.",
    icon: "🎬",
    image_url: "/images/spaces/honeybox.png",
    features: ["빔프로젝터", "OTT 무제한", "프라이빗 공간", "블루투스 스피커"],
  },
  {
    title: "소굴방",
    description:
      "아늑한 벌집 모양의 공간에서 만화책과 함께 편안한 시간을 보내세요.",
    icon: "🐝",
    image_url: "/images/spaces/cave.png",
    features: ["아늑한 공간", "만화책 무제한", "편안한 쿠션", "개인 조명"],
  },
  {
    title: "닌텐도존",
    description:
      "닌텐도 스위치로 친구들과 함께 다양한 게임을 즐겨보세요.",
    icon: "🎮",
    image_url: "/images/spaces/nintendo.png",
    features: ["닌텐도 스위치", "대형 모니터", "다양한 게임", "그룹 플레이"],
  },
  {
    title: "일반석",
    description:
      "넓은 공간에서 자유롭게 만화책을 읽거나 보드게임을 즐길 수 있습니다.",
    icon: "📚",
    image_url: "/images/spaces/standard.png",
    features: ["넓은 좌석", "만화책 무제한", "보드게임", "Wi-Fi"],
  },
];

// ─── 샘플 메뉴 카테고리 ───
export const sampleCategories: MenuCategory[] = [
  { id: "cat-1", name: "☕ 음료", sort_order: 1, created_at: new Date().toISOString() },
  { id: "cat-2", name: "🍜 식사", sort_order: 2, created_at: new Date().toISOString() },
  { id: "cat-3", name: "🍕 스낵", sort_order: 3, created_at: new Date().toISOString() },
  { id: "cat-4", name: "🍰 디저트", sort_order: 4, created_at: new Date().toISOString() },
];

// ─── 샘플 메뉴 아이템 ───
export const sampleMenuItems: MenuItem[] = [
  // 음료
  {
    id: "item-1",
    category_id: "cat-1",
    name: "아메리카노",
    description: "깊고 풍부한 원두의 향을 느낄 수 있는 클래식 아메리카노",
    price: 3500,
    image_url: "/images/menu/americano.png",
    is_available: true,
    is_popular: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-2",
    category_id: "cat-1",
    name: "카페라떼",
    description: "부드러운 우유와 에스프레소의 조화",
    price: 4500,
    image_url: "/images/menu/cafe_latte.png",
    is_available: true,
    is_popular: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-3",
    category_id: "cat-1",
    name: "복숭아 아이스티",
    description: "상큼한 복숭아향이 가득한 시원한 아이스티",
    price: 4000,
    image_url: "/images/menu/peach_iced_tea.png",
    is_available: true,
    is_popular: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-4",
    category_id: "cat-1",
    name: "초코라떼",
    description: "진한 초콜릿과 부드러운 우유의 달콤한 만남",
    price: 4500,
    image_url: "/images/menu/choco_latte.png",
    is_available: true,
    is_popular: false,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  // 식사
  {
    id: "item-5",
    category_id: "cat-2",
    name: "치즈불닭볶음면",
    description: "매콤한 불닭볶음면에 치즈를 듬뿍 올린 인기 메뉴",
    price: 6000,
    image_url: "/images/menu/cheese_ramen.png",
    is_available: true,
    is_popular: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-6",
    category_id: "cat-2",
    name: "대패삼겹살 비빔면",
    description: "얇게 썬 삼겹살과 매콤한 비빔면의 환상 조합",
    price: 7500,
    image_url: "/images/menu/pork_noodles.png",
    is_available: true,
    is_popular: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-7",
    category_id: "cat-2",
    name: "참치마요덮밥",
    description: "고소한 참치마요와 따뜻한 밥의 든든한 한 끼",
    price: 6500,
    image_url: "/images/menu/tuna_mayo.png",
    is_available: true,
    is_popular: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-8",
    category_id: "cat-2",
    name: "로제떡볶이",
    description: "크리미한 로제소스에 쫄깃한 떡볶이",
    price: 6000,
    image_url: "/images/menu/rose_tteokbokki.png",
    is_available: true,
    is_popular: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
  // 스낵
  {
    id: "item-9",
    category_id: "cat-3",
    name: "닭꼬치 세트",
    description: "달콤한 양념의 바삭한 닭꼬치 3개 세트",
    price: 5500,
    image_url: "/images/menu/chicken_skewers.png",
    is_available: true,
    is_popular: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-10",
    category_id: "cat-3",
    name: "감자튀김",
    description: "바삭하고 포슬포슬한 감자튀김",
    price: 4000,
    image_url: "/images/menu/french_fries.png",
    is_available: true,
    is_popular: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-11",
    category_id: "cat-3",
    name: "소떡소떡",
    description: "소시지와 떡의 달콤한 꼬치",
    price: 4500,
    image_url: "/images/menu/sotteok.png",
    is_available: true,
    is_popular: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  // 디저트
  {
    id: "item-12",
    category_id: "cat-4",
    name: "허니브레드",
    description: "달콤한 꿀과 아이스크림을 올린 만화카페 시그니처 디저트",
    price: 7000,
    image_url: "/images/menu/honey_bread.png",
    is_available: true,
    is_popular: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "item-13",
    category_id: "cat-4",
    name: "와플",
    description: "바삭한 와플에 생크림과 과일을 곁들인",
    price: 6000,
    image_url: "/images/menu/waffle.png",
    is_available: true,
    is_popular: false,
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
];

// ─── 샘플 방 정보 ───
export const sampleRooms: Room[] = [
  { id: "room-1", room_number: "101", room_type: "honeybee", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-2", room_number: "102", room_type: "honeybee", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-3", room_number: "103", room_type: "honeybee", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-4", room_number: "201", room_type: "cave", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-5", room_number: "202", room_type: "cave", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-6", room_number: "203", room_type: "cave", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-7", room_number: "301", room_type: "standard", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "room-8", room_number: "302", room_type: "standard", qr_code_url: null, is_active: true, created_at: new Date().toISOString() },
];
