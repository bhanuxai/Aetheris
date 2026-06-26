import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import BorderGlow from './react-bits/BorderGlow';
import ShinyText from './react-bits/ShinyText';

function Testimonials() {
  const testimonials = [
    {
      company: 'CLOUD LOGISTICS',
      ref: 'REF // MP025-A',
      review: '"The Auto-API bindings auto-configured without a single production crash. Our stream pipeline maintenance is now effectively zero, and we achieved a data compaction ratio of 16.59:1."',
      author: 'Alex Cristache',
      title: 'Tech Lead, Cloud Infrastructure',
      rating: 5
    },
    {
      company: 'SCALEDATA INC',
      ref: 'REF // MP025-B',
      review: '"We exposed our entire vector logs database using Aetheris semantic queries. Our query throughput latency ratio improved to 13.51:1. Saved us months of custom engineering."',
      author: 'Sarah Jenkins',
      title: 'CTO, Data Systems',
      rating: 5
    },
    {
      company: 'DELTA FLOW',
      ref: 'REF // MP025-C',
      review: '"Ingesting real-time message queue streams at 14.8 GB/s. Integrity checks yield a strict contrast ratio of 19.23:1, and Aetheris handles structural database schema shifts flawlessly."',
      author: 'Michael Chen',
      title: 'Principal Data Engineer',
      rating: 5
    },
    {
      company: 'VORTEX DEV',
      ref: 'REF // MP025-D',
      review: '"Aetheris is now the core data layer for all our intelligence agent pipelines. The self-healing routing at the edge has yielded a 9.85:1 reduction in production debugging logs."',
      author: 'Elena Rostova',
      title: 'Founder, IA Logistics',
      rating: 5
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="testimonials">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder font-sans uppercase">
            <ShinyText text="SOCIAL PROOF" color="#FFC801" shineColor="#ffffff" speed={3} />
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((card, index) => (
            <BorderGlow key={card.company} borderRadius={8} glowIntensity={0.5} glowRadius={200}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="bg-nocturnal-expedition/20 p-8 rounded-[7px] text-left flex flex-col justify-between min-h-[220px] transition-all duration-300 relative shadow-sm cursor-target"
              >
                <div>
                  {/* Card Header info */}
                  <div className="flex items-center justify-between border-b border-arctic-powder/5 pb-4 mb-6">
                    <span className="font-mono font-bold text-xs tracking-wider text-mystic-mint group-hover:text-arctic-powder">
                      {card.company}
                    </span>
                  </div>

                  {/* Review body */}
                  <p className="text-arctic-powder/90 text-sm leading-relaxed mb-8 italic font-sans">
                    {card.review}
                  </p>
                </div>

                {/* Author footer info */}
                <div className="flex items-end justify-between pt-4 border-t border-arctic-powder/5">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-xs text-arctic-powder font-bold">{card.author}</span>
                    <span className="text-[10px] text-mystic-mint/70 font-mono">{card.title}</span>
                  </div>
                  
                  <div className="flex items-center gap-0.5">
                    {[...Array(card.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-forsythia text-forsythia" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </BorderGlow>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
