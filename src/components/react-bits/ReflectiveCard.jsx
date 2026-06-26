import { useRef, useState } from 'react';
import './ReflectiveCard.css';

const ReflectiveCard = ({
  name,
  desc,
  logoSvg,
  sysIndex,
  blurStrength = 12,
  color = 'white',
  metalness = 1,
  roughness = 0.4,
  overlayColor = 'rgba(255, 255, 255, 0.1)',
  displacementStrength = 20,
  noiseScale = 1,
  specularConstant = 1.2,
  grayscale = 1,
  glassDistortion = 0,
  className = '',
  style = {}
}) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const baseFrequency = 0.03 / Math.max(0.1, noiseScale);
  const saturation = 1 - Math.max(0, Math.min(1, grayscale));

  const cssVariables = {
    '--blur-strength': `${blurStrength}px`,
    '--metalness': metalness,
    '--roughness': roughness,
    '--overlay-color': overlayColor,
    '--text-color': color,
    '--saturation': saturation
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovering(false)}
      className={`reflective-card-container ${className}`}
      style={{ ...style, ...cssVariables }}
    >
      <svg className="reflective-svg-filters" aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id={`metallic-displacement-${sysIndex}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency={baseFrequency} numOctaves="2" result="noise" />
            <feColorMatrix in="noise" type="luminanceToAlpha" result="noiseAlpha" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={displacementStrength}
              xChannelSelector="R"
              yChannelSelector="G"
              result="rippled"
            />
            <feSpecularLighting
              in="noiseAlpha"
              surfaceScale={displacementStrength}
              specularConstant={specularConstant}
              specularExponent="20"
              lightingColor="#ffffff"
              result="light"
            >
              <fePointLight x="0" y="0" z="300" />
            </feSpecularLighting>
            <feComposite in="light" in2="rippled" operator="in" result="light-effect" />
            <feBlend in="light-effect" in2="rippled" mode="screen" result="metallic-result" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
              result="solidAlpha"
            />
            <feMorphology in="solidAlpha" operator="erode" radius="45" result="erodedAlpha" />
            <feGaussianBlur in="erodedAlpha" stdDeviation="10" result="blurredMap" />
            <feComponentTransfer in="blurredMap" result="glassMap">
              <feFuncA type="linear" slope="0.5" intercept="0" />
            </feComponentTransfer>
            <feDisplacementMap
              in="metallic-result"
              in2="glassMap"
              scale={glassDistortion}
              xChannelSelector="A"
              yChannelSelector="A"
              result="final"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="reflective-animated-backdrop absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{
          filter: `url(#metallic-displacement-${sysIndex}) saturate(var(--saturation)) blur(var(--blur-strength))`,
          opacity: 0.55
        }}
      />

      <div className="reflective-noise absolute inset-0 pointer-events-none" />
      <div
        className="reflective-sheen absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, rgba(217, 232, 226, 0.15), transparent)`,
          opacity: hovering ? 1 : 0
        }}
      />
      <div className="reflective-border absolute inset-0 pointer-events-none" />

      <div className="reflective-content relative z-10 flex flex-col justify-between h-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 border border-arctic-powder/10 bg-oceanic-noir/60 rounded flex items-center justify-center text-mystic-mint p-2.5">
            {logoSvg}
          </div>
          <span className="font-mono text-[8px] text-mystic-mint/35">0{sysIndex}.SYS</span>
        </div>

        <div>
          <h3 className="font-mono font-bold text-xs text-arctic-powder uppercase tracking-wider mb-2">
            {name}
          </h3>
          <p className="text-mystic-mint/80 text-[10px] sm:text-xs leading-normal">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReflectiveCard;
