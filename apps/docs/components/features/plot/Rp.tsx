'use client';
import React from 'react';
import { CopyWrapper, WrapperBase } from '@/components/shared';
import { usePlot } from '@/hooks';
import { cn } from '@repo/utils';

export const RpWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <WrapperBase color="slate" title="RP" aria-label="Role Play Chat History">
      {children}
    </WrapperBase>
  );
};

type SideVariant = 'left' | 'right';
interface RpLineProps {
  side: SideVariant;
  lines: string[];
  name?: string;
}
export const RpLine = ({ side, lines, name }: RpLineProps) => {
  return (
    <>
      {name && (
        <span className="text-gray-light mx-auto block w-4/5 text-sm font-semibold lg:w-3/5">
          <span
            className={cn('block max-w-4/5', side === 'left' ? 'mr-auto ml-3 text-left' : 'mr-3 ml-auto text-right')}
          >
            {name}
          </span>
        </span>
      )}
      {lines.map((line, idx) => (
        <RpLineItem key={`${line.slice(0, 10)}-${idx}`} side={side} line={line} />
      ))}
    </>
  );
};

const RpLineItem = ({ side, line }: { side: SideVariant; line: string }) => {
  const { copy, isCopied } = usePlot();

  return (
    <button
      type="button"
      aria-label={`복사 ${line}`}
      onClick={() => copy(line)}
      className="focus-ring hover-ring my-1 w-full select-none active:scale-95"
    >
      <span className="mx-auto block w-4/5 lg:w-3/5">
        <CopyWrapper
          isCopied={isCopied}
          className={cn(
            'relative max-w-4/5 rounded-[20px] px-[18px] py-[8px] text-left font-sans text-sm text-black lg:max-w-2/3',
            side === 'left' ? 'mr-auto ml-0 bg-[#E5E5EA]' : 'mr-0 ml-auto bg-[#007aff] text-white',
          )}
        >
          <span
            aria-hidden
            className={cn(
              'absolute bottom-0 h-[14px] w-[17px]',
              side === 'left' ? '-left-[9px] border-r-8 border-[#E5E5EA]' : '-right-[9px] border-l-8 border-[#007aff]',
            )}
            style={side === 'left' ? { borderBottomRightRadius: '14px 7px' } : { borderBottomLeftRadius: '14px 7px' }}
          />
          {line}
        </CopyWrapper>
      </span>
    </button>
  );
};
