import { useEffect, useRef } from 'react';

function Antigravity({
  count = 120,
  magnetRadius = 160,
  ringRadius = 70,
  waveSpeed = 0.5,
  waveAmplitude = 3,
  particleSize = 1.6,
  lerpSpeed = 0.05,
  color = '#D9E8E2', // Mystic Mint
  autoAnimate = true,
  particleVariance = 1.2,
  rotationSpeed = 0.02,
  depthFactor = 1.5,
  pulseSpeed = 2,
  particleShape = 'capsule', // 'capsule' | 'circle' | 'both'
  fieldStrength = 8
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    const mouse = { x: -1000, y: -1000 };

    // Hex palette colors derived from requested colors
    const colors = [
      'rgba(217, 232, 226, 0.4)', // Mystic Mint
      'rgba(17, 76, 90, 0.3)',    // Nocturnal Expedition
      'rgba(241, 246, 244, 0.35)'  // Arctic Powder
    ];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Target coordinates for magnet attraction
        this.targetX = this.x;
        this.targetY = this.y;

        this.vx = (Math.random() * 0.25 - 0.12);
        this.vy = (Math.random() * 0.25 - 0.12);
        
        this.size = (Math.random() * particleSize + 0.8) * particleVariance;
        this.shape = particleShape === 'both' 
          ? (Math.random() > 0.5 ? 'capsule' : 'circle')
          : particleShape;

        // Angle for wave rotation/floating
        this.angle = Math.random() * Math.PI * 2;
        this.angularSpeed = (Math.random() * 0.01 - 0.005) * rotationSpeed;
        
        // Parallax depth factor
        this.depth = Math.random() * depthFactor + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Dimension for capsules
        this.length = this.size * (Math.random() * 4 + 3);
        this.rot = Math.random() * Math.PI * 2;
      }

      update(time) {
        // Base drift speed
        this.x += this.vx * this.depth;
        this.y += this.vy * this.depth;

        // Apply wave oscillation (sinusoidal floating)
        this.angle += waveSpeed * 0.02;
        this.x += Math.sin(this.angle + this.y * 0.01) * waveAmplitude * 0.05 * this.depth;
        this.y += Math.cos(this.angle + this.x * 0.01) * waveAmplitude * 0.05 * this.depth;

        // Wrap around boundaries
        if (this.x < -this.length) this.x = width + this.length;
        if (this.x > width + this.length) this.x = -this.length;
        if (this.y < -this.length) this.y = height + this.length;
        if (this.y > height + this.length) this.y = -this.length;

        // Cursor magnet interaction
        if (mouse.x > -1000) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);

          if (dist < magnetRadius) {
            // Magnetic force pulling/pushing particles
            const force = (magnetRadius - dist) / magnetRadius;
            // Shift vector away/toward cursor
            this.x -= (dx / dist) * force * fieldStrength * this.depth;
            this.y -= (dy / dist) * force * fieldStrength * this.depth;
          }
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'capsule') {
          // Draw capsule/pill shape
          ctx.rotate(this.rot + this.angle * 0.2);
          ctx.beginPath();
          // Draw a rounded capsule
          const r = this.size;
          const h = this.length;
          ctx.arc(0, -h/2 + r, r, Math.PI, 0);
          ctx.lineTo(r, h/2 - r);
          ctx.arc(0, h/2 - r, r, 0, Math.PI);
          ctx.lineTo(-r, -h/2 + r);
          ctx.closePath();
          ctx.fill();
        } else {
          // Draw standard circular particle
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize particle swarm
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animId;
    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [count, magnetRadius, waveSpeed, waveAmplitude, particleSize, particleShape, fieldStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30 bg-transparent"
      aria-hidden="true"
    />
  );
}

export default Antigravity;
