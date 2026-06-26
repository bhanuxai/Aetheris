import React from 'react';
import ScrollReveal from './react-bits/ScrollReveal';

function AboutSystem() {
  return (
    <section className="py-32 px-6 border-b border-arctic-powder/5 bg-oceanic-noir/50 relative overflow-hidden" id="about-system">
      <div className="max-w-4xl mx-auto">
        <span className="font-mono text-[10px] tracking-widest text-mystic-mint/45 uppercase block mb-6">
          SYS_ARCHITECTURE_REFLECTION
        </span>
        
        {/* Cinema scroll reveal text block */}
        <ScrollReveal 
          baseOpacity={0.08}
          baseRotation={1.5}
          blurStrength={5}
          containerClassName="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder uppercase leading-[1.25] font-sans"
          textClassName="text-arctic-powder font-sans"
        >
          APEIRON BUILDS DECENTRALIZED DATA PIPELINES CONNECTING REAL-TIME TRANSACTION LOGS TO LOCALIZED GPU VECTOR MODELS. CHOOSE YOUR CONSOLE, REFLECT YOUR ENDPOINTS AT THE EDGE, AND INGEST DB SCHEMAS DYNAMICALLY WITHOUT SYSTEM LATENCY. ACTIVATED BY ALEX CRISTACHE UNDER CLUSTER NODE KEY MP025.
        </ScrollReveal>
      </div>
    </section>
  );
}

export default AboutSystem;
