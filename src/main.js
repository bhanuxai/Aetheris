/**
 * Apeiron AI - Landing Page Core Interactive Logic
 * Optimized for performance-isolated DOM updates and zero global layout thrashing.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Systems
  initLoader();
  initBanner();
  initCountdown();
  initLivePipelineFeed();
  initPricingMatrix();
  initBentoAccordionSync();
  initTuningControls();
  initTestimonialsSlider();
  initScrollTop();
  initHeroDotsCanvas();
});

/* ==========================================================================
   1. Splash Loader Orchestration (< 500ms limit)
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById("loader");
  const app = document.getElementById("app");

  // Fade out loader and reveal app at 200ms
  setTimeout(() => {
    if (loader) loader.classList.add("fade-out");
    if (app) app.classList.add("visible");
  }, 200);

  // Remove loader completely from DOM at 450ms to keep TTI immediate
  setTimeout(() => {
    if (loader) loader.remove();
  }, 450);
}

/* ==========================================================================
   2. Alert Banner Close
   ========================================================================== */
function initBanner() {
  const banner = document.getElementById("top-banner");
  const closeBtn = document.getElementById("close-banner-btn");

  if (closeBtn && banner) {
    closeBtn.addEventListener("click", () => {
      banner.style.display = "none";
      // Adjust header sticky position if needed
      const header = document.querySelector(".site-header");
      if (header) header.style.top = "0";
    });
  }
}

/* ==========================================================================
   3. Urgent Countdown Timer
   ========================================================================== */
