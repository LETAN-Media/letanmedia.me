import React from 'react';
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

import './App.css';

function App() {
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
      <Footer />
    </div>
  );
}

export default App;
