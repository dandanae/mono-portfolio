'use client';
import { useMotionValueEvent, useScroll } from 'motion/react';
import React, { useEffect, useRef } from 'react';
import { useScrollAtoms } from '@/stores/scrollAtoms';

const ScrollMain = ({ ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { setScrollPercent } = useScrollAtoms();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setScrollPercent(Math.round(latest * 100));
  });

  useEffect(() => {
    setScrollPercent(0);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [setScrollPercent]);

  return <main ref={containerRef} {...props} />;
};

export default ScrollMain;
