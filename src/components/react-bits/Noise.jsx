import { useEffect, useRef } from 'react';

function Noise({
  patternSize = 250,
  patternScaleX = 1.5,
  patternScaleY = 1.5,
  patternRefreshInterval = 3,
  patternAlpha = 12 // Opacity level of noise (1-255 scale)
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Create an off-screen canvas to hold the noise texture block
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = patternSize;
    noiseCanvas.height = patternSize;
    const noiseCtx = noiseCanvas.getContext('2d');
    const noiseData = noiseCtx.createImageData(patternSize, patternSize);

    const generateNoise = () => {
      const buffer = new Uint32Array(noiseData.data.buffer);
      const len = buffer.length;
      
      for (let i = 0; i < len; i++) {
        // Random grayscale noise pixel value
        const val = Math.floor(Math.random() * 255);
        // Pack val as RGBA (A is patternAlpha)
        buffer[i] = (patternAlpha << 24) | (val << 16) | (val << 8) | val;
      }
      noiseCtx.putImageData(noiseData, 0, 0);
    };

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let animId;
    let frameCount = 0;

    const render = () => {
      // Refresh noise pattern on off-screen buffer every interval
      if (frameCount % patternRefreshInterval === 0) {
        generateNoise();
      }
      frameCount++;

      ctx.clearRect(0, 0, width, height);

      // Create repeat pattern from off-screen noise canvas
      const pattern = ctx.createPattern(noiseCanvas, 'repeat');
      if (pattern) {
        // Apply scales
        ctx.save();
        ctx.scale(patternScaleX, patternScaleY);
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width / patternScaleX, height / patternScaleY);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50 mix-blend-overlay opacity-40"
      aria-hidden="true"
    />
  );
}

export default Noise;
