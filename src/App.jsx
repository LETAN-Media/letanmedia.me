import React, { useState } from 'react';
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

import './App.css';

function App() {
  const [page, setPage] = useState('home');

  const handleNavigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  if (page === 'privacy-policy') {
    return (
      <div className="app-container">
        <Header />
        <main>
          <PrivacyPolicy onBack={() => handleNavigate('home')} />
        </main>
        <Footer onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main>
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
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
