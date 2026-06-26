import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import Magnet from './react-bits/Magnet';
import ShinyText from './react-bits/ShinyText';

const arrowRightVariants = {
  initial: { x: 0 },
  hover: { x: 4 }
};

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const canvasRef = useRef(null);

  // Background dots animation inside newsletter panel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 45;

    class Dot {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() * 0.4 - 0.2);
        this.vy = (Math.random() * 0.4 - 0.2);
        this.alpha = Math.random() * 0.12 + 0.04;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 232, 226, ${this.alpha * 1.5})`; // Mystic Mint particles
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Dot());
    }

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(d => {
        d.update();
        d.draw();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="newsletter">
      {/* Background Dotted Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden="true" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col items-center">
        
        {/* Large Title */}
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder mb-6 font-sans uppercase">
          <ShinyText text="PROVISION YOUR INSTANCE" color="#FFC801" shineColor="#ffffff" speed={3} />
        </h2>
        
        {/* Subtitle */}
        <p className="text-mystic-mint/85 text-sm max-w-md leading-relaxed mb-10 font-sans">
          Request sandbox access tokens and receive system architecture reflection audits directly to your inbox.
        </p>

        {/* Input Form */}
        <form 
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3 font-mono text-xs"
        >
          <input 
            type="email"
            required
            value={email}
            disabled={status === 'loading' || status === 'success'}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER_EMAIL_ADDRESS"
            className="flex-grow bg-nocturnal-expedition/30 border border-arctic-powder/10 hover:border-arctic-powder/30 focus:border-mystic-mint/50 focus:outline-none rounded px-4 py-3 text-arctic-powder transition-colors shadow-sm cursor-target"
            aria-label="Email address input"
          />
          
          <Magnet padding={20} magnetStrength={14}>
            <motion.button 
              type="submit"
              whileHover="hover"
              initial="initial"
              disabled={status === 'loading' || status === 'success'}
              className="bg-arctic-powder text-oceanic-noir px-6 py-3 rounded font-bold hover:bg-mystic-mint transition-colors flex items-center justify-center gap-2 flex-shrink-0 shadow-md cursor-pointer cursor-target"
            >
              {status === 'loading' ? (
                <span>REQUESTING...</span>
              ) : status === 'success' ? (
                <span>PROVISIONED</span>
              ) : (
                <>
                  <span>REQUEST ACCESS</span>
                  <motion.span variants={arrowRightVariants} transition={{ type: 'spring', stiffness: 400, damping: 25 }}>
                    <ArrowRight className="w-4 h-4 text-oceanic-noir" />
                  </motion.span>
                </>
              )}
            </motion.button>
          </Magnet>
        </form>

        {/* Status log stream */}
        {status === 'loading' && (
          <div className="mt-4 font-mono text-[9px] text-mystic-mint/60 animate-pulse">
            &gt; connecting: bootstrap_check_credentials...
          </div>
        )}
        {status === 'success' && (
          <div className="mt-4 font-mono text-[9px] text-emerald-400">
            &gt; bootstrap: verified. check your inbox for cluster keys.
          </div>
        )}

      </div>
    </section>
  );
}

export default Newsletter;
