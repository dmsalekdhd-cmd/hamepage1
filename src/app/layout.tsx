import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSerifKR = Noto_Serif_KR({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "만화카페 홈페이지 만들기 연습용",
  description:
    "벌툰만화카페 경기인천점 - 허니박스, 소굴방, 닌텐도존에서 프라이빗한 시간을 보내세요. OTT 무제한, 만화책, 게임, 맛있는 푸드까지!",
  keywords: ["벌툰", "만화카페", "경기", "인천", "허니박스", "소굴방", "데이트", "만화"],
  openGraph: {
    title: "벌툰만화카페 경기인천점",
    description: "꿈 속의 복숭아꽃 낙원, 몽유도원 컨셉의 프리미엄 만화카페",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSerifKR.variable} ${notoSansKR.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
