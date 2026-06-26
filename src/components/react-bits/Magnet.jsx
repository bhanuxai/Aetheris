import { useRef, useEffect } from 'react';
import gsap from 'gsap';

function Magnet({ children, padding = 45, disabled = false, magnetStrength = 22 }) {
  const ref = useRef(null);
  const targetRef = useRef(null);

  useEffect(() => {
    if (disabled || !ref.current || !targetRef.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      const triggerArea = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < triggerArea) {
        const factor = (triggerArea - dist) / triggerArea;
        const targetX = (dx / dist) * factor * magnetStrength;
        const targetY = (dy / dist) * factor * magnetStrength;

        gsap.to(targetRef.current, {
          x: targetX,
          y: targetY,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(targetRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(targetRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        overwrite: "auto"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled, padding, magnetStrength]);

  return (
    <div ref={ref} className="inline-block relative">
      <div ref={targetRef} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default Magnet;
