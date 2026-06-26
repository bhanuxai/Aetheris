import { useRef, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);

  // Keep callback ref updated
  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useLayoutEffect(() => {
    if (!ref.current || !text) return;
    if (animationCompletedRef.current) return;

    const el = ref.current;
    
    // Select targets based on splitType
    let targets = [];
    if (splitType.includes('chars')) {
      targets = Array.from(el.querySelectorAll('.split-char'));
    } else if (splitType.includes('words')) {
      targets = Array.from(el.querySelectorAll('.split-word'));
    } else {
      targets = Array.from(el.querySelectorAll('.split-char, .split-word'));
    }

    if (targets.length === 0) return;

    // Calculate ScrollTrigger start position
    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    // Set initial properties on targets
    gsap.set(targets, { ...from });

    // Animate targets
    const tween = gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
        fastScrollEnd: true,
        anticipatePin: 0.4
      },
      onComplete: () => {
        animationCompletedRef.current = true;
        onCompleteRef.current?.();
      },
      willChange: 'transform, opacity',
      force3D: true
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    JSON.stringify(from),
    JSON.stringify(to),
    threshold,
    rootMargin
  ]);

  const renderTextContent = () => {
    if (!text) return null;

    const words = text.split(' ');
    
    return words.map((word, wordIdx) => {
      // Split each word into chars if splitType includes 'chars'
      const shouldSplitChars = splitType.includes('chars');
      
      const wordContent = shouldSplitChars ? (
        word.split('').map((char, charIdx) => (
          <span 
            key={charIdx} 
            className="split-char" 
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {char}
          </span>
        ))
      ) : (
        word
      );

      return (
        <span key={wordIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          <span 
            className="split-word" 
            style={{ display: 'inline-block', willChange: 'transform, opacity' }}
          >
            {wordContent}
          </span>
          {wordIdx < words.length - 1 && <span style={{ display: 'inline-block' }}>&nbsp;</span>}
        </span>
      );
    });
  };

  const style = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };
  const classes = `split-parent ${className}`;
  const Tag = tag || 'p';

  return (
    <Tag ref={ref} style={style} className={classes}>
      {renderTextContent()}
    </Tag>
  );
};

export default SplitText;
