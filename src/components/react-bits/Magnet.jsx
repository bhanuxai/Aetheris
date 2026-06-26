import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

function Magnet({ children, padding = 45, disabled = false, magnetStrength = 22 }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics configuration
  const springConfig = { damping: 18, stiffness: 180, mass: 0.8 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    if (disabled || !ref.current) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      // Calculate coordinates of center of child container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance vectors relative to center
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      // Trigger zone padding boundary check
      const triggerArea = Math.max(rect.width, rect.height) / 2 + padding;

      if (dist < triggerArea) {
        setIsHovered(true);
        // Translate vector slightly towards mouse based on strength
        const factor = (triggerArea - dist) / triggerArea; // ranges from 0 to 1
        x.set((dx / dist) * factor * magnetStrength);
        y.set((dy / dist) * factor * magnetStrength);
      } else {
        // Reset positions
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    ref.current.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (ref.current) {
        ref.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled, padding, magnetStrength, x, y]);

  return (
    <div ref={ref} className="inline-block relative">
      <motion.div
        style={{
          x: springX,
          y: springY
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Magnet;
