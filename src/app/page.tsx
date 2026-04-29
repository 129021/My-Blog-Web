import { HeroSection } from "@/components/home/HeroSection";
import { LatestPosts } from "@/components/home/LatestPosts";
import { CategoryNav } from "@/components/home/CategoryNav";
import { AboutPreview } from "@/components/home/AboutPreview";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <LatestPosts />
      <CategoryNav />
      <AboutPreview />
    </div>
  );
}
