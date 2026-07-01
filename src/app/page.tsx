import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/layout/FloatingButtons";
import HeroSection from "@/components/home/HeroSection";
import SpacesSection from "@/components/home/SpacesSection";
import MenuPreview from "@/components/home/MenuPreview";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SpacesSection />
        <MenuPreview />
        <LocationSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
