import { Eye, Layers, Code, Play } from 'lucide-react';
import Carousel from './react-bits/Carousel';
import ShinyText from './react-bits/ShinyText';

function Features() {
  const primitiveItems = [
    {
      title: 'Discovery',
      description: 'Deploy silent ingestion triggers across distributed microservices. Aetheris automatically discovers active network hooks, parses unstructured JSON logs, and builds unified schema definitions in real-time.',
      id: 1,
      icon: <Eye className="w-5 h-5 text-mystic-mint" />
    },
    {
      title: 'Analysis',
      description: 'Inspect inbound vector and database streams dynamically. Our semantic analyzer checks database integrity, matches historic transaction patterns, and blocks suspicious API payloads before compromising storage.',
      id: 2,
      icon: <Layers className="w-5 h-5 text-mystic-mint" />
    },
    {
      title: 'Training',
      description: 'Fine-tune small language parsing models directly on your historic log database. Provisioned on isolated GPU server nodes, Aetheris models compile unstructured log files with extreme vocabulary accuracy.',
      id: 3,
      icon: <Code className="w-5 h-5 text-mystic-mint" />
    },
    {
      title: 'Deploy',
      description: 'Publish your parsed endpoints globally. When upstream third-party service APIs modify their schema configurations, Aetheris automatically shifts routing definitions at the edge, preventing pipeline breaks.',
      id: 4,
      icon: <Play className="w-5 h-5 text-mystic-mint" />
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative" id="features">
      {/* Background grid alignment lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-arctic-powder/5" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-center cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder font-sans uppercase">
            <ShinyText text="THE PRIMITIVES" color="#FFC801" shineColor="#ffffff" speed={3} />
          </h2>
          <p className="text-mystic-mint/60 text-xs max-w-md mx-auto mt-4 leading-relaxed">
            Drag or swipe to explore the core components powering Aetheris's autonomous telemetry engine.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="flex justify-center items-center mt-12 w-full overflow-visible py-8">
          <Carousel 
            items={primitiveItems} 
            baseWidth={380} 
            autoplay={true} 
            autoplayDelay={5000} 
            pauseOnHover={true} 
            loop={true} 
          />
        </div>

      </div>
    </section>
  );
}

export default Features;