function initCountdown() {
  const daysVal = document.getElementById("days");
  const hoursVal = document.getElementById("hours");
  const minutesVal = document.getElementById("minutes");
  const secondsVal = document.getElementById("seconds");

  // Target date: exactly 5 days from now
  const targetDate = new Date().getTime() + (5 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysVal) daysVal.textContent = "00";
      if (hoursVal) hoursVal.textContent = "00";
      if (minutesVal) minutesVal.textContent = "00";
      if (secondsVal) secondsVal.textContent = "00";
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    // direct text node updates
    if (daysVal) daysVal.textContent = String(d).padStart(2, "0");
    if (hoursVal) hoursVal.textContent = String(h).padStart(2, "0");
    if (minutesVal) minutesVal.textContent = String(m).padStart(2, "0");
    if (secondsVal) secondsVal.textContent = String(s).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. Live Ingestion Pipeline Visualization (Hero console)
   ========================================================================== */
function initLivePipelineFeed() {
  const consoleBody = document.getElementById("viz-body");
  const statsLabel = document.getElementById("viz-stats");

  if (!consoleBody) return;

  const mockIpRanges = ["10.0.8.", "192.168.14.", "172.16.89."];
  const mockTableSchemas = ["user_nodes", "ledger_entries", "pipeline_metrics", "device_logs"];
  const mockErrors = ["WARN: Retry count exceeded", "REMODELING: Schema auto-aligned", "HOT_SWAP: Endpoint bound"];

  let stepCount = 0;

  function appendLogLine() {
    const lines = consoleBody.querySelectorAll(".viz-line");
    // Limit lines to 6 to simulate infinite console scroll
    if (lines.length >= 6) {
      lines[0].remove();
    }

    const randIp = mockIpRanges[Math.floor(Math.random() * mockIpRanges.length)] + Math.floor(Math.random() * 254);
    const randTable = mockTableSchemas[Math.floor(Math.random() * mockTableSchemas.length)];
    const time = new Date().toLocaleTimeString().split(" ")[0];

    let lineText = `[${time}] INGEST_STREAM: source=${randIp} -> buffer_pool=ok`;
    let lineClass = "";

    stepCount++;
    if (stepCount % 5 === 0) {
      lineText = `[${time}] SCHEMA_RESOLVE: target=${randTable} | fields_matched=success`;
      lineClass = "success";
    } else if (stepCount % 8 === 0) {
      lineText = `[${time}] ${mockErrors[Math.floor(Math.random() * mockErrors.length)]}`;
      lineClass = "accent";
    }

    const logDiv = document.createElement("div");
    logDiv.className = `viz-line ${lineClass}`;
    logDiv.textContent = lineText;
    consoleBody.appendChild(logDiv);

    // Randomize latency and load indicator
    if (statsLabel) {
      const lat = (Math.random() * 2.5 + 2.5).toFixed(1);
      const load = (Math.random() * 8.0 + 24.0).toFixed(1);
      statsLabel.textContent = `LATENCY: ${lat}ms | LOAD: ${load}%`;
    }
  }

  // Seed logs
  for (let i = 0; i < 4; i++) {
    appendLogLine();
  }

  setInterval(appendLogLine, 1800);
}

/* ==========================================================================
   5. Feature 1: Performance-Isolated Pricing Matrix
   ========================================================================== */
function initPricingMatrix() {
  // Pricing configuration object
  const PRICING_MATRIX = {
    currencies: {
      USD: { symbol: "$", rate: 1.0, tariff: 1.0 },
      EUR: { symbol: "€", rate: 0.92, tariff: 1.05 }, // rate of 0.92, 5% regional tariff increase
      INR: { symbol: "₹", rate: 83.5, tariff: 0.98 }  // rate of 83.5, 2% regional tariff discount
    },
    tiers: {
      core: { base: 19 },
      scale: { base: 49 },
      enterprise: { base: 139 }
    },
    discountMultiplier: 0.8 // flat 20% annual discount
  };

  // State
  let selectedCurrency = "USD";
  let isAnnualBilling = false;

  // Cache targets
  const toggleBtn = document.getElementById("billing-cycle-toggle");
  const labelMonthly = document.getElementById("label-monthly");
  const labelYearly = document.getElementById("label-yearly");

  const dropdownWrapper = document.getElementById("currency-dropdown-wrapper");
  const dropdownBtn = document.getElementById("currency-dropdown-btn");
  const dropdownItems = document.querySelectorAll("#currency-options .dropdown-item");

  const planTiers = ["core", "scale", "enterprise"];
  const priceNodes = {};
  const symbolNodes = {};
  const suffixNodes = {};
  const billedAnnuallyNodes = {};

  // Store references to actual text nodes to prevent global component layout thrashing
  planTiers.forEach(tier => {
    priceNodes[tier] = document.getElementById(`price-${tier}`);
    symbolNodes[tier] = document.getElementById(`symbol-${tier}`);
    suffixNodes[tier] = document.getElementById(`suffix-${tier}`);
    billedAnnuallyNodes[tier] = document.getElementById(`billed-${tier}`);
  });

  // Calculate pricing based on matrix configuration
  function getCalculatedPricing(tier) {
    const baseVal = PRICING_MATRIX.tiers[tier].base;
    const currency = PRICING_MATRIX.currencies[selectedCurrency];
    
    // Base tier rate * currency rate * regional tariff variables
    let finalMonthly = baseVal * currency.rate * currency.tariff;
    
    if (isAnnualBilling) {
      // Apply flat 20% annual discount multiplier
      finalMonthly = finalMonthly * PRICING_MATRIX.discountMultiplier;
    }

    return finalMonthly;
  }

  // Format currency representation
  function formatValue(value, currencyCode) {
    if (currencyCode === "INR") {
      // Round to nearest integer for Indian Rupee
      return Math.round(value).toLocaleString("en-IN");
    } else {
      // Round to nearest integer for cleaner SaaS design display (e.g. $15 instead of $15.20)
      return Math.round(value).toString();
    }
  }

  // Isolated Update DOM updates
  function updatePricingDisplay() {
    const currencyInfo = PRICING_MATRIX.currencies[selectedCurrency];

    planTiers.forEach(tier => {
      const calculated = getCalculatedPricing(tier);
      const formatted = formatValue(calculated, selectedCurrency);
      
      const priceElement = priceNodes[tier];
      const symbolElement = symbolNodes[tier];
      const suffixElement = suffixNodes[tier];
      const billedElement = billedAnnuallyNodes[tier];

      if (priceElement && symbolElement && suffixElement && billedElement) {
        // Trigger a tiny micro-interaction scale update animation
        priceElement.classList.add("price-update-scale");
        
        // Directly update text content (Zero-re-render and zero-reflow)
        symbolElement.textContent = currencyInfo.symbol;
        priceElement.textContent = formatted;
        suffixElement.textContent = "/mo";

        if (isAnnualBilling) {
          // Billed annually: equivalent monthly rate * 12
          const totalAnnual = Math.round(calculated * 12);
          const formattedAnnual = formatValue(totalAnnual, selectedCurrency);
          billedElement.textContent = `Billed annually: ${currencyInfo.symbol}${formattedAnnual}/yr`;
        } else {
          billedElement.textContent = "Billed monthly";
        }

        // Remove scale class after animation duration (150ms ease-out)
        setTimeout(() => {
          priceElement.classList.remove("price-update-scale");
        }, 150);
      }
    });
  }

  // Register Billing Toggle Switch Click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isAnnualBilling = !isAnnualBilling;
      toggleBtn.setAttribute("aria-checked", isAnnualBilling ? "true" : "false");
      
      if (isAnnualBilling) {
        labelMonthly.classList.remove("active");
        labelYearly.classList.add("active");
      } else {
        labelMonthly.classList.add("active");
        labelYearly.classList.remove("active");
      }

      updatePricingDisplay();
    });
  }

  // Register Custom Dropdown Switcher Actions
  if (dropdownBtn && dropdownWrapper) {
    // Toggle list open
    dropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownWrapper.classList.toggle("open");
      const isOpen = dropdownWrapper.classList.contains("open");
      dropdownBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
      dropdownWrapper.classList.remove("open");
      dropdownBtn.setAttribute("aria-expanded", "false");
    });

    // Select currency item option
    dropdownItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        selectedCurrency = item.getAttribute("data-value");

        // Update dropdown button text label
        const btnText = dropdownBtn.querySelector("span");
        if (btnText) btnText.textContent = `${selectedCurrency} (${PRICING_MATRIX.currencies[selectedCurrency].symbol})`;

        // Update active dropdown items
        dropdownItems.forEach(i => {
          i.classList.remove("active");
          i.setAttribute("aria-selected", "false");
        });
        item.classList.add("active");
        item.setAttribute("aria-selected", "true");

        // Collapse dropdown and trigger price updates
        dropdownWrapper.classList.remove("open");
        dropdownBtn.setAttribute("aria-expanded", "false");

        updatePricingDisplay();
      });
    });
  }

  // Initial Calculation
  updatePricingDisplay();
}

