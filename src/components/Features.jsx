import { useState, useEffect } from 'react';
import { Eye, Layers, Code, Play, ChevronDown } from 'lucide-react';
import ShinyText from './react-bits/ShinyText';

function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    {
      title: 'Discovery',
      description: 'Deploy silent ingestion triggers across distributed microservices. Aetheris automatically discovers active network hooks, parses unstructured JSON logs, and builds unified schema definitions in real-time.',
      icon: <Eye className="w-5 h-5" />,
      tag: 'Telemetry'
    },
    {
      title: 'Analysis',
      description: 'Inspect inbound vector and database streams dynamically. Our semantic analyzer checks database integrity, matches historic transaction patterns, and blocks suspicious API payloads before compromising storage.',
      icon: <Layers className="w-5 h-5" />,
      tag: 'Security'
    },
    {
      title: 'Training',
      description: 'Fine-tune small language parsing models directly on your historic log database. Provisioned on isolated GPU server nodes, Aetheris models compile unstructured log files with extreme vocabulary accuracy.',
      icon: <Code className="w-5 h-5" />,
      tag: 'Optimization'
    },
    {
      title: 'Deploy',
      description: 'Publish your parsed endpoints globally. When upstream third-party service APIs modify their schema configurations, Aetheris automatically shifts routing definitions at the edge, preventing pipeline breaks.',
      icon: <Play className="w-5 h-5" />,
      tag: 'Edge Sync'
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir overflow-hidden" id="features">
      <div className="absolute inset-x-0 top-0 h-px bg-arctic-powder/5" />
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystic-mint/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nocturnal-expedition/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder font-sans uppercase">
            <ShinyText text="THE PRIMITIVES" color="#FFC801" shineColor="#ffffff" speed={3} />
          </h2>
          <p className="text-mystic-mint/60 text-xs max-w-md mx-auto mt-4 leading-relaxed font-mono uppercase tracking-widest">
            Aetheris's autonomous engine broken down into core telemetry operational primitives.
          </p>
        </div>

        {/* Mobile Accordion View (< 1024px) */}
        {isMobile ? (
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {items.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <div 
                  key={index}
                  className={`border rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'border-mystic-mint/30 bg-nocturnal-expedition/20 shadow-[0_0_20px_rgba(217,232,226,0.05)]' 
                      : 'border-arctic-powder/10 bg-nocturnal-expedition/5 hover:border-arctic-powder/20'
                  }`}
                >
                  {/* Header */}
                  <button
                    onClick={() => setActiveIndex(index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-target"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2 rounded transition-colors duration-300 ${
                        isActive ? 'bg-mystic-mint text-oceanic-noir' : 'bg-arctic-powder/5 text-mystic-mint/70'
                      }`}>
                        {item.icon}
                      </div>
                      <div>
                        <span className="font-mono text-xs text-mystic-mint/40 uppercase tracking-widest block mb-0.5">
                          {item.tag}
                        </span>
                        <h3 className="font-sans text-sm font-semibold text-arctic-powder">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-mystic-mint/65 transition-transform duration-300 ${
                      isActive ? 'rotate-180 text-mystic-mint' : ''
                    }`} />
                  </button>

                  {/* Body Content */}
                  <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}>
                    <div className="overflow-hidden">
                      <div className="p-5 pt-0 border-t border-arctic-powder/5 text-xs text-mystic-mint/80 leading-relaxed font-sans">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop Asymmetric Bento Grid View (>= 1024px) */
          <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto select-none">
            
            {/* 1. Discovery (col-span-2, height 280px) */}
            <div
              onMouseEnter={() => setActiveIndex(0)}
              className={`col-span-2 h-[280px] rounded-xl border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-target ${
                activeIndex === 0
                  ? 'border-mystic-mint/40 bg-nocturnal-expedition/30 shadow-[0_0_30px_rgba(217,232,226,0.06)]'
                  : 'border-arctic-powder/10 bg-nocturnal-expedition/10 hover:border-arctic-powder/20'
              }`}
            >
              <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-20 transition-opacity duration-500">
                {/* Visual Telemetry Scanning Grid */}
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                <div className="absolute w-2 h-2 rounded-full bg-mystic-mint animate-ping top-1/4 left-1/3" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-mystic-mint top-1/2 left-2/3" />
                <div className="absolute w-1 h-1 rounded-full bg-mystic-mint top-3/4 left-1/4" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-mystic-mint to-transparent animate-[pulse_2s_infinite]" style={{ top: '35%' }} />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${activeIndex === 0 ? 'bg-mystic-mint text-oceanic-noir' : 'bg-arctic-powder/5 text-mystic-mint'}`}>
                    {items[0].icon}
                  </div>
                  <span className="font-mono text-[10px] text-mystic-mint/50 uppercase tracking-widest">
                    {items[0].tag}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-arctic-powder mt-4">
                  {items[0].title}
                </h3>
              </div>
              <p className="text-mystic-mint/75 text-xs leading-relaxed max-w-xl z-10">
                {items[0].description}
              </p>
            </div>

            {/* 2. Analysis (col-span-1, row-span-2, height 584px) */}
            <div
              onMouseEnter={() => setActiveIndex(1)}
              className={`col-span-1 row-span-2 h-[584px] rounded-xl border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-target ${
                activeIndex === 1
                  ? 'border-mystic-mint/40 bg-nocturnal-expedition/30 shadow-[0_0_30px_rgba(217,232,226,0.06)]'
                  : 'border-arctic-powder/10 bg-nocturnal-expedition/10 hover:border-arctic-powder/20'
              }`}
            >
              <div className="absolute bottom-8 right-8 left-8 h-48 pointer-events-none opacity-20 border border-mystic-mint/10 rounded-md overflow-hidden bg-oceanic-noir/50">
                {/* Visual Packet Streams */}
                <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-mystic-mint/10 to-transparent" />
                <div className="p-3 font-mono text-[9px] text-mystic-mint/60 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between border-b border-mystic-mint/5 pb-1">
                    <span>SECTOR_A_OK</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PAYLOAD_RAW</span>
                    <span>172.16.85.1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>VEC_LNC_HASH</span>
                    <span className="text-amber-300">BLOCKED</span>
                  </div>
                  <div className="w-full bg-mystic-mint/10 h-1 rounded overflow-hidden mt-2">
                    <div className="bg-mystic-mint h-full animate-[loading_3s_infinite]" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${activeIndex === 1 ? 'bg-mystic-mint text-oceanic-noir' : 'bg-arctic-powder/5 text-mystic-mint'}`}>
                    {items[1].icon}
                  </div>
                  <span className="font-mono text-[10px] text-mystic-mint/50 uppercase tracking-widest">
                    {items[1].tag}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-arctic-powder mt-4">
                  {items[1].title}
                </h3>
              </div>
              <p className="text-mystic-mint/75 text-xs leading-relaxed mt-4 mb-auto z-10">
                {items[1].description}
              </p>
            </div>

            {/* 3. Training (col-span-1, height 280px) */}
            <div
              onMouseEnter={() => setActiveIndex(2)}
              className={`col-span-1 h-[280px] rounded-xl border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-target ${
                activeIndex === 2
                  ? 'border-mystic-mint/40 bg-nocturnal-expedition/30 shadow-[0_0_30px_rgba(217,232,226,0.06)]'
                  : 'border-arctic-powder/10 bg-nocturnal-expedition/10 hover:border-arctic-powder/20'
              }`}
            >
              <div className="absolute bottom-6 right-6 w-24 h-16 pointer-events-none opacity-20 font-mono text-[9px] text-mystic-mint flex flex-col gap-1 border border-mystic-mint/10 p-2 rounded">
                <div className="text-[7px] text-mystic-mint/40 uppercase">ACCURACY_INDEX</div>
                <div className="text-xs font-bold text-arctic-powder">99.85%</div>
                <div className="w-full bg-mystic-mint/5 h-1.5 rounded overflow-hidden">
                  <div className="bg-mystic-mint h-full animate-[pulse_1.5s_infinite]" style={{ width: '99%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${activeIndex === 2 ? 'bg-mystic-mint text-oceanic-noir' : 'bg-arctic-powder/5 text-mystic-mint'}`}>
                    {items[2].icon}
                  </div>
                  <span className="font-mono text-[10px] text-mystic-mint/50 uppercase tracking-widest">
                    {items[2].tag}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-arctic-powder mt-4">
                  {items[2].title}
                </h3>
              </div>
              <p className="text-mystic-mint/75 text-xs leading-relaxed z-10">
                {items[2].description}
              </p>
            </div>

            {/* 4. Deploy (col-span-1, height 280px) */}
            <div
              onMouseEnter={() => setActiveIndex(3)}
              className={`col-span-1 h-[280px] rounded-xl border p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-target ${
                activeIndex === 3
                  ? 'border-mystic-mint/40 bg-nocturnal-expedition/30 shadow-[0_0_30px_rgba(217,232,226,0.06)]'
                  : 'border-arctic-powder/10 bg-nocturnal-expedition/10 hover:border-arctic-powder/20'
              }`}
            >
              <div className="absolute bottom-6 right-6 w-28 h-16 pointer-events-none opacity-20 font-mono text-[8px] text-mystic-mint/80 flex flex-col gap-0.5 border border-mystic-mint/10 p-2 rounded">
                <div className="flex justify-between items-center text-[7px] text-mystic-mint/40 uppercase">ROUTER</div>
                <div className="truncate text-arctic-powder">v1 → v2 (shift)</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>EDGE_SYNCED</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded ${activeIndex === 3 ? 'bg-mystic-mint text-oceanic-noir' : 'bg-arctic-powder/5 text-mystic-mint'}`}>
                    {items[3].icon}
                  </div>
                  <span className="font-mono text-[10px] text-mystic-mint/50 uppercase tracking-widest">
                    {items[3].tag}
                  </span>
                </div>
                <h3 className="font-sans text-lg font-bold text-arctic-powder mt-4">
                  {items[3].title}
                </h3>
              </div>
              <p className="text-mystic-mint/75 text-xs leading-relaxed z-10">
                {items[3].description}
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

export default Features;
