import React from 'react';
import { gsap } from 'gsap';

function FlowingMenu({ items = [] }) {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full gap-4">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, description }) {
  const itemRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const headingRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (!overlayRef.current || !headingRef.current) return;

    // Hide heading
    gsap.to(headingRef.current, { opacity: 0, duration: 0.3, ease: 'power1.out' });

    // Show overlay
    gsap.fromTo(
      overlayRef.current,
      { y: '100%', opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'expo' }
    );

    // Start marquee animation
    gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 10,
      repeat: -1,
      ease: 'linear',
    });
  };

  const handleMouseLeave = () => {
    if (!overlayRef.current || !headingRef.current) return;

    // Show heading back
    gsap.to(headingRef.current, { opacity: 1, duration: 0.3, ease: 'power1.out' });

    // Hide overlay
    gsap.to(overlayRef.current, {
      y: '100%',
      opacity: 0,
      duration: 0.5,
      ease: 'expo',
    });

    // Stop marquee
    gsap.killTweensOf(marqueeRef.current);
  };
    const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <span
      key={idx}
      // Marquee Text: text-gray-700 -> text-muted-foreground (used for secondary/subtle text)
      className="text-4xl font-semibold text-muted-foreground whitespace-nowrap mr-8"
    >
      {description}
    </span>
  ));


  return (
    <div
      // Item Container:
      // bg-slate-950 -> bg-card (neutral background, off-black in dark mode)
      // border-b-gray-800 -> border-border
      className="relative h-[100px] bg-card-foreground dark:bg-background border-2 w-full rounded-r-md border-b-border overflow-hidden"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
    >
      <a
        href={link}
        ref={headingRef}
        // Heading Text: text-white -> text-foreground (White in dark mode, black in light mode)
        className="flex items-center justify-center h-full uppercase font-bold text-background dark:text-foreground text-[2rem] cursor-pointer z-10 relative"
      >
        {text}
      </a>

      {/* Floating marquee inside container */}
      <div
        ref={overlayRef}
        // Overlay Background:
        // bg-white/90 -> bg-primary/90 (Using the Amber primary color for the hover overlay)
        // flex items-center overflow-hidden opacity-0
        className="absolute top-0 left-0 w-full h-full bg-primary/90 flex items-center overflow-hidden opacity-0"
      >
        <div
          ref={marqueeRef}
          className="flex w-[200%] gap-8 items-center"
        >
          {repeatedMarqueeContent}
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;