import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CursorGlow } from "@/components/cursor-glow"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden scanlines">
      <CursorGlow />
      <div className="relative z-10">
        <Header />
        <HeroSection />
      </div>
    </main>
  )
}
