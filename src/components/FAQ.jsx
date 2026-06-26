import { useState } from 'react';
import { Plus } from 'lucide-react';
import ShinyText from './react-bits/ShinyText';

function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      q: 'How does Apeiron auto-detect upstream API schema shifts?',
      a: 'We deploy lightweight parser deamons at your service entry gateways. These daemons audit JSON key structures and datatypes in real-time. When a third-party hook changes a field from an integer to a string, Apeiron automatically triggers a re-modeling event and patches edge routing definitions in 12ms, preventing pipeline breaks.'
    },
    {
      q: 'What vector engines and databases are natively supported?',
      a: 'Apeiron has production-grade adapter nodes for PostgreSQL, Redis, AWS S3, Google BigQuery, and major vector engines including Pinecone, Qdrant, and Milvus. Custom database integration mappings can be compiled in minutes using our developer SDK.'
    },
    {
      q: 'Is pipeline metadata or tenant data shared with external AI clusters?',
      a: 'No. All vector stream compilation, semantic query parsing, and custom GPU training cycles occur within your own isolated VPC edge cluster. We utilize air-gapped container runtimes, ensuring zero data escapes your firewall.'
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="faq">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder font-sans uppercase">
            <ShinyText text="FAQ" color="#FFC801" shineColor="#ffffff" speed={3} />
          </h2>
        </div>

        {/* FAQ Accordion list */}
        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div 
                key={index}
                className="border-b border-arctic-powder/10 pb-6 text-left"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between py-3 text-left focus:outline-none group cursor-target"
                  aria-expanded={isExpanded}
                >
                  <div className="flex gap-4 sm:gap-6 items-baseline">
                    <span className="font-mono text-xs text-mystic-mint/45">0{index + 1}.</span>
                    <span className="font-sans font-bold text-base sm:text-lg text-arctic-powder group-hover:text-mystic-mint transition-colors duration-300">
                      {faq.q}
                    </span>
                  </div>
                  
                  {/* Rotating plus icon */}
                  <div
                    className={`text-mystic-mint group-hover:text-arctic-powder p-1 rounded-full border border-transparent group-hover:border-arctic-powder/10 transition-all flex-shrink-0 ml-4 duration-300 ${isExpanded ? 'rotate-[45deg]' : 'rotate-0'}`}
                  >
                    <Plus className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated accordion panel using CSS grid transition */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-8 sm:pl-12 pr-4 pt-2 pb-4 text-mystic-mint/80 text-sm leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQ;
