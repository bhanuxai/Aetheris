import { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, Layers, Code, Play } from 'lucide-react';
import './Carousel.css';

const DEFAULT_ITEMS = [
  {
    title: 'Discovery',
    description: 'Deploy silent ingestion triggers across your distributed microservices.',
    id: 1,
    icon: <Eye className="w-5 h-5 text-mystic-mint" />
  },
  {
    title: 'Analysis',
    description: 'Inspect inbound vector and database streams dynamically.',
    id: 2,
    icon: <Layers className="w-5 h-5 text-mystic-mint" />
  },
  {
    title: 'Training',
    description: 'Fine-tune small language parsing models directly on your historic log database.',
    id: 3,
    icon: <Code className="w-5 h-5 text-mystic-mint" />
  },
  {
    title: 'Deploy',
    description: 'Publish your parsed endpoints globally.',
    id: 4,
    icon: <Play className="w-5 h-5 text-mystic-mint" />
  }
];

const GAP = 16;

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, currentX }) {
  // Compute relative 3D rotation based on track X coordinate position
  const targetX = -index * trackItemOffset;
  const diff = currentX - targetX;
  const rotateY = (diff / trackItemOffset) * -45;

  return (
    <div
      className={`carousel-item ${round ? 'round' : ''} bg-nocturnal-expedition/20 border border-arctic-powder/10 p-6 rounded-lg text-left flex flex-col justify-between cursor-grab active:cursor-grabbing relative overflow-hidden`}
      style={{
        width: `${itemWidth}px`,
        height: round ? `${itemWidth}px` : '100%',
        transform: `rotateY(${rotateY}deg)`,
        ...(round && { borderRadius: '50%' }),
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-arctic-powder/[0.02] to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      
      <div className={`carousel-item-header flex items-center justify-between mb-4 ${round ? 'round' : ''}`}>
        <span className="carousel-icon-container w-10 h-10 border border-arctic-powder/10 bg-oceanic-noir/60 rounded flex items-center justify-center text-mystic-mint">
          {item.icon}
        </span>
        <span className="font-mono text-[8px] text-mystic-mint/35">0{item.id || index + 1}.PRIMITIVE</span>
      </div>
      
      <div className="carousel-item-content mt-auto">
        <h3 className="carousel-item-title font-mono font-bold text-sm text-arctic-powder uppercase tracking-wider mb-2">
          {item.title}
        </h3>
        <p className="carousel-item-description text-mystic-mint/80 text-xs leading-normal">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 320,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const [responsiveWidth, setResponsiveWidth] = useState(baseWidth);
  const containerRef = useRef(null);

  // ResizeObserver to handle responsive scaling
  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const parentWidth = entry.contentRect.width;
        if (parentWidth < baseWidth) {
          setResponsiveWidth(parentWidth);
        } else {
          setResponsiveWidth(baseWidth);
        }
      }
    });
    observer.observe(parent);
    return () => observer.disconnect();
  }, [baseWidth]);

  const itemWidth = responsiveWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const startingPosition = loop ? 1 : 0;
  const [position, setPosition] = useState(startingPosition);
  
  // Track X offset coordinates
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startDragX = useRef(0);
  const currentDragOffset = useRef(0);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1 || isDragging) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => {
        const next = prev + 1;
        if (loop && next === itemsForRender.length - 1) {
          // Trigger smooth transition to the clone first
          setTimeout(() => {
            setIsJumping(true);
            setPosition(1);
            // reset transition mode in next tick
            requestAnimationFrame(() => setIsJumping(false));
          }, 500); // match CSS transition duration
        }
        return Math.min(next, itemsForRender.length - 1);
      });
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length, loop, isDragging]);

  useEffect(() => {
    const startPos = loop ? 1 : 0;
    setPosition(startPos);
  }, [items.length, loop]);

  // Pointer gesture event handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    startDragX.current = e.clientX;
    currentDragOffset.current = 0;
    // Set cursor grab targets
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startDragX.current;
    currentDragOffset.current = deltaX;
    setDragOffset(deltaX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    setDragOffset(0);
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }

    const deltaX = currentDragOffset.current;
    const dragThreshold = 50;

    if (Math.abs(deltaX) > dragThreshold) {
      if (deltaX < 0) {
        // Dragged left -> next slide
        setPosition(prev => {
          const next = prev + 1;
          const max = itemsForRender.length - 1;
          if (loop && next === max) {
            setTimeout(() => {
              setIsJumping(true);
              setPosition(1);
              requestAnimationFrame(() => setIsJumping(false));
            }, 500);
          }
          return Math.min(next, max);
        });
      } else {
        // Dragged right -> previous slide
        setPosition(prev => {
          const next = prev - 1;
          if (loop && next === 0) {
            setTimeout(() => {
              setIsJumping(true);
              setPosition(items.length);
              requestAnimationFrame(() => setIsJumping(false));
            }, 500);
          }
          return Math.max(0, next);
        });
      }
    }
  };

  const activeIndex = useMemo(() => {
    if (items.length === 0) return 0;
    if (loop) {
      return (position - 1 + items.length) % items.length;
    }
    return Math.min(position, items.length - 1);
  }, [items.length, loop, position]);

  const targetX = -(position * trackItemOffset);
  const currentX = targetX + dragOffset;

  return (
    <div
      ref={containerRef}
      className={`carousel-container flex flex-col items-center select-none ${round ? 'round' : ''}`}
      style={{
        width: `${responsiveWidth}px`,
        ...(round && { height: `${responsiveWidth}px`, borderRadius: '50%' })
      }}
    >
      <div
        className="carousel-track flex items-stretch h-[240px] w-full cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          width: `${itemWidth}px`,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          transform: `translateX(${currentX}px)`,
          transition: isDragging || isJumping ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          transformStyle: 'preserve-3d'
        }}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            currentX={currentX}
          />
        ))}
      </div>
      <div className={`carousel-indicators-container mt-8 ${round ? 'round' : ''}`}>
        <div className="carousel-indicators flex gap-2">
          {items.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-indicator w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-mystic-mint scale-[1.25]' 
                  : 'bg-mystic-mint/20 scale-100'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              onClick={() => setPosition(loop ? index + 1 : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
