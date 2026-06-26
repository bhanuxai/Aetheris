import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import BorderGlow from './react-bits/BorderGlow';
import ShinyText from './react-bits/ShinyText';

function useIntersectionReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function TestimonialCard({ card, index }) {
  const [ref, isVisible] = useIntersectionReveal();
  return (
    <div
      ref={ref}
      className={`bg-nocturnal-expedition/20 p-8 rounded-[7px] text-left flex flex-col justify-between min-h-[220px] transition-all duration-500 hover:-translate-y-1 relative shadow-sm cursor-target ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[15px]'
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <div>
        {/* Card Header info */}
        <div className="flex items-center justify-between border-b border-arctic-powder/5 pb-4 mb-6">
          <span className="font-mono font-bold text-xs tracking-wider text-mystic-mint">
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
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      company: 'CLOUD LOGISTICS',
      review: '"The Auto-API bindings auto-configured without a single production crash. Our stream pipeline maintenance is now effectively zero, and we achieved a data compaction ratio of 16.59:1."',
      author: 'Alex Cristache',
      title: 'Tech Lead, Cloud Infrastructure',
      rating: 5
    },
    {
      company: 'SCALEDATA INC',
      review: '"We exposed our entire vector logs database using Apeiron semantic queries. Our query throughput latency ratio improved to 13.51:1. Saved us months of custom engineering."',
      author: 'Sarah Jenkins',
      title: 'CTO, Data Systems',
      rating: 5
    },
    {
      company: 'DELTA FLOW',
      review: '"Ingesting real-time message queue streams at 14.8 GB/s. Integrity checks yield a strict contrast ratio of 19.23:1, and Apeiron handles structural database schema shifts flawlessly."',
      author: 'Michael Chen',
      title: 'Principal Data Engineer',
      rating: 5
    },
    {
      company: 'VORTEX DEV',
      review: '"Apeiron is now the core data layer for all our intelligence agent pipelines. The self-healing routing at the edge has yielded a 9.85:1 reduction in production debugging logs."',
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
              <TestimonialCard 
                card={card}
                index={index}
              />
            </BorderGlow>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
