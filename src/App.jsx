import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ShowcaseCarousel from './components/ShowcaseCarousel';
import FeaturedServices from './components/FeaturedServices';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import AIAssistant from './components/AIAssistant';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ChatbotAIPage from "./features/chatbot-ai/ChatbotAIPage";
import TikTokReportPage from "./features/tiktok-report/TikTokReportPage";
import YoutubeReportPage from "./features/youtube-report/YoutubeReportPage";
import HomeChatWidget from "./components/HomeChatWidget";

import './App.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  const showHomeChatbot = !['/tiktok-report', '/youtube-report'].includes(location.pathname);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ShowcaseCarousel />
              <FeaturedServices />
              <About />
              <Services />
              <Portfolio />
              <WhyChoose />
              <Stats />
              <AIAssistant />
              <CTA />
            </>
          } />
          <Route path="/policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/chatbot-ai" element={<ChatbotAIPage />} />
          <Route path="/tiktok-report" element={<TikTokReportPage />} />
          <Route path="/youtube-report" element={<YoutubeReportPage />} />
        </Routes>
      </main>
      <Footer />
      {/* {showHomeChatbot && <HomeChatWidget />} */}
    </div>
  );
}

export default App;
