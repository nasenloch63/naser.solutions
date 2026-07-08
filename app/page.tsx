import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { LegalModalProvider } from "@/components/legal-modal-provider"

export default function Home() {
  return (
    <LegalModalProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <StatsSection />
        <ContactSection />
        <Footer />
      </main>
    </LegalModalProvider>
  )
}
