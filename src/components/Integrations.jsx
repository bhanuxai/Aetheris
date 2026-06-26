import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { companyPaths } from './companyPaths';
import ReflectiveCard from './react-bits/ReflectiveCard';
import ShinyText from './react-bits/ShinyText';

function Integrations() {
  const integrations = [
    { name: 'OpenAI', desc: 'GPT-4o vector schema modeling', logoKey: 'openai' },
    { name: 'Anthropic', desc: 'Claude pipeline query extraction', logoKey: 'anthropic' },
    { name: 'Google AI', desc: 'Gemini semantic parsing nodes', logoKey: 'google' },
    { name: 'AWS', desc: 'S3 & Kinesis stream ingestion', logoKey: 'amazonwebservices' },
    { name: 'Microsoft Azure', desc: 'Blob storage event handlers', logoKey: 'microsoftazure' },
    { name: 'Slack', desc: 'Incident alert notifications', logoKey: 'slack' },
    { name: 'GitHub', desc: 'CI/CD pipeline version sync', logoKey: 'github' },
    { name: 'Discord', desc: 'Developer community chat bot', logoKey: 'discord' },
    { name: 'Zapier', desc: 'Automated webhook triggers', logoKey: 'zapier' },
    { name: 'Notion', desc: 'Documentation & runbook syncing', logoKey: 'notion' },
    { name: 'Figma', desc: 'Visual schema layout mockup', logoKey: 'figma' }
  ];

  const marqueeRef = useRef(null);
  const [sharedStream, setSharedStream] = useState(null);

  // Initialize a single shared webcam stream for all reflective cards to prevent browser collisions
  useEffect(() => {
    let activeStream = null;
    const initWebcam = async () => {
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
            facingMode: 'user'
          }
        });
        setSharedStream(activeStream);
      } catch (err) {
        console.warn('Webcam stream unavailable for shared reflective background:', err.message);
      }
    };

    initWebcam();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const track = marqueeRef.current;
    if (!track) return;
    
    // Half of the scrollWidth corresponds to one full loop of duplicated items
    const loopWidth = track.scrollWidth / 2;
    
    const anim = gsap.to(track, {
      x: -loopWidth,
      duration: 35,
      ease: 'none',
      repeat: -1
    });

    return () => anim.kill();
  }, []);

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="integrations">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 text-left cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-sans uppercase">
            <ShinyText text="THE ECOSYSTEM" color="#FFC801" shineColor="#ffffff" speed={3.5} />
          </h2>
        </div>

        {/* Integration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {integrations.map((item, index) => {
            const sysIndex = index + 1;
            const logoSvg = (
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-full h-full fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={companyPaths[item.logoKey]} />
              </svg>
            );

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className="cursor-pointer transition-all duration-300 relative h-[160px] cursor-target"
              >
                <ReflectiveCard
                  name={item.name}
                  desc={item.desc}
                  logoSvg={logoSvg}
                  sysIndex={sysIndex}
                  sharedStream={sharedStream}
                  blurStrength={8}
                  displacementStrength={15}
                  grayscale={0.7}
                  overlayColor="rgba(17, 76, 90, 0.25)"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Infinite Scrolling Logo Marquee powered by GSAP */}
        <div className="mt-20 pt-12 border-t border-arctic-powder/5 overflow-hidden relative w-full cursor-target">
          
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] text-mystic-mint/45 uppercase tracking-widest">
              PARTNERS
            </span>
          </div>

          <div className="absolute left-0 top-20 bottom-0 w-24 bg-gradient-to-r from-oceanic-noir via-oceanic-noir/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-20 bottom-0 w-24 bg-gradient-to-l from-oceanic-noir via-oceanic-noir/80 to-transparent z-10 pointer-events-none" />
          
          <div ref={marqueeRef} className="flex gap-20 items-center whitespace-nowrap pointer-events-none select-none w-max">
            {/* Double the list for infinite looping */}
            {[...integrations, ...integrations].map((item, index) => {
              return (
                <div key={index} className="flex items-center gap-4.5 font-mono text-[13px] text-mystic-mint/75 uppercase tracking-widest flex-shrink-0">
                  <svg
                    role="img"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-mystic-mint/45"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d={companyPaths[item.logoKey]} />
                  </svg>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Integrations;

