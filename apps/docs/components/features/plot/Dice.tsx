'use client';
import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { useScenarioAtoms } from '@/stores';
import { cn } from '@repo/utils';

const Dice = ({ label, className }: { label: string; className?: string }) => {
  const { copy, isCopied, injectStyle } = usePlot();
  const { primaryColor, secondaryColor } = useScenarioAtoms();

  const styles = [
    'display: inline-block',
    'border-radius: 9999px',
    'padding: 5px 20px',
    'font-weight: 700',
    'color: #ffffff',
    'font-family: SUIT Variable',
    `background-image: linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
  ];

  const css = injectStyle(styles);

  return (
    <button
      type="button"
      aria-label={`주사위 복사 ${label}`}
      onClick={() => copy(`/desc [✦ ${label} ✦](#" style="${css}`)}
      className={cn('focus-ring hover-ring my-6 w-full select-none active:scale-95', className)}
    >
      <CopyWrapper isCopied={isCopied}>
        <span
          className="rounded-full px-4 py-1 font-sans text-sm text-white"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          ✦ {label} ✦
        </span>
      </CopyWrapper>
    </button>
  );
};

export default Dice;
