import { useState, useEffect } from 'react';
import StaggeredMenu from './react-bits/StaggeredMenu';

function Navbar() {
  const [displayText, setDisplayText] = useState('');
  const targetText = 'UNSEEN INTELLIGENCE';

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const current = targetText.slice(0, index);
      setDisplayText(current);

      let speed = isDeleting ? 50 : 100;

      if (!isDeleting && index === targetText.length) {
        speed = 3000; // Pause at full text
        isDeleting = true;
      } else if (isDeleting && index === 0) {
        speed = 1000; // Pause at empty text
        isDeleting = false;
      }

      index = isDeleting ? index - 1 : index + 1;
      timer = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timer);
  }, []);

  const items = [
    { label: "Features", link: "#features", ariaLabel: "Features Section" },
    { label: "Integrations", link: "#integrations", ariaLabel: "Integrations Section" },
    { label: "Testimonials", link: "#testimonials", ariaLabel: "Testimonials Section" },
    { label: "Pricing", link: "#pricing", ariaLabel: "Pricing Section" },
    { label: "Blog", link: "#blog", ariaLabel: "Blog Section" },
    { label: "FAQ", link: "#faq", ariaLabel: "FAQ Section" },
    { label: "Provision Node", link: "#newsletter", ariaLabel: "Provision Node Section" }
  ];

  const socialItems = [
    { label: "GitHub", link: "#" },
    { label: "Twitter", link: "#" },
    { label: "Discord", link: "#" },
    { label: "LinkedIn", link: "#" }
  ];

  const logo = (
    <a href="#" className="flex items-center gap-2.5 group cursor-target select-none">
      <img src="/SVGs/cube-16-solid.svg" className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[360deg] ease-out" alt="Aetheris Logo" />
      <span className="font-mono font-bold tracking-wider text-sm text-arctic-powder">AETHERIS</span>
      <span className="font-mono text-[9px] text-mystic-mint/65 uppercase tracking-wider ml-3.5 border-l border-arctic-powder/15 pl-3.5 h-4 flex items-center">
        // {displayText}
        <span className="w-0.5 h-3.5 bg-mystic-mint/80 ml-1.5 animate-pulse" />
      </span>
    </a>
  );

  return (
    <StaggeredMenu
      position="right"
      colors={["#114C5A", "#172836"]}
      items={items}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      logoUrl={logo}
      accentColor="#D9E8E2" // Mystic Mint
      menuButtonColor="#F1F6F4" // Arctic Powder
      openMenuButtonColor="#D9E8E2" // Mystic Mint
      changeMenuColorOnOpen={true}
      isFixed={true}
    />
  );
}

export default Navbar;
