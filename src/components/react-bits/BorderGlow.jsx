import { useState, useRef } from 'react';

function BorderGlow({ 
  children, 
  glowColor = '217, 232, 226', // Mystic Mint RGB
  backgroundColor = '#114C5A33', // Nocturnal Expedition translucent
  borderRadius = 8,
  glowRadius = 250,
  glowIntensity = 0.4
}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  const handleMouseEnter = () => setOpacity(glowIntensity);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden p-[1px] group transition-all duration-300"
      style={{
        borderRadius: `${borderRadius}px`,
        backgroundColor: '#ffffff0d' // Default fallback border color
      }}
    >
      {/* Moving radial glow border overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, rgba(${glowColor}, 0.7), transparent 60%)`
        }}
      />
      
      {/* Inner card content wrapper */}
      <div 
        className="relative z-20 h-full w-full"
        style={{
          borderRadius: `${borderRadius - 1}px`
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default BorderGlow;
