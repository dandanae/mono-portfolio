'use client';
import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { useScenarioAtoms } from '@/stores';

const CORNER_SIZE = 6;
const BORDER_WIDTH = 4;
const WIDTH = 250;
const PADDING_X = 20;
const PADDING_Y = 5;

const Dialog = ({ lines, memo }: { lines: string[]; memo?: boolean }) => {
  const { copy, isCopied, injectStyle } = usePlot();
  const { primaryColor } = useScenarioAtoms();

  const line = [
    'display: block',
    `width: ${WIDTH - PADDING_X * 2}px`,
    'margin: auto',
    `padding: ${PADDING_Y}px ${PADDING_X}px`,
    'text-align: center',
    'color: #808080 !important',
    'font-weight: normal',
    'font-family: csm',
    'font-style: normal',
  ];

  const left = [
    'display: inline-block',
    `width: ${CORNER_SIZE}px`,
    `height: ${CORNER_SIZE}px;`,
    `border-top: ${BORDER_WIDTH}px solid ${primaryColor}`,
    `border-left: ${BORDER_WIDTH}px solid ${primaryColor}`,
  ];

  const right = [
    'display: inline-block',
    `width: ${CORNER_SIZE}px`,
    `height: ${CORNER_SIZE}px;`,
    `border-right: ${BORDER_WIDTH}px solid ${primaryColor}`,
    `border-bottom: ${BORDER_WIDTH}px solid ${primaryColor}`,
  ];

  const margin = ['display: inline-block', `width: ${WIDTH - CORNER_SIZE * 2}px`, `height: ${CORNER_SIZE}px`];

  const onClick = () => {
    if (memo) {
      const str = `/desc ${lines.map(l => `[${l}](#" class="font-hand")`).join('')}`;
      copy(str);
      return;
    }

    const middle = lines.map(l => `[${l}](#" style="${injectStyle(line)}")`).join('');

    const lt = `[ ](#" style="${injectStyle(left)}")[ ](#" style="${injectStyle(margin)}")`;
    const rb = `[ ](#" style="${injectStyle(margin)}")[ ](#" style="${injectStyle(right)}")`;

    const str = `/desc ${lt}${middle}${rb}`;
    copy(str);
  };

  return (
    <button
      type="button"
      aria-label={`다이얼로그 복사 ${lines.join(' ')}`}
      onClick={onClick}
      className="hover-ring focus-ring my-8 flex w-full cursor-pointer flex-col text-center font-serif active:scale-95"
    >
      <CopyWrapper isCopied={isCopied}>
        {memo ? (
          <>
            {lines.map(line => (
              <span key={line.slice(0, 10)} className="font-hand block bg-white px-8 py-1 text-[18px] leading-relaxed">
                {line}
              </span>
            ))}
          </>
        ) : (
          <>
            <span className="relative m-auto block w-[350px]">
              <span
                aria-hidden
                className="absolute top-0 left-0 h-2.5 w-2.5"
                style={{
                  borderTop: `4px solid ${primaryColor}`,
                  borderLeft: `4px solid ${primaryColor}`,
                }}
              />
            </span>
            {lines.map(line => (
              <span key={line.slice(0, 10)} className="relative m-auto block w-[350px] px-8 py-1 text-[#808080]">
                {line}
              </span>
            ))}
            <span className="relative m-auto block w-[350px]">
              <span
                aria-hidden
                className="absolute right-0 bottom-0 h-2.5 w-2.5"
                style={{
                  borderRight: `4px solid ${primaryColor}`,
                  borderBottom: `4px solid ${primaryColor}`,
                }}
              />
            </span>
          </>
        )}
      </CopyWrapper>
    </button>
  );
};

export default Dialog;
