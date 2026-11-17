import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TradingMarketsSection from './components/TradingMarketsSection';
import FeatureGrid from './components/FeatureGrid';
import HowItWorks from "./components/HowItWorks";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

import './App.css';

function App() {
  return (
    <>
      <Navbar />

      <div className="relative min-h-screen bg-[#FAF7F2] font-sans antialiased text-[#14161C] overflow-hidden">

        {/* CONTINUOUS BACKGROUND GRADIENT */}

        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Subtle micro-grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(20, 22, 28, 0.7) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Hero Bloom */}
          <div className="absolute -top-24 left-[5%] w-[700px] h-[700px] bg-[#7EB3F0]/16 rounded-full blur-[140px]" />

          {/* Feature Grid Bloom */}
          <div className="absolute top-[18%] right-[2%] w-[750px] h-[750px] bg-[#1FA983]/10 rounded-full blur-[160px]" />
        </div>

        {/* BACKGROUND GRAIN */}

        <div
          className="dh-grain-overlay"
          aria-hidden="true"
        />

        {/* PAGE CONTENT */}

        <div className="relative z-10">
          <main>

            {/* HERO SECTION */}
            <HeroSection />

            {/* TRADING MARKETS */}
            <TradingMarketsSection />

            {/* FEATURES */}
            <FeatureGrid />

            {/* HOW IT WORKS */}
            <HowItWorks />

            {/* PRICING */}
            <Pricing />

            {/* FAQ */}
            <FAQ />

            {/* FOOTER */}
            <Footer />
          </main>
        </div>

      </div>
    </>
  );
}

export default App;