import { Navbar } from "./sections/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { LogoMarquee } from "./sections/LogoMarquee";
import { FeaturesSection } from "./sections/FeaturesSection";
import { AIAdvantages } from "./sections/AIAdvantages";
import { ChannelsSection } from "./sections/ChannelsSection";
import { UseCasesSection } from "./sections/UseCasesSection";
import { CTASection } from "./sections/CTASection";
import { Footer } from "./sections/Footer";
import { ChatWidget } from "./ChatWidget";

export default function ChatbotAIPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <LogoMarquee />
      <FeaturesSection />
      <AIAdvantages />
      <ChannelsSection />
      <UseCasesSection />
      <CTASection />
      <Footer />
      <ChatWidget />
    </main>
  );
}

