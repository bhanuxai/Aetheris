import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, round, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  const outputRange = [45, 0, -45]; // Clean 3D rotation angle
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`carousel-item ${round ? 'round' : ''} bg-nocturnal-expedition/20 border border-arctic-powder/10 p-6 rounded-lg text-left flex flex-col justify-between cursor-grab active:cursor-grabbing relative overflow-hidden`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : '100%',
        rotateY: rotateY,
        ...(round && { borderRadius: '50%' }),
        transformStyle: 'preserve-3d'
      }}
      transition={transition}
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
    </motion.div>
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

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`carousel-container flex flex-col items-center select-none ${round ? 'round' : ''}`}
      style={{
        width: `${responsiveWidth}px`,
        ...(round && { height: `${responsiveWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className="carousel-track flex items-stretch h-[240px] w-full cursor-grab active:cursor-grabbing"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`carousel-indicators-container mt-8 ${round ? 'round' : ''}`}>
        <div className="carousel-indicators flex gap-2">
          {items.map((_, index) => (
            <motion.button
              type="button"
              key={index}
              className={`carousel-indicator w-2 h-2 rounded-full transition-colors duration-150 ${activeIndex === index ? 'bg-mystic-mint' : 'bg-mystic-mint/20'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index}
              animate={{
                scale: activeIndex === index ? 1.25 : 1
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
