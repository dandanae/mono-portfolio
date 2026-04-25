'use client';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import React from 'react';

const Template = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const bars = [{ delay: 0.1 }, { delay: 0.3 }, { delay: 0.0 }, { delay: 0.4 }, { delay: 0.2 }];
  const ease = [0.87, 0.05, 0.02, 0.97];

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none fixed inset-0 z-9999 flex flex-col">
          {bars.map((bar, i) => (
            <div key={`template-bar-${i}`} className="relative h-[20%] w-full overflow-hidden">
              {/* 레이어 1 */}
              <motion.div
                initial={{ x: '-101%' }}
                animate={{ x: ['-101%', '0%', '0%', '101%'] }}
                transition={{
                  duration: 2.2,
                  times: [0, 0.4, 0.7, 1],
                  ease: ease as any,
                  delay: bar.delay,
                }}
                className="bg-primary-100 absolute inset-0 z-10"
              />

              {/* 레이어 2*/}
              <motion.div
                initial={{ x: '-101%' }}
                animate={{ x: ['-101%', '0%', '0%', '101%'] }}
                transition={{
                  duration: 1.8,
                  times: [0, 0.4, 0.7, 1],
                  ease: ease as any,
                  delay: bar.delay + 0.2,
                }}
                className="bg-primary-200 absolute inset-0 z-20"
              />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 15,
            bounce: 0.8,
            duration: 0.8,
            delay: 2,
          }}
          className="relative flex h-full w-full"
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Template;
