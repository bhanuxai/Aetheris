import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import Magnet from './react-bits/Magnet';
import CurvedLoop from './react-bits/CurvedLoop';

function Footer({ onOpenPage }) {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Projects', href: '#features' },
    { name: 'Articles', href: '#blog' }
  ];

  const companyLinks = [
    { name: 'About Us', action: 'about' },
    { name: 'Contact Us', action: 'contact' }
  ];

  const policyLinks = [
    { name: 'Terms & Conditions', action: 'terms' },
    { name: 'Privacy Policy', action: 'privacy' }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  // A sleek, nested double-chevron logo symbol matching the screenshot design
  const LogoSymbol = () => (
    <svg viewBox="0 0 24 24" className="w-16 h-16 text-arctic-powder fill-current">
      <path d="M3.5 2H9.5L16 12L10 22H4L10.5 12L3.5 2Z" />
      <path d="M11.5 2H17.5L24 12L18 22H12L18.5 12L11.5 2Z" />
    </svg>
  );

  return (
    <footer className="relative bg-black pt-24 pb-8 overflow-hidden border-t border-arctic-powder/10">
      
      {/* Background Grid Accent Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-arctic-powder/10 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Footer Links Grid with vertical lines */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-16 border-b border-arctic-powder/10">
          
          {/* Column 1: Brand Logo Symbol */}
          <div className="flex flex-col justify-start md:border-r md:border-arctic-powder/10 md:pr-8">
            <div className="w-fit cursor-target">
              <LogoSymbol />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="text-left md:border-r md:border-arctic-powder/10 md:pr-8">
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-mystic-mint/45 uppercase mb-6">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-3.5 font-sans text-xs">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-mystic-mint/70 hover:text-arctic-powder transition-colors cursor-target inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="text-left md:border-r md:border-arctic-powder/10 md:pr-8">
            <h4 className="font-mono text-[10px] tracking-[0.2em] text-mystic-mint/45 uppercase mb-6">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-3.5 font-sans text-xs">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={(e) => { e.preventDefault(); onOpenPage(link.action); }} 
                    className="text-mystic-mint/70 hover:text-arctic-powder transition-colors cursor-target inline-block bg-transparent border-none text-left p-0 focus:outline-none"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies & Socials */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <h4 className="font-mono text-[10px] tracking-[0.2em] text-mystic-mint/45 uppercase mb-6">
                POLICIES
              </h4>
              <ul className="flex flex-col gap-3.5 font-sans text-xs mb-8">
                {policyLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={(e) => { e.preventDefault(); onOpenPage(link.action); }} 
                      className="text-mystic-mint/70 hover:text-arctic-powder transition-colors cursor-target inline-block bg-transparent border-none text-left p-0 focus:outline-none"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Magnet key={social.name} padding={10} magnetStrength={6}>
                    <a
                      href={social.href}
                      className="p-2 border border-arctic-powder/10 bg-arctic-powder/5 rounded text-mystic-mint hover:text-arctic-powder hover:border-arctic-powder/35 hover:bg-arctic-powder/10 transition-all duration-300 cursor-target block shadow-sm"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  </Magnet>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Section: Enormous Text Watermark, Curved Loop, & Copyright */}
        <div className="flex flex-col items-center relative w-full mt-8">
          {/* Giant lowercase Brand text logo stretching edge-to-edge */}
          <div className="w-full text-center select-none pointer-events-none pt-4 overflow-hidden">
            <span className="font-sans font-black text-[16vw] leading-none text-arctic-powder tracking-tighter lowercase select-none block opacity-95">
              aetheris
            </span>
          </div>

          {/* Curved Text Loop directly below the giant company name watermark with big text */}
          <div className="w-full select-none pointer-events-none -mt-4 mb-2 overflow-visible">
            <CurvedLoop 
              marqueeText="AETHERIS BUILDS REAL-TIME PIPELINES CONNECTING DATABASES TO AI MODELS. COMPUTE FEATURES, COMPILE SCHEMAS, AND ENFORCE SAFETY BOUNDARIES DYNAMICALLY."
              speed={1.5}
              curveAmount={40}
              className="font-sans text-[28px] sm:text-[36px] fill-mystic-mint/40 uppercase tracking-[0.18em]"
              interactive={false}
            />
          </div>

          {/* Centered Small Copyright Notice */}
          <div className="text-center font-mono text-[9px] text-mystic-mint/35 uppercase tracking-[0.25em] pb-4">
            © {new Date().getFullYear()} Aetheris AI. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
