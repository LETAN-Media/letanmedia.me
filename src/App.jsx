import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import DataDeletion from './components/DataDeletion';
import HomeChatWidget from './components/HomeChatWidget';
import Seo from './components/Seo';
import { initAnalytics } from './lib/analytics';
import PlaceholderPage from './components/PlaceholderPage';
import { REDIRECTS } from './lib/ia';
import { Navigate } from 'react-router-dom';
import Hero from './components/Hero';
import ServiceEcosystem from './home/ServiceEcosystem';
import FeaturedServicesV2 from './home/FeaturedServicesV2';
import ShowcaseCarousel from './components/ShowcaseCarousel';
import FeaturedServices from './components/FeaturedServices';
import About from './components/About';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import Stats from './components/Stats';
import Portfolio from './components/Portfolio';
import AIAssistant from './components/AIAssistant';
import CTA from './components/CTA';
import { captureUtm } from './lib/utm';

import './App.css';
import './home/redesign.css';

// Route-level code splitting: heavy feature pages (and their three.js
// hero bundles) load on demand instead of bloating the initial payload.
const ChatbotAIPage = lazy(() => import('./features/chatbot-ai/ChatbotAIPage'));
const TikTokReportPage = lazy(() => import('./features/tiktok-report/TikTokReportPage'));
const YoutubeReportPage = lazy(() => import('./features/youtube-report/YoutubeReportPage'));
const GeoEntityManager = lazy(() => import('./features/geo-entity-manager/GeoEntityManager'));
const ContactPage = lazy(() => import('./features/contact/ContactPage'));
const AboutPage = lazy(() => import('./features/about/AboutPage'));
const WorkPage = lazy(() => import('./home/WorkPage'));
const CaseStudyDetail = lazy(() => import('./home/CaseStudyDetail'));
const ServicePage = lazy(() => import('./home/ServicePage'));
const ServicesIndex = lazy(() => import('./home/ServicesIndex'));
const InsightsPage = lazy(() => import('./home/InsightsPage'));
const InsightDetail = lazy(() => import('./home/InsightDetail'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  const showHomeChatbot = !['/tiktok-report', '/youtube-report', '/geo-entity-manager'].some(p => location.pathname.startsWith(p));
  const isGeoManager = location.pathname === '/geo-entity-manager';

  useEffect(() => {
    initAnalytics();
    captureUtm();
  }, []);

  // Capture UTM on every route change
  useEffect(() => {
    captureUtm();
  }, [location.pathname]);

  return (
    <div className="app-container">
      <ScrollToTop />
      {!isGeoManager && <Header />}
      <main>
      <Suspense fallback={
        <div style={{
          minHeight: '100vh',
          background: 'var(--color-bg, #070A12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '2px solid rgba(79,124,255,0.2)',
            borderTopColor: '#4F7CFF',
            animation: 'spin 0.8s linear infinite',
          }} />
        </div>
      }>
        <Routes>
          <Route path="/" element={
            <>
              <Seo
                title="LETAN Media — AI, Marketing & Digital Growth"
                description="Giải pháp AI, truyền thông số và phát triển phần mềm dành cho cá nhân và doanh nghiệp. Premium AI-first digital agency."
                path="/"
              />
              <Hero />
              <ServiceEcosystem />
              <FeaturedServicesV2 />
              <Portfolio />
              <WhyChoose />
              <Stats />
              <AIAssistant />
              <CTA />
            </>
          } />
          <Route path="/policy" element={
            <>
              <Seo title="Chính sách bảo mật | LETAN Media" description="Chính sách bảo mật và xử lý dữ liệu khách hàng của LETAN Media." path="/policy" />
              <PrivacyPolicy />
            </>
          } />
          <Route path="/terms" element={
            <>
              <Seo title="Điều khoản dịch vụ | LETAN Media" description="Điều khoản dịch vụ của LETAN Media dành cho cá nhân và doanh nghiệp." path="/terms" />
              <TermsOfService />
            </>
          } />
          <Route path="/data-deletion" element={
            <>
              <Seo title="Yêu cầu xóa dữ liệu | LETAN Media" description="Yêu cầu xóa dữ liệu cá nhân khỏi hệ thống của LETAN Media." path="/data-deletion" />
              <DataDeletion />
            </>
          } />
          <Route path="/chatbot-ai" element={
            <>
              <Seo title="Chatbot AI & Phần mềm tự động hóa | LETAN Media" description="Giải pháp Chatbot AI, phần mềm và tự động hóa quy trình cho doanh nghiệp từ LETAN Media." path="/chatbot-ai" />
              <ChatbotAIPage />
            </>
          } />
          <Route path="/tiktok-report" element={
            <>
              <Seo title="Dịch vụ Report & Bảo vệ kênh TikTok | LETAN Media" description="Bảo vệ và xử lý khủng hoảng kênh TikTok: report vi phạm, gỡ video, DMCA, tích xanh." path="/tiktok-report" />
              <TikTokReportPage />
            </>
          } />
          <Route path="/youtube-report" element={
            <>
              <Seo 
                title="Dịch Vụ Report YouTube Uy Tín, Gỡ Video Vi Phạm — LETAN Media" 
                description="Dịch vụ report kênh YouTube vi phạm, gỡ video reup bản quyền DMCA, video bôi nhọ danh dự và khôi phục kênh YouTube nhanh chóng. Hỗ trợ 24/7." 
                path="/youtube-report" 
              />
              <YoutubeReportPage />
            </>
          } />
          <Route path="/geo-entity-manager" element={
            <>
              <Seo title="GEO Entity Manager (nội bộ) | LETAN Media" description="Công cụ nội bộ quản lý GEO entity." path="/geo-entity-manager" noindex />
              <GeoEntityManager />
            </>
          } />

          {/* New IA routes — real pages */}
          <Route path="/contact" element={
            <>
              <Seo title="Liên hệ | LETAN Media" description="Kết nối tư vấn giải pháp AI & Digital Growth." path="/contact" />
              <ContactPage />
            </>
          } />
          <Route path="/about" element={
            <>
              <Seo title="Về LETAN Media | AI-first Digital Agency" description="Agency AI-first chuyên AI, truyền thông số và phần mềm." path="/about" />
              <AboutPage />
            </>
          } />

          {/* Work & Case Studies */}
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<CaseStudyDetail />} />

          {/* Reserved taxonomy routes (placeholder, noindex, not in sitemap) */}
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/solutions" element={<PlaceholderPage title="Giải pháp" description="Các giải pháp tăng trưởng theo bài toán kinh doanh." eyebrow="Giải pháp" />} />
          <Route path="/solutions/digital-growth" element={<PlaceholderPage title="Digital Growth" description="Tăng trưởng toàn diện trên tìm kiếm & mạng xã hội." />} />
          <Route path="/solutions/ai-automation" element={<PlaceholderPage title="AI Automation" description="Tự động hóa quy trình bằng AI." />} />
          <Route path="/solutions/web-software" element={<PlaceholderPage title="Web & Software" description="Web & phần mềm theo yêu cầu." />} />
          <Route path="/solutions/brand-trust" element={<PlaceholderPage title="Brand & Trust" description="Xây dựng uy tín thương hiệu." />} />
          <Route path="/solutions/platform-protection" element={<PlaceholderPage title="Platform Protection" description="Bảo vệ kênh khỏi tin giả & đối thủ." />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/products" element={<PlaceholderPage title="Sản phẩm LETAN AI" description="Các sản phẩm AI: Chatbot, TikTok Report, YouTube Report." eyebrow="Sản phẩm" />} />
          <Route path="/legal" element={<PlaceholderPage title="Pháp lý" description="Chính sách & điều khoản của LETAN Media." eyebrow="Legal" />} />

          {/* 301 redirects: taxonomy path -> canonical existing route */}
          {REDIRECTS.map((r) => (
            <Route key={r.from} path={r.from} element={<Navigate to={r.to} replace />} />
          ))}

          {/* Catch-all -> home (no broken links) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </main>
      {!isGeoManager && <Footer />}
      {showHomeChatbot && <HomeChatWidget />}
    </div>
  );
}

export default App;
