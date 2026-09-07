import { HeroSection } from "./sections/HeroSection";
import { LogoMarquee } from "./sections/LogoMarquee";
import { FeaturesSection } from "./sections/FeaturesSection";
import { AIAdvantages } from "./sections/AIAdvantages";
import { ChannelsSection } from "./sections/ChannelsSection";
import { UseCasesSection } from "./sections/UseCasesSection";
import { CTASection } from "./sections/CTASection";

export default function ChatbotAIPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-white overflow-x-hidden selection:bg-emerald-500 selection:text-black relative">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[10%] w-[500px] h-[500px] bg-cyan-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10">
        <HeroSection />
        <LogoMarquee />
        <FeaturesSection />
        <AIAdvantages />
        <ChannelsSection />
        <UseCasesSection />
        <CTASection />
      </div>
    </div>
  );
}

