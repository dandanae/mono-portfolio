'use client';

import React from 'react';
import { useScrollAtoms } from '@/stores/scrollAtoms';

const SIZE = 38;
const STROKE_WIDTH = 5;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScenarioPercent = ({ className }: { className?: string }) => {
  const { scrollPercent } = useScrollAtoms();
  const offset = CIRCUMFERENCE - (scrollPercent / 100) * CIRCUMFERENCE;

  return (
    <>
      <div className={className}>
        <div
          className="relative flex items-center justify-center"
          style={{ width: SIZE, height: SIZE }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={scrollPercent}
        >
          <svg className="-rotate-90" width={SIZE} height={SIZE}>
            {/* 배경 원 */}
            <circle
              className="text-slate-200/30"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              fill="transparent"
              r={RADIUS}
              cx={SIZE / 2}
              cy={SIZE / 2}
            />
            {/* 진행 원 */}
            <circle
              className="text-primary transition-[stroke-dashoffset] duration-300 ease-out"
              stroke="currentColor"
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="transparent"
              r={RADIUS}
              cx={SIZE / 2}
              cy={SIZE / 2}
            />
          </svg>
          {/* 중앙 텍스트 */}
          <span className="text-gray-light absolute text-[8px] font-medium tracking-tighter">
            {Math.round(scrollPercent)}%
          </span>
        </div>
      </div>
    </>
  );
};

export default ScenarioPercent;
