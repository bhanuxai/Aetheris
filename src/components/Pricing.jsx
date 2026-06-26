import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import ElectricBorder from './react-bits/ElectricBorder';
import BorderGlow from './react-bits/BorderGlow';
import ShinyText from './react-bits/ShinyText';

function useIntersectionReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function SlideToConfirm({ onSuccess, label, isHighlighted }) {
  const containerRef = useRef(null);
  const handleRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startDragX = useRef(0);
  const startXOffset = useRef(0);

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

  const textOpacity = Math.max(0, 1 - xOffset / (dragRange / 2 || 1));
  const progressWidth = xOffset;

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setXOffset(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handlePointerDown = (e) => {
    if (isSuccess) return;
    setIsDragging(true);
    startDragX.current = e.clientX;
    startXOffset.current = xOffset;
    if (handleRef.current) {
      handleRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startDragX.current;
    let newX = startXOffset.current + deltaX;
    newX = Math.max(0, Math.min(newX, dragRange));
    setXOffset(newX);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (handleRef.current) {
      handleRef.current.releasePointerCapture(e.pointerId);
    }

    if (xOffset >= dragRange * 0.85) {
      setIsSuccess(true);
      setXOffset(dragRange);
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setXOffset(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`w-full h-12 rounded-lg relative flex items-center p-1 select-none overflow-hidden border transition-shadow duration-300 ${
        isHighlighted 
          ? 'bg-nocturnal-expedition/40 border-mystic-mint/30 shadow-[0_0_15px_rgba(217,232,226,0.05)]' 
          : 'bg-oceanic-noir/50 border-arctic-powder/10'
      }`}
    >
      {/* Background slide fill */}
      <div 
        className={`absolute left-1 top-1 bottom-1 rounded-md opacity-25 ${
          isHighlighted ? 'bg-mystic-mint' : 'bg-arctic-powder'
        }`}
        style={{ 
          width: `${progressWidth + (xOffset > 0 ? handleWidth : 0)}px`,
          transition: isDragging ? 'none' : 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      />

      {/* Slide Ticker Label */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="font-mono text-[9px] font-extrabold tracking-widest text-mystic-mint/60 uppercase">
          {isSuccess ? 'PROVISIONED' : label}
        </span>
      </div>

      {/* Draggable Handle */}
      <div
        ref={handleRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-10 h-10 rounded-md flex items-center justify-center cursor-grab active:cursor-grabbing cursor-target z-10 shadow-md transform hover:scale-105 active:scale-95"
        style={{ 
          transform: `translateX(${xOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s',
          backgroundColor: isSuccess 
            ? '#10b981' // bg-emerald-500
            : isHighlighted 
              ? '#F1F6F4' // bg-arctic-powder
              : '#114C5A', // bg-nocturnal-expedition
          color: isSuccess || !isHighlighted ? '#F1F6F4' : '#172836',
          border: !isSuccess && !isHighlighted ? '1px solid rgba(241, 246, 244, 0.15)' : 'none'
        }}
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
      </div>
    </div>
  );
}

function PricingCard({ plan, index }) {
  const [ref, isVisible] = useIntersectionReveal();

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
          <span id={plan.priceId} className="text-4xl sm:text-5xl font-bold font-sans text-arctic-powder tracking-tight">
            {plan.initialPrice}
          </span>
          <span id={plan.periodId} className="font-mono text-[10px] text-mystic-mint/50 uppercase ml-2">
            {plan.initialPeriod}
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
    <div
      ref={ref}
      className={`flex flex-col transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
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
    </div>
  );
}

function Pricing() {
  console.log("Pricing component rendered");

  const billingCycleRef = useRef('monthly'); // monthly, annual
  const currencyRef = useRef('USD'); // USD, INR, EUR, GBP
  const dropdownOpenRef = useRef(false);

  const currencyNames = {
    USD: 'USD ($)',
    INR: 'INR (₹)',
    EUR: 'EUR (€)',
    GBP: 'GBP (£)'
  };

  const currencySymbols = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£'
  };

  const priceTable = {
    USD: { monthly: 129, annual: 103 },
    INR: { monthly: 10999, annual: 8799 },
    EUR: { monthly: 119, annual: 95 },
    GBP: { monthly: 99, annual: 79 }
  };

  const updateDOMPrices = () => {
    const currentCurrency = currencyRef.current;
    const currentBilling = billingCycleRef.current;
    const symbol = currencySymbols[currentCurrency];

    // Update Sandbox
    const sandboxPriceEl = document.getElementById('price-dev-sandbox');
    if (sandboxPriceEl) {
      sandboxPriceEl.textContent = `${symbol}0`;
    }

    // Update Scale Node Price
    const scaleNodePriceEl = document.getElementById('price-scale-node');
    if (scaleNodePriceEl) {
      const amount = priceTable[currentCurrency][currentBilling];
      const formattedAmount = currentCurrency === 'INR' ? amount.toLocaleString('en-IN') : amount;
      scaleNodePriceEl.textContent = `${symbol}${formattedAmount}`;
    }

    // Update Scale Node Period
    const scaleNodePeriodEl = document.getElementById('period-scale-node');
    if (scaleNodePeriodEl) {
      scaleNodePeriodEl.textContent = currentBilling === 'monthly' 
        ? '/cluster/month' 
        : '/cluster/month (billed annually)';
    }
  };

  const handleBillingToggle = () => {
    const nextBilling = billingCycleRef.current === 'monthly' ? 'annual' : 'monthly';
    billingCycleRef.current = nextBilling;

    // Update prices
    updateDOMPrices();

    // Update switch toggle position in the DOM
    const handle = document.getElementById('billing-toggle-handle');
    if (handle) {
      if (nextBilling === 'monthly') {
        handle.classList.remove('translate-x-6');
        handle.classList.add('translate-x-0');
      } else {
        handle.classList.remove('translate-x-0');
        handle.classList.add('translate-x-6');
      }
    }

    // Update Monthly/Annual label styling in the DOM
    const labelMonthly = document.getElementById('billing-label-monthly');
    const labelAnnual = document.getElementById('billing-label-annual');
    if (labelMonthly && labelAnnual) {
      if (nextBilling === 'monthly') {
        labelMonthly.classList.remove('text-mystic-mint/55');
        labelMonthly.classList.add('text-arctic-powder', 'font-bold');
        
        labelAnnual.classList.remove('text-arctic-powder', 'font-bold');
        labelAnnual.classList.add('text-mystic-mint/55');
      } else {
        labelMonthly.classList.remove('text-arctic-powder', 'font-bold');
        labelMonthly.classList.add('text-mystic-mint/55');
        
        labelAnnual.classList.remove('text-mystic-mint/55');
        labelAnnual.classList.add('text-arctic-powder', 'font-bold');
      }
    }
  };

  const setDropdownMenuVisible = (visible) => {
    const menu = document.getElementById('currency-dropdown-menu');
    const arrow = document.getElementById('currency-dropdown-arrow');
    if (menu) {
      if (visible) {
        menu.classList.remove('opacity-0', 'translate-y-1', 'pointer-events-none');
        menu.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      } else {
        menu.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        menu.classList.add('opacity-0', 'translate-y-1', 'pointer-events-none');
      }
    }
    if (arrow) {
      if (visible) {
        arrow.classList.add('rotate-180');
      } else {
        arrow.classList.remove('rotate-180');
      }
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    const nextOpen = !dropdownOpenRef.current;
    dropdownOpenRef.current = nextOpen;
    setDropdownMenuVisible(nextOpen);
  };

  const selectCurrency = (code) => {
    currencyRef.current = code;
    updateDOMPrices();

    // Update button text
    const activeText = document.getElementById('currency-active-text');
    if (activeText) {
      activeText.textContent = currencyNames[code];
    }

    // Highlight selected item in option list
    const codes = ['USD', 'INR', 'EUR', 'GBP'];
    codes.forEach((c) => {
      const optEl = document.getElementById(`currency-opt-${c}`);
      if (optEl) {
        if (c === code) {
          optEl.classList.add('bg-nocturnal-expedition/30', 'text-arctic-powder', 'font-bold');
        } else {
          optEl.classList.remove('bg-nocturnal-expedition/30', 'text-arctic-powder', 'font-bold');
        }
      }
    });

    // Close menu
    dropdownOpenRef.current = false;
    setDropdownMenuVisible(false);
  };

  useEffect(() => {
    const closeDropdown = () => {
      if (dropdownOpenRef.current) {
        dropdownOpenRef.current = false;
        setDropdownMenuVisible(false);
      }
    };
    window.addEventListener('click', closeDropdown);
    return () => window.removeEventListener('click', closeDropdown);
  }, []);

  const plans = [
    {
      name: 'Developer Sandbox',
      priceId: 'price-dev-sandbox',
      periodId: 'period-dev-sandbox',
      initialPrice: '$0',
      initialPeriod: 'free forever',
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
      priceId: 'price-scale-node',
      periodId: 'period-scale-node',
      initialPrice: '$129',
      initialPeriod: '/cluster/month',
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
      priceId: 'price-enterprise-cluster',
      periodId: 'period-enterprise-cluster',
      initialPrice: 'Custom',
      initialPeriod: 'tailored setup',
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
              <span id="billing-label-monthly" className="font-sans text-xs transition-colors duration-300 text-arctic-powder font-bold">
                Monthly
              </span>
              
              <button 
                onClick={handleBillingToggle}
                className="w-12 h-6 bg-nocturnal-expedition/60 border border-arctic-powder/15 rounded-full p-0.5 transition-colors duration-300 relative flex items-center cursor-pointer cursor-target focus:outline-none"
                aria-label="Toggle billing cycle"
              >
                <div 
                  id="billing-toggle-handle"
                  className="w-4.5 h-4.5 bg-arctic-powder rounded-full shadow-md transform transition-transform duration-300 translate-x-0"
                />
              </button>
              
              <span id="billing-label-annual" className="font-sans text-xs transition-colors duration-300 flex items-center gap-2 text-mystic-mint/55">
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
                <span id="currency-active-text">USD ($)</span>
                <svg id="currency-dropdown-arrow" viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current transition-transform duration-300" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div 
                id="currency-dropdown-menu"
                className="absolute top-full mt-2 left-0 right-0 bg-oceanic-noir border border-arctic-powder/10 rounded shadow-2xl z-30 overflow-hidden transition-all duration-200 opacity-0 translate-y-1 pointer-events-none"
              >
                {Object.keys(currencyNames).map((code) => (
                  <button
                    key={code}
                    id={`currency-opt-${code}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectCurrency(code);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-mono transition-colors hover:bg-nocturnal-expedition/50 text-mystic-mint hover:text-arctic-powder cursor-target ${code === 'USD' ? 'bg-nocturnal-expedition/30 text-arctic-powder font-bold' : ''}`}
                  >
                    {currencyNames[code]}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mt-12 relative z-10">
          {plans.map((plan, index) => (
            <PricingCard 
              key={plan.name}
              plan={plan}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pricing;
