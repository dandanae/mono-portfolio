'use client';
import { motion } from 'motion/react';
import React from 'react';

const Template = ({ children }: { children: React.ReactNode }) => {
  const bars = [{ delay: 0.1 }, { delay: 0.3 }, { delay: 0.0 }, { delay: 0.4 }, { delay: 0.2 }];

  const snappyEase = [0.87, 0.05, 0.02, 0.97];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-9999 flex flex-col">
        {bars.map((bar, i) => (
          <div key={i} className="relative h-[20%] w-full overflow-hidden">
            {/* 레이어 1: 밝은 회색 */}
            <motion.div
              initial={{ x: '-101%' }}
              animate={{ x: ['-101%', '0%', '0%', '101%'] }}
              transition={{
                duration: 2.2,
                times: [0, 0.4, 0.7, 1],
                ease: snappyEase,
                delay: bar.delay,
              }}
              className="bg-primary-100 absolute inset-0 z-10"
            />

            {/* 레이어 2: 어두운 회색 */}
            <motion.div
              initial={{ x: '-101%' }}
              animate={{ x: ['-101%', '0%', '0%', '101%'] }}
              transition={{
                duration: 1.8,
                times: [0, 0.4, 0.7, 1],
                ease: snappyEase,
                delay: bar.delay + 0.2,
              }}
              className="bg-primary-200 absolute inset-0 z-20"
            />
          </div>
        ))}
      </div>

      {/* 콘텐츠 등장 타이밍도 바의 멈춤 시간에 맞춰 조정 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.8, // 바가 화면을 가득 채우고 멈춰있을 때쯤 슬그머니 등장 시작
          ease: 'easeOut',
        }}
        className="relative flex h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Template;