/* ==========================================================================
   6. Feature 2: Bento-to-Accordion Context Handoff
   ========================================================================== */
function initBentoAccordionSync() {
  const bentoItems = document.querySelectorAll(".bento-item");
  let currentActiveIndex = 0; // Default active index is the first card

  // Initial highlight activation
  setActiveIndex(currentActiveIndex);

  bentoItems.forEach((item, index) => {
    // Desktop Hovers: update active index context on mouseenter
    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        setActiveIndex(index);
      }
    });

    // Mobile Taps: update active index context and expand panel on accordion click
    const header = item.querySelector(".bento-header");
    if (header) {
      header.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          // If tapping already open accordion, keep it open (locks context)
          setActiveIndex(index);
        }
      });
    }
  });

  // Share index context and update class properties
  function setActiveIndex(index) {
    currentActiveIndex = index;

    bentoItems.forEach((item, idx) => {
      const isSelected = idx === index;
      const body = item.querySelector(".bento-body");
      const header = item.querySelector(".bento-header");

      if (isSelected) {
        item.classList.add("active");
        if (header) header.setAttribute("aria-expanded", "true");
      } else {
        item.classList.remove("active");
        if (header) header.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Watch for abrupt window resizes across layout breakpoints
  window.addEventListener("resize", () => {
    // Rely on CSS variables for structural shifts.
    // The shared activeIndex context locks the corresponding panel automatically on layout shift.
    // We re-trigger active index application to ensure ARIA states sync correctly.
    setActiveIndex(currentActiveIndex);
  });
}

/* ==========================================================================
   7. Live Bento Widgets Animations (Terminal Logging + Slider Changes)
   ========================================================================== */
function initTuningControls() {
  const slider1 = document.getElementById("slider-1");
  const val1 = document.getElementById("val-slider-1");
  const slider2 = document.getElementById("slider-2");
  const val2 = document.getElementById("val-slider-2");

  if (slider1 && val1) {
    slider1.addEventListener("input", (e) => {
      val1.textContent = `${e.target.value}ms`;
    });
  }

  if (slider2 && val2) {
    slider2.addEventListener("input", (e) => {
      val2.textContent = `${e.target.value}%`;
    });
  }

  // Dynamic typing simulator inside Bento Card 4 (Query Engine)
  const typingSpan = document.getElementById("query-type-text");
  const sqlSpan = document.getElementById("compiled-sql-result");
  const mockQueries = [
    { text: "Find anomalies in billing", sql: "SELECT * FROM data_streams WHERE latency > 150.0;" },
    { text: "Group ingestion traffic by IP", sql: "SELECT source_ip, count(*) FROM raw_feeds GROUP BY source_ip;" },
    { text: "Compute avg throughput last hour", sql: "SELECT avg(bytes_processed) FROM cluster_metrics WHERE age < 3600;" }
  ];

  let queryIdx = 0;
  
  function animateTyping() {
    if (!typingSpan || !sqlSpan) return;

    const query = mockQueries[queryIdx];
    let charIdx = 0;
    typingSpan.textContent = "";
    
    // Type query
    const typeInterval = setInterval(() => {
      typingSpan.textContent += query.text.charAt(charIdx);
      charIdx++;
      if (charIdx >= query.text.length) {
        clearInterval(typeInterval);
        
        // Show compiled SQL
        setTimeout(() => {
          sqlSpan.textContent = query.sql;
          sqlSpan.style.opacity = "1";
        }, 300);

        // Next loop
        setTimeout(() => {
          queryIdx = (queryIdx + 1) % mockQueries.length;
          sqlSpan.style.opacity = "0.3";
          animateTyping();
        }, 4000);
      }
    }, 85);
  }

  setTimeout(animateTyping, 1000);

  // Bento Card 1: Scrolling terminal logs
  const bentoLogs = document.getElementById("bento-term-logs");
  const bentoLogSteps = [
    "CHECK_INTEGRITY: validation=pass",
    "INGEST_BUFFER: size=48.2KB [OK]",
    "COMPILE_SCHEMA: table=\"users_nodes\"",
    "CONNECT_REPLICAS: response=0.42ms",
    "ANOMALY_SCAN: anomaly=none detected"
  ];
  let bentoLogIdx = 0;

  function appendBentoLog() {
    if (!bentoLogs) return;

    const lines = bentoLogs.querySelectorAll(".term-line");
    if (lines.length >= 4) {
      lines[0].remove();
    }

    const logText = bentoLogSteps[bentoLogIdx];
    const logDiv = document.createElement("div");
    logDiv.className = "term-line";
    logDiv.textContent = `> ${logText}`;
    if (logText.includes("OK") || logText.includes("pass")) {
      logDiv.classList.add("success");
    }
    bentoLogs.appendChild(logDiv);

    bentoLogIdx = (bentoLogIdx + 1) % bentoLogSteps.length;
  }

  setInterval(appendBentoLog, 2200);
}

/* ==========================================================================
   8. Social Proof Testimonials Carousel
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");

  if (slides.length === 0) return;

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });

    currentSlide = index;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      let nextIdx = currentSlide - 1;
      if (nextIdx < 0) nextIdx = slides.length - 1;
      showSlide(nextIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      let nextIdx = currentSlide + 1;
      if (nextIdx >= slides.length) nextIdx = 0;
      showSlide(nextIdx);
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-slide"));
      showSlide(index);
    });
  });

  // Auto rotate slides every 8 seconds
  setInterval(() => {
    let nextIdx = currentSlide + 1;
    if (nextIdx >= slides.length) nextIdx = 0;
    showSlide(nextIdx);
  }, 8000);
}

/* ==========================================================================
   9. Scroll To Top Button
   ========================================================================== */
function initScrollTop() {
  const scrollBtn = document.getElementById("scroll-top-btn");

  if (!scrollBtn) return;

  // Toggle button visibility based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.pointerEvents = "auto";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.pointerEvents = "none";
    }
  });

  // Scroll to top on click
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ==========================================================================
   10. Interactive Dotted Background (Antigravity Style)
   ========================================================================== */
function initHeroDotsCanvas() {
  const canvas = document.getElementById("hero-dots-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  const particles = [];
  const maxParticles = 140;

  // Custom colors matching the hex palette constraints
  const colors = [
    "#FFC801", // Forsythia (Gold)
    "#FF9932", // Deep Saffron (Orange)
    "#114C5A", // Nocturnal Expedition (Teal)
    "#172836", // Oceanic Noir (Dark Navy)
    "#D9E8E2"  // Mystic Mint (Light Mint)
  ];

  class Particle {
    constructor(isInitial = false) {
      this.reset(isInitial);
    }

    reset(isInitial = false) {
      this.x = width / 2;
      this.y = height / 2;

      // Emit outwards in a circle
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.3; // Gentle slow expansion

      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;

      // Choose a random color from the predefined palette
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.size = Math.random() * 2 + 1; // Size of dots
      
      // If initial seed, scatter particles randomly along their trajectories
      if (isInitial) {
        const scatterDist = Math.random() * (Math.min(width, height) * 0.5);
        this.x += Math.cos(angle) * scatterDist;
        this.y += Math.sin(angle) * scatterDist;
      }
      
      this.alpha = 1;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 100;
    }

    update() {
      // Move particle
      this.x += this.vx;
      this.y += this.vy;

      // Add a very small centrifugal acceleration (creates a wave spread)
      this.vx *= 1.002;
      this.vy *= 1.002;

      this.life++;

      const dist = Math.hypot(this.x - width / 2, this.y - height / 2);
      const maxDist = Math.min(width, height) * 0.6; // Fade out by 60% of viewport min dimension

      if (dist > maxDist || this.life > this.maxLife) {
        this.reset(false);
      } else {
        // Fade out proportional to distance from center
        this.alpha = 1 - (dist / maxDist);
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles with initial scattered state
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle(true));
  }

  // Resize handler
  window.addEventListener("resize", () => {
    if (canvas) {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      
      // Re-seed to prevent blank zones on sudden resize
      particles.forEach(p => p.reset(true));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
