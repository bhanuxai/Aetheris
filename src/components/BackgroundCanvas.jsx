import { useEffect, useRef } from 'react';

function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = [];
    // Adjust density based on screen size
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const connectionDistance = 120;
    const mouseConnectionDistance = 185;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Speeds (slow and elegant)
        this.vx = (Math.random() * 0.3 - 0.15);
        this.vy = (Math.random() * 0.3 - 0.15);
        // Size variation for parallax depth
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.baseAlpha = this.alpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction: pull particles slightly towards mouse if close
        if (mouse.x > -1000) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            // Subtle pull vector
            this.x += (dx / dist) * force * 0.35;
            this.y += (dy / dist) * force * 0.35;
            this.alpha = Math.min(0.8, this.baseAlpha + force * 0.3);
          } else {
            // Restore base alpha
            if (this.alpha > this.baseAlpha) {
              this.alpha -= 0.01;
            }
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Mystic Mint glowing particles
        ctx.fillStyle = `rgba(217, 232, 226, ${this.alpha})`;
        ctx.fill();
      }
    }

    // Initialize particle pool
    for (let i = 0; i < particleCount; i++) {
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
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // 2. Draw Connection Lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - (dist / connectionDistance)) * 0.08;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            // Nocturnal Expedition borders connecting lines
            ctx.strokeStyle = `rgba(17, 76, 90, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // 3. Connect particles to mouse
        if (mouse.x > -1000) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseConnectionDistance) {
            const alpha = (1 - (dist / mouseConnectionDistance)) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            // Mystic Mint light lines to cursor
            ctx.strokeStyle = `rgba(217, 232, 226, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40 bg-transparent"
      aria-hidden="true"
    />
  );
}

export default BackgroundCanvas;
