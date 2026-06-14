import { Hero } from "@/components/hero/Hero"
import { ProofStrip } from "@/components/home/ProofStrip"
import { FeaturedWork } from "@/components/home/FeaturedWork"
import { SystemPipeline } from "@/components/home/SystemPipeline"
import { FieldGuide } from "@/components/home/FieldGuide"
import { Timeline } from "@/components/home/Timeline"
import { LabPreview } from "@/components/home/LabPreview"
import { ContactCTA } from "@/components/home/ContactCTA"

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <FeaturedWork />
      <SystemPipeline />
      <FieldGuide />
      <Timeline />
      <LabPreview />
      <ContactCTA />
    </>
  )
}
