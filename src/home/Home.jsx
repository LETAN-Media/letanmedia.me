import React from 'react';
import Hero from '../components/Hero';
import TrustBar from './TrustBar';
import SolutionPillars from './SolutionPillars';
import FeaturedWork from './FeaturedWork';
import Method from './Method';
import Products from './Products';
import Results from './Results';
import SelectedServices from './SelectedServices';
import Insights from './Insights';
import Company from './Company';
import FinalCTA from './FinalCTA';
import './home.css';

/**
 * Home — new homepage section order for Phase 4.
 * Each section is its own module under src/home/.
 * CSS lives in home.css and reuses Phase 2 design tokens.
 */
const Home = () => (
  <>
    <Hero />
    <TrustBar />
    <SolutionPillars />
    <FeaturedWork />
    <Method />
    <Products />
    <Results />
    <SelectedServices />
    <Insights />
    <Company />
    <FinalCTA />
  </>
);

export default Home;
