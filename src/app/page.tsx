import { AboutSection } from '@/components/sections/AboutSection'
import { BlogSection } from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/sections/Footer'
import { Header } from '@/components/sections/Header'
import { HeroSection } from '@/components/sections/HeroSection'
import { PortfolioSection } from '@/components/sections/PortfolioSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { TechnologyMarquee } from '@/components/sections/TechnologyMarquee'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TechnologyMarquee />
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
