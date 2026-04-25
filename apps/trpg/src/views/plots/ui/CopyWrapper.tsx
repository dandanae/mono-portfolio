'use client';
import { AnimatePresence, motion } from 'motion/react';
// motion/react 대신 일반적인 경로로 예시 작성
import React, { useState } from 'react';
import { tanglingTransition } from '@/shared/animations';
import { cn } from '@repo/utils';

const CopyWrapper = ({
  isCopied,
  onClick,
  children,
  className,
}: {
  isCopied: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="group hover:border-primary/50 hover:bg-primary/5 relative flex w-full items-center justify-center rounded-xl border border-transparent py-2 transition-all duration-300">
      <motion.button
        onClick={onClick}
        type="button"
        className={cn('relative z-10 flex w-full items-center justify-center outline-none', className)}
        whileTap={{ scaleX: 1.1, scaleY: 0.9 }}
        transition={tanglingTransition as any}
      >
        {/* 내부 콘텐츠 */}
        <div className="relative">
          {children}

          {/* 체크 아이콘 위치 조정 */}
          {isCopied && (
            <motion.span
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 30 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 10, mass: 0.8 }}
              className="absolute top-0 right-0 bottom-0 flex items-center"
            >
              <span className="material-symbols-rounded text-primary text-[18px]!">check_circle</span>
            </motion.span>
          )}
        </div>

        <span className="sr-only" aria-live="polite">
          {isCopied ? '복사되었습니다.' : ''}
        </span>
      </motion.button>
    </div>
  );
};

export default CopyWrapper;
