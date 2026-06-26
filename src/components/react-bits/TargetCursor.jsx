import { useEffect, useState, useRef } from 'react';

function TargetCursor({ 
  spinDuration = 2, 
  hideDefaultCursor = true, 
  parallaxOn = true,
  hoverDuration = 0.2,
  cursorColor = '#F1F6F4',
  cursorColorOnTarget = '#D9E8E2'
}) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [ringPosition, setRingPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
      // Apply cursor none to all buttons/links as well
      const style = document.createElement('style');
      style.innerHTML = 'a, button, select, input, textarea, [role="button"], .cursor-target { cursor: none !important; }';
      document.head.appendChild(style);
      return () => {
        document.body.style.cursor = 'default';
        document.head.removeChild(style);
      };
    }
  }, [hideDefaultCursor]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, []);

  // Smooth lagging ring effect
  useEffect(() => {
    let animId;
    const updateRing = () => {
      setRingPosition((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Linear interpolation for smooth trailing lag
        const lerpFactor = 0.15; 
        return {
          x: prev.x + dx * lerpFactor,
          y: prev.y + dy * lerpFactor
        };
      });
      animId = requestAnimationFrame(updateRing);
    };
    animId = requestAnimationFrame(updateRing);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  // Handle target hover detections
  useEffect(() => {
    const targets = document.querySelectorAll('.cursor-target');
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    targets.forEach(t => {
      t.addEventListener('mouseenter', handleMouseEnter);
      t.addEventListener('mouseleave', handleMouseLeave);
    });

    // Clean up
    return () => {
      targets.forEach(t => {
        t.removeEventListener('mouseenter', handleMouseEnter);
        t.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [position]); // Re-bind if DOM updates or moves

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999">
      {/* Lagging outer ring */}
      <div 
        ref={ringRef}
        className="fixed w-8 h-8 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          borderColor: isHovered ? cursorColorOnTarget : cursorColor,
          opacity: isHovered ? 0.8 : 0.45,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`,
          transition: `transform ${hoverDuration}s ease, border-color 0.2s ease`
        }}
      />
      {/* Central exact dot */}
      <div 
        className="fixed w-1.5 h-1.5 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          backgroundColor: isHovered ? cursorColorOnTarget : cursorColor,
          transform: `translate(-50%, -50%) scale(${isHovered ? 0.5 : 1})`
        }}
      />
    </div>
  );
}

export default TargetCursor;
