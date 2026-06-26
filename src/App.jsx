import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Integrations from './components/Integrations';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Pricing from './components/Pricing';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ClickSpark from './components/react-bits/ClickSpark';

import DotField from './components/react-bits/DotField';
import Noise from './components/react-bits/Noise';
import AboutSystem from './components/AboutSystem';
import SubPages from './components/SubPages';



function App() {
  const [activePage, setActivePage] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.relativeTime = time;
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ClickSpark sparkColor="#D9E8E2" sparkSize={6} sparkRadius={15} sparkCount={8} duration={350}>
      <div className="relative min-h-screen bg-oceanic-noir text-arctic-powder overflow-hidden selection:bg-nocturnal-expedition selection:text-arctic-powder">

        {/* Subtle dynamic film grain texture */}
        <Noise patternAlpha={8} patternRefreshInterval={3} />

        {/* Premium interactive dot field background - optimized spacing to fix lag */}
        <DotField 
          dotRadius={1.6} 
          dotSpacing={30} 
          cursorRadius={300} 
          bulgeStrength={55} 
          sparkle={true} 
          waveAmplitude={2.5} 
          gradientFrom="rgba(217, 232, 226, 0.25)" 
          gradientTo="rgba(17, 76, 90, 0.12)" 
          glowColor="rgba(241, 246, 244, 0.08)"
        />



        {/* Global Background Grid Lines */}
        <div className="absolute inset-0 grid-bg pointer-events-none z-0" aria-hidden="true" />
        
        {/* Armory style vertical grid lines */}
        <div className="absolute inset-y-0 left-0 right-0 pointer-events-none flex justify-between z-0 px-6 max-w-7xl mx-auto opacity-[0.05]" aria-hidden="true">
          <div className="w-[1px] h-full bg-arctic-powder" />
          <div className="w-[1px] h-full bg-arctic-powder" />
          <div className="w-[1px] h-full bg-arctic-powder" />
          <div className="w-[1px] h-full bg-arctic-powder" />
          <div className="w-[1px] h-full bg-arctic-powder" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <Features />
            <Integrations />
            <Testimonials />
            <AboutSystem />
            <Blog />
            <FAQ />
            <Pricing />
            <Newsletter />
          </main>

          <Footer onOpenPage={setActivePage} />
          <SubPages activePage={activePage} onClose={() => setActivePage(null)} />
        </div>

        {/* Floating Scroll To Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-oceanic-noir/80 hover:bg-nocturnal-expedition border border-arctic-powder/15 hover:border-mystic-mint/55 flex items-center justify-center cursor-pointer cursor-target transition-all duration-300 shadow-xl backdrop-blur-sm focus:outline-none ${
            showScrollTop ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <img src="/SVGs/chevron-up.svg" className="w-4 h-4 invert opacity-75 hover:opacity-100 transition-opacity" alt="scroll-to-top" />
        </button>

      </div>
    </ClickSpark>
  );
}

export default App;
