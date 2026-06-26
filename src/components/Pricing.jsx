import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Check, ArrowUpRight } from 'lucide-react';
import ElectricBorder from './react-bits/ElectricBorder';
import BorderGlow from './react-bits/BorderGlow';
import ShinyText from './react-bits/ShinyText';

function SlideToConfirm({ onSuccess, label, isHighlighted }) {
  const containerRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.getBoundingClientRect().width);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleWidth = 40; // w-10 = 40px
  const padding = 4; // p-1 = 4px
  const dragRange = Math.max(0, containerWidth - handleWidth - padding * 2);

  const textOpacity = useTransform(dragX, [0, dragRange / 2], [1, 0]);
  const progressWidth = useTransform(dragX, [0, dragRange], [0, dragRange + handleWidth]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        dragX.set(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, dragX]);

  const handleDragEnd = () => {
    const currentX = dragX.get();
    if (currentX >= dragRange * 0.85) {
      setIsSuccess(true);
      dragX.set(dragRange);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      dragX.set(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-12 rounded-lg relative flex items-center p-1 select-none overflow-hidden border ${
        isHighlighted 
          ? 'bg-nocturnal-expedition/40 border-mystic-mint/30 shadow-[0_0_15px_rgba(217,232,226,0.05)]' 
          : 'bg-oceanic-noir/50 border-arctic-powder/10'
      }`}
    >
      {/* Background slide fill */}
      <motion.div 
        className={`absolute left-1 top-1 bottom-1 rounded-md opacity-25 ${
          isHighlighted ? 'bg-mystic-mint' : 'bg-arctic-powder'
        }`}
        style={{ width: progressWidth }}
      />

      {/* Slide Ticker Label */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="font-mono text-[9px] font-extrabold tracking-widest text-mystic-mint/60 uppercase">
          {isSuccess ? 'PROVISIONED' : label}
        </span>
      </motion.div>

      {/* Draggable Handle */}
      <motion.div
        drag={isSuccess ? false : "x"}
        dragConstraints={{ left: 0, right: dragRange }}
        dragElastic={0.05}
        dragMomentum={false}
        style={{ x: dragX }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onDragEnd={handleDragEnd}
        className={`w-10 h-10 rounded-md flex items-center justify-center cursor-grab active:cursor-grabbing cursor-target z-10 shadow-md ${
          isSuccess 
            ? 'bg-emerald-500 text-white' 
            : isHighlighted 
              ? 'bg-arctic-powder text-oceanic-noir' 
              : 'bg-nocturnal-expedition text-arctic-powder border border-arctic-powder/15'
        }`}
      >
        {isSuccess ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <img 
            src="/SVGs/chevron-right.svg" 
            className={`w-4 h-4 opacity-80 ${isHighlighted ? '' : 'invert'}`} 
            alt="Slide arrow" 
          />
        )}
      </motion.div>
    </div>
  );
}

function Pricing() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, annual
  const [currency, setCurrency] = useState('USD'); // USD, INR, EUR, GBP
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const closeDropdown = () => setDropdownOpen(false);
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, [dropdownOpen]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const currencyNames = {
    USD: 'USD ($)',
    INR: 'INR (₹)',
    EUR: 'EUR (€)',
    GBP: 'GBP (£)'
  };

  const getPlanPrice = (planName) => {
    if (planName === 'Developer Sandbox') {
      const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '£';
      return `${symbol}0`;
    }
    
    if (planName === 'Enterprise Cluster') {
      return 'Custom';
    }
    
    // Scale Node pricing details
    const priceTable = {
      USD: { monthly: 129, annual: 103 },
      INR: { monthly: 10999, annual: 8799 },
      EUR: { monthly: 119, annual: 95 },
      GBP: { monthly: 99, annual: 79 }
    };
    
    const symbol = currency === 'USD' ? '$' : currency === 'INR' ? '₹' : currency === 'EUR' ? '€' : '£';
    const amount = priceTable[currency][billingCycle];
    
    // Format with local separator rules
    const formattedAmount = currency === 'INR' ? amount.toLocaleString('en-IN') : amount;
    return `${symbol}${formattedAmount}`;
  };

  const plans = [
    {
      name: 'Developer Sandbox',
      period: 'free forever',
      description: 'Ideal for local daemon construction and index sandbox prototyping.',
      features: [
        '1 Ingestion Pipeline',
        '14.63:1 Max Compression ratio',
        '10,000 Daily Semantic queries',
        'Community support logs',
        'Local SQLite Vector store'
      ],
      cta: 'DEPLOY SANDBOX',
      link: '#newsletter',
      highlighted: false
    },
    {
      name: 'Scale Node',
      period: billingCycle === 'monthly' ? '/cluster/month' : '/cluster/month (billed annually)',
      description: 'Designed for scale-ready database indexing and live telemetry streaming.',
      features: [
        '5 Ingestion Pipelines',
        '19.23:1 Compression ratio',
        '13.51:1 Latency reduction ratio',
        '9.52:1 Core latency index',
        'Unlimited Live Voxel streams',
        '24/7 Autopilot telemetry logs'
      ],
      cta: 'PROVISION CLUSTER',
      link: '#newsletter',
      highlighted: true
    },
    {
      name: 'Enterprise Cluster',
      period: 'tailored setup',
      description: 'High-integrity pipeline clusters managed by dedicated devops daemons.',
      features: [
        'Unlimited Pipelines',
        'Custom throughput scaling rules',
        'Dedicated audits by Alex Cristache',
        '9.85:1 Reduction in debug logs',
        '99.999% SLA uptime guarantee',
        'Custom database connector hooks'
      ],
      cta: 'REQUEST AUDIT',
      link: '#newsletter',
      highlighted: false
    }
  ];

  return (
    <section className="py-24 px-6 border-b border-arctic-powder/5 relative bg-oceanic-noir" id="pricing">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 text-center cursor-target">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-arctic-powder font-sans uppercase">
            <ShinyText text="PAYMENT PIPELINE CONFIG" color="#FFC801" shineColor="#ffffff" speed={3} />
          </h2>
          <p className="text-mystic-mint/65 text-xs max-w-md mx-auto mt-4 leading-relaxed">
            Select the processing power and ingestion rates required for your semantic data systems.
          </p>

          {/* Billing & Currency Controls */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 select-none relative z-20">
            
            {/* Billing Toggle Switch */}
            <div className="flex items-center gap-3">
              <span className={`font-sans text-xs transition-colors duration-300 ${billingCycle === 'monthly' ? 'text-arctic-powder font-bold' : 'text-mystic-mint/55'}`}>
                Monthly
              </span>
              
              <button 
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="w-12 h-6 bg-nocturnal-expedition/60 border border-arctic-powder/15 rounded-full p-0.5 transition-colors duration-300 relative flex items-center cursor-pointer cursor-target focus:outline-none"
                aria-label="Toggle billing cycle"
              >
                <motion.div 
                  layout
                  className="w-4.5 h-4.5 bg-arctic-powder rounded-full shadow-md"
                  animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              
              <span className={`font-sans text-xs transition-colors duration-300 flex items-center gap-2 ${billingCycle === 'annual' ? 'text-arctic-powder font-bold' : 'text-mystic-mint/55'}`}>
                <span>Annual</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-mono tracking-wide uppercase">
                  Save 20%
                </span>
              </span>
            </div>

            {/* Vertical Separator */}
            <div className="hidden sm:block w-px h-5 bg-arctic-powder/10" />

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleDropdown}
                className="border border-arctic-powder/10 bg-nocturnal-expedition/40 hover:bg-nocturnal-expedition/60 rounded px-3 py-1.5 text-xs text-arctic-powder font-mono flex items-center gap-2 cursor-pointer cursor-target shadow-sm focus:outline-none min-w-[110px] justify-between"
              >
                <span>{currencyNames[currency]}</span>
                <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 fill-none stroke-current transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 right-0 bg-oceanic-noir border border-arctic-powder/10 rounded shadow-2xl z-30 overflow-hidden"
                  >
                    {Object.keys(currencyNames).map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors hover:bg-nocturnal-expedition/50 text-mystic-mint hover:text-arctic-powder cursor-target ${currency === code ? 'bg-nocturnal-expedition/30 text-arctic-powder font-bold' : ''}`}
                      >
                        {currencyNames[code]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-12 relative z-10">
          {plans.map((plan, index) => {
            const cardContent = (
              <div className={`p-8 rounded-lg flex flex-col justify-between h-full bg-nocturnal-expedition/30 border border-arctic-powder/10 relative overflow-hidden ${plan.highlighted ? 'bg-nocturnal-expedition/40 border-mystic-mint/30' : ''}`}>
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 border border-mystic-mint/30 bg-mystic-mint/10 rounded font-mono text-[8px] text-mystic-mint uppercase tracking-wider">
                    RECOMMENDED
                  </div>
                )}
                
                <div>
                  <h3 className="font-mono text-xs text-mystic-mint font-bold tracking-wider uppercase mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-4 mb-6">
                    <span className="text-4xl sm:text-5xl font-bold font-sans text-arctic-powder tracking-tight">
                      {getPlanPrice(plan.name)}
                    </span>
                    <span className="font-mono text-[10px] text-mystic-mint/50 uppercase ml-2">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-mystic-mint/80 text-xs leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  <div className="border-t border-arctic-powder/10 pt-6 mb-8">
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feat, fIdx) => {
                        const isRatioMetric = /\d+\.\d+:\d+/.test(feat);
                        return (
                          <li key={fIdx} className="flex items-center gap-2.5 text-xs text-mystic-mint/90">
                            <Check className="w-3.5 h-3.5 text-mystic-mint flex-shrink-0" />
                            <span className="flex items-center gap-1.5">
                              <span>{feat}</span>
                              {isRatioMetric && (
                                <img 
                                  src="/SVGs/arrow-trending-up.svg" 
                                  className="w-3.5 h-3.5 invert opacity-75 flex-shrink-0" 
                                  alt="trend up" 
                                />
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div>
                  <SlideToConfirm
                    isHighlighted={plan.highlighted}
                    label={
                      plan.cta.includes('SANDBOX') ? 'SLIDE TO DEPLOY' :
                      plan.cta.includes('CLUSTER') ? 'SLIDE TO PROVISION' :
                      'SLIDE TO REQUEST'
                    }
                    onSuccess={() => {
                      const targetId = plan.link;
                      if (targetId.startsWith('#')) {
                        const element = document.querySelector(targetId);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        window.location.href = plan.link;
                      }
                    }}
                  />
                </div>
              </div>
            );

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col"
              >
                {plan.highlighted ? (
                  <ElectricBorder
                    color="#D9E8E2" // Mystic Mint electric boundary glow
                    speed={0.8}
                    chaos={0.08}
                    borderRadius={8}
                    className="h-full"
                  >
                    {cardContent}
                  </ElectricBorder>
                ) : (
                  <BorderGlow borderRadius={8} glowIntensity={0.3} glowRadius={150} className="h-full">
                    {cardContent}
                  </BorderGlow>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Pricing;
