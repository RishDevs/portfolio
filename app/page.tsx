import { HeroSystem } from "@/components/HeroSystem"
import { ProofMarquee } from "@/components/ProofMarquee"
import { FeaturedWorkGrid } from "@/components/FeaturedWorkGrid"
import { AISystemVisualizer } from "@/components/AISystemVisualizer"
import { DualModeSection } from "@/components/DualModeSection"
import { CareerTimeline } from "@/components/CareerTimeline"
import { LabArchive } from "@/components/LabArchive"
import { ContactConversion } from "@/components/ContactConversion"

export default function HomePage() {
  return (
    <>
      <HeroSystem />
      <ProofMarquee />
      <FeaturedWorkGrid />
      <AISystemVisualizer />
      <DualModeSection />
      <CareerTimeline />
      <LabArchive />
      <ContactConversion />
    </>
  )
}
