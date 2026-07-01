"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { sampleRooms } from "@/lib/data";
import type { Room } from "@/types";

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(sampleRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [baseUrl, setBaseUrl] = useState("https://beeltoon-gyeongin.vercel.app");
  const printRef = useRef<HTMLDivElement>(null);

  const getRoomTypeLabel = (type: string) => {
    const labels: Record<string, { label: string; emoji: string }> = {
      honeybee: { label: "허니박스", emoji: "🎬" },
      cave: { label: "소굴방", emoji: "🐝" },
      standard: { label: "일반석", emoji: "📚" },
    };
    return labels[type] || { label: type, emoji: "🏠" };
  };

  const toggleActive = (roomId: string) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId ? { ...r, is_active: !r.is_active } : r
      )
    );
  };

  const getOrderUrl = (room: Room) =>
    `${baseUrl}/order/${room.id}`;

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>QR코드 - ${selectedRoom?.room_number}번 방</title>
          <style>
            body { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; font-family: sans-serif; }
            .qr-card { text-align: center; padding: 40px; border: 2px solid #C9A96E; border-radius: 16px; }
            .qr-card h2 { font-size: 14px; color: #999; margin: 0 0 8px 0; }
            .qr-card h1 { font-size: 24px; margin: 0 0 20px 0; color: #2C2620; }
            .qr-card p { font-size: 12px; color: #999; margin-top: 16px; }
            svg { margin: 0 auto; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // 방 종류별로 그룹핑
  const groupedRooms = rooms.reduce(
    (acc, room) => {
      const type = room.room_type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(room);
      return acc;
    },
    {} as Record<string, Room[]>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* 페이지 타이틀 */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink">
          방 / QR코드 관리
        </h1>
        <p className="text-ink-light text-sm mt-1">
          QR코드를 생성하고 인쇄하세요
        </p>
      </div>

      {/* 기본 URL 설정 */}
      <div className="glass-hanji rounded-2xl p-5 mb-6">
        <label className="text-xs text-ink-light font-medium block mb-2">
          🔗 사이트 URL (QR코드 생성에 사용)
        </label>
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-cloud border border-gold/10 text-sm text-ink focus:outline-none focus:border-gold/30"
          placeholder="https://your-domain.com"
        />
      </div>

      {/* 방 그룹 */}
      {Object.entries(groupedRooms).map(([type, typeRooms]) => {
        const typeInfo = getRoomTypeLabel(type);
        return (
          <div key={type} className="mb-8">
            <h2 className="font-serif text-lg font-bold text-ink mb-4 flex items-center gap-2">
              <span>{typeInfo.emoji}</span>
              {typeInfo.label}
              <span className="text-xs text-ink-light font-normal">
                ({typeRooms.length}개)
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {typeRooms.map((room) => (
                <div
                  key={room.id}
                  className={`glass-hanji rounded-2xl p-5 card-hover transition-all ${
                    !room.is_active ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-ink">
                        {room.room_number}
                        <span className="text-xs text-ink-light font-normal ml-1">
                          번 방
                        </span>
                      </h3>
                      <p className="text-[11px] text-gold-dark">
                        {typeInfo.label}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleActive(room.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                        room.is_active
                          ? "bg-jade/10 text-jade-dark"
                          : "bg-ink/5 text-ink-light"
                      }`}
                    >
                      {room.is_active ? "활성" : "비활성"}
                    </button>
                  </div>

                  {/* 미니 QR */}
                  <div className="flex justify-center mb-4 p-3 bg-cloud rounded-xl">
                    <QRCodeSVG
                      value={getOrderUrl(room)}
                      size={100}
                      bgColor="transparent"
                      fgColor="#2C2620"
                      level="M"
                    />
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="flex-1 px-3 py-2 rounded-xl text-xs font-medium bg-gold/10 text-gold-dark hover:bg-gold/20 transition-colors text-center"
                    >
                      크게 보기
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setTimeout(handlePrint, 100);
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-medium bg-ink/5 text-ink-light hover:bg-ink/10 transition-colors"
                    >
                      🖨️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* QR코드 상세 모달 */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setSelectedRoom(null)}
          />
          <div className="relative glass-hanji rounded-2xl p-8 max-w-sm w-full animate-fade-up">
            <button
              onClick={() => setSelectedRoom(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-ink/5"
            >
              <svg className="w-5 h-5 text-ink-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div ref={printRef}>
              <div className="qr-card text-center">
                <h2 className="text-xs text-ink-light mb-1">벌툰만화카페</h2>
                <h1 className="font-serif text-2xl font-bold text-ink mb-6">
                  {selectedRoom.room_number}번 방
                </h1>
                <div className="flex justify-center mb-4 p-6 bg-cloud rounded-2xl inline-block mx-auto">
                  <QRCodeSVG
                    value={getOrderUrl(selectedRoom)}
                    size={200}
                    bgColor="transparent"
                    fgColor="#2C2620"
                    level="H"
                  />
                </div>
                <p className="text-[11px] text-ink-light mt-2">
                  QR코드를 스캔하여 주문하세요 🐝
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-[10px] text-ink-light/50 text-center break-all">
                {getOrderUrl(selectedRoom)}
              </p>
              <button
                onClick={handlePrint}
                className="btn-gold w-full py-3 rounded-xl text-sm font-medium"
              >
                🖨️ 인쇄하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
