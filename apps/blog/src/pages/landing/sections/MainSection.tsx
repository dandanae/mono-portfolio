'use client';

import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { CatEyes } from '../components';

const MainSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInside, setIsInside] = useState(false);

  const swingVariants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 25,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 2,
      },
    },
    rest: {
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 5,
        mass: 1.5,
      },
    },
  };

  const name = 'DANAE';

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="bg-background relative flex overflow-hidden p-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-indigo-400/20 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-amber-600/20 blur-[120px]" />
      </div>

      <UpContainer className="relative flex h-full min-h-screen w-full flex-col items-center justify-center">
        <motion.div
          variants={upItemVariants}
          className="absolute top-20 flex flex-col items-center text-center select-none"
        >
          <p className="mona10x12 mb-2 font-mono text-xs tracking-[5px] uppercase opacity-70">
            Creative Frontend Developer
          </p>

          <motion.h1 className="font-moirai! cursor-default text-5xl font-black tracking-tighter md:text-7xl">
            HELLO, I AM{' '}
            <span className="font-moirai! inline-flex text-amber-500 dark:text-amber-400">
              {name.split('').map((char, index) => (
                <motion.span
                  key={index}
                  variants={swingVariants as any}
                  initial="initial"
                  whileHover="hover"
                  animate="rest"
                  style={{
                    display: 'inline-block',
                    originX: 0.5,
                    originY: 0,
                    cursor: 'pointer',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>
        </motion.div>

        <motion.div variants={upItemVariants} className="pointer-events-none z-10">
          <CatEyes sectionRef={sectionRef} isInside={isInside} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-sm font-light"
        >
          <span className="mona10x12 text-xs tracking-[5px] uppercase">Scroll to see my profile</span>

          <div className="material-symbols-rounded select-none">keyboard_arrow_down</div>
        </motion.div>
      </UpContainer>
    </section>
  );
};

export default MainSection;
