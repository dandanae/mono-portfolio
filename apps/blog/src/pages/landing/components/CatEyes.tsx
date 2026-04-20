'use client';

import {
  motion,
  type MotionValue,
  useAnimation,
  useAnimationControls,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import React, { type Ref, useEffect, useRef, useState } from 'react';
import { cn } from '@repo/utils';

const springConfig = { stiffness: 108, damping: 18, mass: 1.1 };
const fishSpringConfig = { stiffness: 150, damping: 20 };

const CatEyes = ({ sectionRef, isInside }: { sectionRef: React.RefObject<HTMLElement | null>; isInside: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothCursorX = useSpring(cursorX, fishSpringConfig);
  const smoothCursorY = useSpring(cursorY, fishSpringConfig);
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const reduceMotion = useReducedMotion();
  const blinkControls = useAnimationControls();

  const [isAnyEyeHit, setIsAnyEyeHit] = useState<boolean>(false);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      // 눈동자 움직임
      mouseX.set((event.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((event.clientY / window.innerHeight) * 2 - 1);

      // 생선
      cursorX.set(relativeX);
      cursorY.set(relativeY);

      checkGlobalCollision(event.clientX, event.clientY);
    };

    const checkGlobalCollision = (cx: number, cy: number) => {
      const checkSingleEye = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) return false;

        const rect = ref.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const distance = Math.sqrt(Math.pow(cx - eyeCenterX, 2) + Math.pow(cy - eyeCenterY, 2));
        return distance < 80;
      };

      const hitLeft = checkSingleEye(leftEyeRef as React.RefObject<HTMLDivElement>);
      const hitRight = checkSingleEye(rightEyeRef as React.RefObject<HTMLDivElement>);

      setIsAnyEyeHit(hitLeft || hitRight);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, cursorX, cursorY, sectionRef]);

  useEffect(() => {
    if (reduceMotion) return;

    let timeout: number;
    let cancelled = false;

    const runBlinkLoop = () => {
      timeout = window.setTimeout(
        async () => {
          await blinkControls.start({
            scaleY: [1, 0.03, 1],
            transition: { duration: 0.2, ease: 'easeInOut', times: [0, 0.5, 1] },
          });

          if (!cancelled) runBlinkLoop();
        },

        2200 + Math.random() * 2600,
      );
    };

    runBlinkLoop();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [blinkControls, reduceMotion]);

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <Iris ref={leftEyeRef} x={smoothX} y={smoothY} blinkControls={blinkControls} isHit={isAnyEyeHit} />

      <div className="relative flex flex-col items-center">
        <motion.span
          animate={{
            scale: isAnyEyeHit ? 1.3 : 1,

            y: isAnyEyeHit ? 5 : 0,
          }}
          className="text-foreground relative z-10 min-w-12 text-center text-6xl font-bold transition-colors select-none"
        >
          {isAnyEyeHit ? 'ᗝ' : '⩊'}
        </motion.span>

        {isAnyEyeHit && (
          <div className="absolute top-[90%] flex items-start justify-center">
            {[
              { h: 40, d: 0, w: 18 },
              { h: 60, d: 0.1, w: 20 },
              { h: 30, d: 0.2, w: 14 },
            ].map((drool, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: [0, drool.h, drool.h - 5],
                  opacity: [0, 1, 0.9],
                  y: [0, 2, 0],
                }}
                transition={{
                  duration: 0.8,
                  delay: drool.d,
                  ease: 'easeOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
                style={{ width: drool.w }}
                className="rounded-b-full bg-blue-400 dark:bg-blue-200"
              />
            ))}
          </div>
        )}
      </div>

      <Iris ref={rightEyeRef} x={smoothX} y={smoothY} blinkControls={blinkControls} isHit={isAnyEyeHit} />

      <motion.div
        className={cn('pointer-events-none absolute z-50 h-12 w-12', isInside ? 'block' : 'hidden')}
        style={{
          x: smoothCursorX,
          y: smoothCursorY,
          left: -24,
          top: -24,
        }}
      >
        <Image
          src="https://www.svgrepo.com/show/489677/fish.svg"
          alt="fish"
          width={100}
          height={100}
          className="h-full w-full fill-white select-none"
        />
      </motion.div>
    </div>
  );
};

export default CatEyes;

type AnimationControls = ReturnType<typeof useAnimation>;
interface IrisProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  blinkControls: AnimationControls;
  isHit: boolean;
  ref?: Ref<HTMLDivElement>;
}

const Iris = ({ ref, x, y, blinkControls, isHit }: IrisProps) => {
  const reduceMotion = useReducedMotion();
  const moveX = useTransform(x, [-1, 1], [-20, 20]);
  const moveY = useTransform(y, [-1, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      className="relative h-24 w-24 overflow-hidden rounded-full bg-amber-500 md:h-40 md:w-40 dark:bg-amber-400"
      animate={reduceMotion ? undefined : blinkControls}
    >
      <motion.div style={{ x: moveX, y: moveY }} className="absolute inset-0 z-20 flex items-center justify-center">
        <motion.div
          className={cn(
            'relative rounded-full transition-all duration-300',
            isHit
              ? 'h-22 w-22 scale-105 bg-indigo-700 md:h-36 md:w-36'
              : 'dark:bg-background bg-foreground h-20 w-20 scale-100 md:h-34 md:w-34',
          )}
        >
          <div
            className={cn(
              'absolute top-[15%] left-[15%] rounded-full bg-white/40 transition-all duration-300',
              isHit ? 'h-2/5 w-2/5' : 'h-1/5 w-1/5',
            )}
          />

          <div
            className={cn(
              'absolute right-[15%] bottom-[15%] rounded-full bg-white/40 transition-all duration-300',
              isHit ? 'h-3/5 w-3/5 opacity-100' : 'h-0 w-0 opacity-0',
            )}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
