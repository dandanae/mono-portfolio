'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { useId, useRef, useState } from 'react';
import { cn } from '@repo/utils';
import Desc from './Desc';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

type BranchType = 'main' | 'sub' | 'double' | 'triple';
type BranchData = { label: string; value: React.ReactNode };

const Branch = ({ type = 'main', branches }: { type?: BranchType; branches: BranchData[] }) => {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0); // -1: left, 1: right
  const baseId = useId();
  const prevIndex = useRef<number>(index);

  const handleTabChange = (newIndex: number) => {
    if (newIndex > prevIndex.current) setDirection(1);
    else if (newIndex < prevIndex.current) setDirection(-1);

    prevIndex.current = newIndex;
    setIndex(newIndex);
  };

  return (
    <div
      className={cn(
        'my-6 border-y border-dashed p-6',
        type === 'main' && 'border-slate-300',
        type === 'sub' && 'border-primary-300 bg-primary-100/20',
        type === 'double' && 'border-primary-400 bg-primary-200/20',
        type === 'triple' && 'border-primary-500 bg-primary-300/20',
      )}
    >
      <nav
        role="tablist"
        aria-label={`${type} 분기 목록`}
        className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
      >
        {branches.map((b, i) => {
          const selected = index === i;

          return (
            <button
              key={i}
              id={`${baseId}-tab-${i}`}
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${i}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => handleTabChange(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight') handleTabChange((i + 1) % branches.length);
                if (e.key === 'ArrowLeft') handleTabChange((i - 1 + branches.length) % branches.length);
              }}
              className={cn(
                'focus-ring relative rounded-full px-2 py-1 font-sans transition-colors duration-300 outline-none select-none',
                selected ? 'font-semibold' : 'text-slate-500 hover:text-slate-800',
                type === 'main' ? 'text-sm' : 'text-xs',
                type === 'main' && selected && 'text-primary',
                (type === 'sub' || type === 'double' || type === 'triple') && selected && 'text-white',
              )}
            >
              {/* 배경 슬라이딩 인디케이터 (Layout Animation) */}
              {selected && (
                <motion.div
                  layoutId={`${baseId}-active-pill`}
                  className={cn(
                    'border-primary absolute inset-0 z-0 rounded-full border-2',
                    type === 'main' ? 'border-primary border-2' : 'bg-primary',
                  )}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}

              <span className="relative z-10 flex items-center justify-center">
                <span aria-hidden="true" className="mr-1.5 opacity-70">
                  {selected
                    ? type === 'main'
                      ? '●'
                      : type === 'sub'
                        ? '◆'
                        : type === 'double'
                          ? '■'
                          : '★'
                    : type === 'main'
                      ? '○'
                      : type === 'sub'
                        ? '◇'
                        : type === 'double'
                          ? '□'
                          : '☆'}
                </span>
                {b.label}
              </span>
            </button>
          );
        })}
      </nav>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          id={`${baseId}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${index}`}
          className="border-l-2 border-slate-100 pl-4"
        >
          {branches[index]?.value}
        </motion.div>
      </AnimatePresence>
      <Desc descs={['더 이상 특별한 건 없습니다.']} kp />
    </div>
  );
};

export default Branch;
