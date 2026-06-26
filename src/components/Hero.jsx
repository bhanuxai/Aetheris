import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Terminal } from 'lucide-react';
import gsap from 'gsap';
import Magnet from './react-bits/Magnet';
import SplitText from './react-bits/SplitText';
import LogoLoop from './react-bits/LogoLoop';


const arrowVariants = {
  initial: { x: 0, y: 0 },
  hover: { x: 3, y: -3 }
};

function Hero() {
  const partnerLogos = [
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>Amazon AWS</title>
          <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z"/>
        </svg>
      )
    },
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>Snowflake</title>
          <path d="M24 3.459c0 .646-.418 1.18-1.141 1.18-.723 0-1.142-.534-1.142-1.18 0-.647.419-1.18 1.142-1.18.723 0 1.141.533 1.141 1.18zm-.228 0c0-.533-.38-.951-.913-.951s-.913.38-.913.95c0 .533.38.952.913.952.57 0 .913-.419.913-.951zm-1.37-.533h.495c.266 0 .456.152.456.38 0 .153-.076.229-.19.305l.19.266v.038h-.266l-.19-.266h-.229v.266h-.266zm.495.228h-.229v.267h.229c.114 0 .152-.038.152-.114.038-.077-.038-.153-.152-.153zM7.602 12.4c.038-.151.076-.304.076-.456 0-.114-.038-.228-.038-.342-.114-.343-.304-.647-.646-.838l-4.87-2.777c-.685-.38-1.56-.152-1.94.533-.381.685-.153 1.56.532 1.94l2.701 1.56-2.701 1.56c-.685.38-.913 1.256-.533 1.94.38.685 1.256.914 1.94.533l4.832-2.777c.343-.267.571-.533.647-.876zm1.332 2.626c-.266-.038-.57.038-.837.19l-4.832 2.777c-.685.38-.913 1.256-.532 1.94.38.686 1.255.914 1.94.533l2.701-1.56v3.12c0 .8.647 1.408 1.446 1.408.799 0 1.407-.647 1.407-1.408v-5.592c0-.761-.57-1.37-1.293-1.408zm4.946-6.088c.266.038.57-.038.837-.19l4.832-2.777c.685-.38.913-1.256.532-1.94-.38-.686-1.255-.914-1.94-.533l-2.701 1.56V1.975c0-.799-.647-1.408-1.446-1.408-.799 0-1.446.609-1.446 1.408V7.53c0 .76.609 1.37 1.332 1.407zM3.265 5.97l4.832 2.777c.266.152.533.19.837.19.723-.038 1.331-.684 1.331-1.407V1.975c0-.799-.646-1.408-1.407-1.408-.799 0-1.446.647-1.446 1.408v3.12l-2.701-1.56c-.685-.38-1.56-.152-1.94.533-.419.646-.19 1.521.494 1.902zm9.093 6.011a.412.412 0 00-.114-.266l-.57-.571a.346.346 0 00-.267-.114.412.412 0 00-.266.114l-.571.57a.411.411 0 00-.114.267c0 .076.038.19.114.267l.57.57a.345.345 0 00.267.114c.076 0 .19-.038.266-.114l.571-.57a.412.412 0 00.114-.267zm1.598.533L11.94 14.53c-.039.038-.153.114-.229.114h-.608a.411.411 0 01-.267-.114L8.82 12.514a.408.408 0 01-.076-.229v-.608c0-.076.038-.19.114-.267l2.016-2.016a.41.41 0 01.267-.114h.608a.41.41 0 01.267.114l2.016 2.016a.347.347 0 01.114.267v.608c-.076.077-.114.19-.19.229zm5.593 5.44l-4.832-2.777c-.266-.152-.57-.19-.837-.152-.723.038-1.332.684-1.332 1.408v5.554c0 .8.647 1.408 1.408 1.408.799 0 1.446-.647 1.446-1.408v-3.12l2.7 1.56c.686.38 1.561.152 1.941-.533.419-.646.19-1.521-.494-1.94zm2.549-7.533l-2.701 1.56 2.7 1.56c.686.38.914 1.256.533 1.94-.38.685-1.255.913-1.94.533l-4.832-2.778a1.644 1.644 0 01-.647-.798c-.037-.153-.076-.305-.076-.457 0-.114.039-.228.039-.342.114-.343.342-.647.646-.837l4.832-2.778c.685-.38 1.56-.152 1.94.533.457.609.19 1.484-.494 1.864"/>
        </svg>
      )
    },
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>Databricks</title>
          <path d="M.95 14.184L12 20.403l9.919-5.55v2.21L12 22.662l-10.484-5.96-.565.308v.77L12 24l11.05-6.218v-4.317l-.515-.309L12 19.118l-9.867-5.653v-2.21L12 16.805l11.05-6.218V6.32l-.515-.308L12 11.974 2.647 6.681 12 1.388l7.76 4.368.668-.411v-.566L12 0 .95 6.27v.72L12 13.207l9.919-5.55v2.26L12 15.52 1.516 9.56l-.565.308Z"/>
        </svg>
      )
    },
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>Google Cloud</title>
          <path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"/>
        </svg>
      )
    },
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>OpenAI</title>
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
        </svg>
      )
    },
    {
      node: (
        <svg role="img" viewBox="0 0 24 24" className="h-5 w-auto fill-arctic-powder/60 hover:fill-mystic-mint transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      )
    }
  ];

  const linksRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mouseCanvasPos, setMouseCanvasPos] = useState({ x: -1000, y: -1000 });

  // Track cursor position on canvas
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseCanvasPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP animations for list slide-in
  useEffect(() => {
    // Animate middle-right links sliding in
    if (linksRef.current) {
      const linkItems = linksRef.current.querySelectorAll('.link-item');
      gsap.fromTo(linkItems,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: 'power4.out', stagger: 0.15, delay: 0.4 }
      );
    }
  }, []);

  // Interactive 3D isometric terrain canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const cols = 22;
    const rows = 22;
    const size = 18;

    const drawCuboid = (cCtx, x, y, cSize, cHeight, colorTop, colorLeft, colorRight, strokeStyle) => {
      // Top Face
      cCtx.beginPath();
      cCtx.moveTo(x, y - cHeight);
      cCtx.lineTo(x + cSize * 0.866, y - cSize * 0.5 - cHeight);
      cCtx.lineTo(x, y - cSize - cHeight);
      cCtx.lineTo(x - cSize * 0.866, y - cSize * 0.5 - cHeight);
      cCtx.closePath();
      cCtx.fillStyle = colorTop;
      cCtx.fill();
      cCtx.strokeStyle = strokeStyle;
      cCtx.stroke();

      // Left Face
      cCtx.beginPath();
      cCtx.moveTo(x - cSize * 0.866, y - cSize * 0.5 - cHeight);
      cCtx.lineTo(x, y - cHeight);
      cCtx.lineTo(x, y);
      cCtx.lineTo(x - cSize * 0.866, y - cSize * 0.5);
      cCtx.closePath();
      cCtx.fillStyle = colorLeft;
      cCtx.fill();
      cCtx.strokeStyle = strokeStyle;
      cCtx.stroke();

      // Right Face
      cCtx.beginPath();
      cCtx.moveTo(x, y - cHeight);
      cCtx.lineTo(x + cSize * 0.866, y - cSize * 0.5 - cHeight);
      cCtx.lineTo(x + cSize * 0.866, y - cSize * 0.5);
      cCtx.lineTo(x, y);
      cCtx.closePath();
      cCtx.fillStyle = colorRight;
      cCtx.fill();
      cCtx.strokeStyle = strokeStyle;
      cCtx.stroke();
    };

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    let animId;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      // Isometric center coordinates (positioned on the right side of the screen)
      const centerX = width > 1024 ? width * 0.68 : width * 0.5;
      const centerY = width > 1024 ? height * 0.42 : height * 0.55;

      // Render cells back-to-front (painter's algorithm)
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Isometric projection mapping
          const isoX = (c - r) * size * 0.866 + centerX;
          const isoY = (c + r) * size * 0.5 + centerY;

          // Sine wave heights based on grid indices and time
          const wave = Math.sin(time + (c + r) * 0.28) * 10 + Math.cos(time * 0.6 - (c - r) * 0.16) * 6;
          
          // Distance calculation relative to mouse cursor
          const dx = isoX - mouseCanvasPos.x;
          const dy = isoY - wave - mouseCanvasPos.y;
          const dist = Math.hypot(dx, dy);
          
          // Vertical push-up displacement
          const maxDisplacement = 45;
          const mouseDisplacement = Math.max(0, 160 - dist) * 0.25;
          const clampedDisplacement = Math.min(maxDisplacement, mouseDisplacement);

          const totalHeight = 12 + wave + clampedDisplacement;

          // Base colors (Nocturnal Expedition and dark teal shades)
          let colorTop = '#114c5a';
          let colorLeft = '#0e3f4b';
          let colorRight = '#0b333c';
          let strokeStyle = 'rgba(241, 246, 244, 0.04)';

          // Hover Glow/Rise logic (glows teal and mint near cursor)
          if (clampedDisplacement > 4) {
            const factor = clampedDisplacement / maxDisplacement;
            colorTop = `rgba(217, 232, 226, ${0.15 + factor * 0.5})`; // Mystic Mint top glow
            colorLeft = `rgba(17, 76, 90, ${0.4 + factor * 0.4})`;
            colorRight = `rgba(14, 63, 75, ${0.4 + factor * 0.4})`;
            strokeStyle = `rgba(217, 232, 226, ${0.04 + factor * 0.2})`; // Mystic Mint border glow
          }

          drawCuboid(ctx, isoX, isoY, size, totalHeight, colorTop, colorLeft, colorRight, strokeStyle);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mouseCanvasPos]);



  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen pt-36 pb-24 px-6 flex items-end overflow-hidden border-b border-arctic-powder/5 bg-oceanic-noir"
      id="hero"
    >
      {/* Underlying 3D Topographic texture backdrop - inverted for dark theme */}

      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none bg-oceanic-noir opacity-15">
        <img 
          src="/aetheris_hero_background.png" 
          alt="" 
          className="w-full h-full object-cover mix-blend-screen scale-[1.02] filter invert opacity-50 blur-[1px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-oceanic-noir via-transparent to-oceanic-noir" />
      </div>

      {/* Live Interactive 3D Canvas Voxel Grid */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90 cursor-target" 
        aria-hidden="true" 
      />



      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end relative z-20">
        
        {/* Left Column: Headline and main CTA aligned to bottom */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          


          {/* Huge Title with SplitText */}
          <h1 
            className="text-5xl sm:text-7xl xl:text-8xl font-bold tracking-tight text-arctic-powder leading-[1.05] mb-8 font-sans uppercase cursor-target"
          >
            <SplitText
              text="Power your data"
              delay={60}
              duration={1.2}
              ease="power4.out"
              textAlign="left"
              tag="span"
              className="block"
              threshold={0}
              rootMargin="0px"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
            />
            <span className="block mt-2">
              <SplitText
                text="with"
                delay={60}
                duration={1.2}
                ease="power4.out"
                textAlign="left"
                tag="span"
                className="inline-block mr-4"
                threshold={0}
                rootMargin="0px"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
              <SplitText
                text="AI"
                delay={60}
                duration={1.2}
                ease="power4.out"
                textAlign="left"
                tag="span"
                className="inline-block text-deep-saffron font-mono tracking-tighter"
                threshold={0}
                rootMargin="0px"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="text-mystic-mint/85 text-sm max-w-md leading-relaxed mb-10 font-sans"
          >
            Deploy custom enterprise pipelines and automate complex database streams. 
            Scale your semantic intelligence with Aetheris today.
          </motion.p>

          {/* Action CTAs: Icon box + White button */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex items-center gap-3.5"
          >
            <div className="w-12 h-12 border border-arctic-powder/15 bg-nocturnal-expedition/50 rounded flex items-center justify-center text-mystic-mint shadow-sm cursor-target" aria-hidden="true">
              <Terminal className="w-5 h-5 text-mystic-mint" />
            </div>
            <a 
              href="#newsletter" 
              className="bg-arctic-powder text-oceanic-noir px-8 py-3.5 rounded font-mono font-bold text-xs hover:bg-mystic-mint transition-colors uppercase tracking-wider flex items-center gap-2 shadow-md cursor-target"
            >
              <span>Build A Pipeline</span>
              <ArrowUpRight className="w-4 h-4 text-oceanic-noir" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Stacked Links and Partner Logos shifted slightly higher */}
        <div className="lg:col-span-5 w-full flex flex-col justify-start pb-6 lg:pb-24">
          
          {/* Large vertical links stack */}
          <div ref={linksRef} className="flex flex-col gap-6 text-left pl-0 lg:pl-16">
            {[
              { name: 'AI Strategy', tag: 'STRAT_SYS' },
              { name: 'Custom Pipelines', tag: 'PIPE_MP025' },
              { name: 'Stream Automation', tag: 'AUTO_DAEMON' },
              { name: 'Data Intelligence', tag: 'INTEL_NODE' }
            ].map((item, index) => (
              <a 
                key={item.name}
                href="#features" 
                className="link-item group flex items-center gap-3 text-3xl sm:text-4xl xl:text-5xl font-bold text-mystic-mint/35 hover:text-arctic-powder transition-colors duration-300 font-sans tracking-tight cursor-target"
              >
                <span>{item.name}</span>
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 text-mystic-mint" />
              </a>
            ))}
          </div>

          {/* Monochrome partner logos with LogoLoop */}
          <div className="mt-16 pl-0 lg:pl-16 flex items-center gap-6 opacity-60 hover:opacity-95 transition-opacity duration-300 w-full cursor-target">
            <span className="text-mystic-mint/35 font-bold uppercase tracking-widest text-[8px] flex-shrink-0">PARTNERS //</span>
            <div className="flex-grow overflow-hidden">
              <LogoLoop 
                logos={partnerLogos} 
                speed={50} 
                direction="left" 
                gap={36} 
                logoHeight={24}
                fadeOut={true} 
                pauseOnHover={true}
              />
            </div>
          </div>

        </div>

      </div>


      
    </section>
  );
}

export default Hero;
