import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Magnet from './Magnet';

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items = [],
  baseColor = "#F1F6F4",
  menuColor = "#F1F6F4",
  buttonBgColor = "#F1F6F4",
  buttonTextColor = "#172836",
  ease = "power3.out",
  theme = "dark"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const cardsRef = useRef([]);
  const linksContainersRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Animate overlay background fade-in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.35,
        pointerEvents: 'auto',
        ease: 'power2.out'
      });

      // Animate cards staggered sliding into view
      gsap.fromTo(cardsRef.current,
        { 
          y: isMobile ? '50px' : '100%', 
          x: 0,
          opacity: 0 
        },
        {
          y: '0%',
          x: '0%',
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: ease,
          overwrite: 'auto'
        }
      );

      // Staggered links fade/slide in
      gsap.fromTo(linksContainersRef.current,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.35,
          stagger: 0.08,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    } else {
      document.body.style.overflow = '';
      
      // Animate links out
      gsap.to(linksContainersRef.current, {
        y: 10,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto'
      });

      // Slide cards down/out
      gsap.to(cardsRef.current, {
        y: isMobile ? '30px' : '100%',
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: 'power3.in',
        overwrite: 'auto',
        onComplete: () => {
          gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.2,
            pointerEvents: 'none',
            ease: 'power2.in'
          });
        }
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, ease]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Outer Navbar Header */}
      <header className="fixed top-0 left-0 right-0 z-40 py-6 px-6 md:px-12 flex items-center justify-between pointer-events-auto bg-transparent border-b border-transparent">
        <a href="#" className="flex items-center group cursor-target select-none">
          {typeof logo === 'string' ? (
            <img src={logo} alt={logoAlt} className="h-6" />
          ) : (
            logo
          )}
        </a>

        <div className="flex items-center gap-4">
          {/* Action CTA Button */}
          <Magnet padding={15} magnetStrength={10}>
            <a
              href="#newsletter"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-arctic-powder/15 hover:border-arctic-powder/35 rounded text-xs font-mono transition-all bg-white/5 backdrop-blur-sm cursor-target"
              style={{ 
                backgroundColor: theme === 'light' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
                color: baseColor
              }}
            >
              <span>Get Token</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Magnet>

          {/* Menu Hamburger Toggle */}
          <Magnet padding={15} magnetStrength={10}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 px-4 py-2 border border-arctic-powder/15 hover:border-arctic-powder/35 rounded text-xs font-mono transition-all bg-white/5 backdrop-blur-sm cursor-target select-none"
              style={{ color: menuColor }}
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-4 h-4" />
              <span>MENU</span>
            </button>
          </Magnet>
        </div>
      </header>

      {/* Screen CardNav Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 opacity-0 pointer-events-none bg-oceanic-noir/95 backdrop-blur-md flex flex-col"
        style={{ color: baseColor }}
      >
        {/* Inside Overlay Header */}
        <div ref={headerRef} className="py-6 px-6 md:px-12 flex items-center justify-between w-full z-20">
          <a href="#" onClick={() => setIsOpen(false)} className="flex items-center group cursor-target select-none">
            {typeof logo === 'string' ? (
              <img src={logo} alt={logoAlt} className="h-6" />
            ) : (
              logo
            )}
          </a>

          <Magnet padding={15} magnetStrength={10}>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 px-4 py-2 border border-arctic-powder/15 hover:border-arctic-powder/35 rounded text-xs font-mono transition-all bg-white/5 backdrop-blur-sm cursor-target select-none"
              aria-label="Close Navigation Menu"
            >
              <X className="w-4 h-4 text-arctic-powder" />
              <span>CLOSE</span>
            </button>
          </Magnet>
        </div>

        {/* Staggered Cards container */}
        <div className="flex-grow flex flex-col md:flex-row w-full h-full overflow-hidden md:overflow-hidden p-6 md:p-12 gap-4 z-10 overflow-y-auto md:overflow-y-hidden">
          {items.map((item, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="flex-grow flex flex-col justify-between p-8 md:p-12 rounded-xl border border-white/5 relative overflow-hidden group/card shadow-lg"
              style={{
                backgroundColor: item.bgColor || '#172836',
                color: item.textColor || '#F1F6F4'
              }}
            >
              {/* Backgrid Accent inside Card */}
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

              <div>
                <span className="font-mono text-[10px] opacity-40 uppercase tracking-widest block mb-4">
                  SECTION_0{idx + 1}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold font-mono tracking-tight uppercase mb-8">
                  {item.label}
                </h3>
              </div>

              <div
                ref={el => linksContainersRef.current[idx] = el}
                className="flex flex-col gap-3 md:gap-5"
              >
                {item.links && item.links.map((link, lIdx) => (
                  <a
                    key={lIdx}
                    href={link.href || '#'}
                    onClick={() => setIsOpen(false)}
                    className="text-base md:text-xl font-bold font-sans tracking-tight hover:opacity-75 transition-opacity flex items-center gap-2 cursor-target w-fit group/link"
                    aria-label={link.ariaLabel || link.label}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300 text-mystic-mint" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardNav;
