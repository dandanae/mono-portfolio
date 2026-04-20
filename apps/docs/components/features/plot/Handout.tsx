'use client';
import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { useScenarioAtoms } from '@/stores';

const WIDTH = 250;
const PADDING_Y = 4;
const PADDING_X = 30;

const Handout = ({ title, content }: { title: string; content?: string[] }) => {
  const { copy, isCopied, formatText, injectStyle } = usePlot();
  const { primaryColor } = useScenarioAtoms();

  const common = [
    'display: block',
    'margin: auto',
    `width: ${WIDTH - PADDING_X * 2}px`,
    `border: 2px solid ${primaryColor}`,
    'border-top: none',
    'border-bottom: none',
    'background-color: #ffffff',
    'font-style: normal',
  ];

  const titleCss = [
    ...common,
    `padding: 0 ${PADDING_X}px`,
    'text-align: center',
    'font-weight: bold',
    `color: ${primaryColor} !important`,
  ];
  const contentCss = [
    ...common,
    `padding: ${PADDING_Y}px ${PADDING_X}px`,
    'font-family: SUIT Variable',
    'font-size: 13px',
    'color: #333333',
    'text-align: left',
  ];

  const onClick = async () => {
    const tt = `[${title}](" style="${injectStyle(titleCss)}")`;
    const tt2 = `[┈┈┈┈┈┈┈┈┈](" style="${injectStyle(titleCss)}")`;
    const middle = content?.map(c => `[${c}](" style="${injectStyle(contentCss)}")`).join('');

    const t = `[ ](" class="hot")`;
    const b = `[ ](" class="hob")`;

    const str = content ? `/desc ${t}${tt}${tt2}${middle}${b}` : `/desc ${t}${tt}${b}`;
    copy(str);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`핸드아웃 복사 ${title}`}
      className="hover-ring focus-ring my-6 w-full text-center active:scale-95"
    >
      <CopyWrapper isCopied={isCopied} className="flex w-[270px] flex-col items-center">
        <span
          aria-hidden
          className="relative m-auto block w-[270px] border-2 border-b-0 bg-white pt-4"
          style={{ borderColor: primaryColor }}
        >
          <span
            className="absolute top-1 left-1"
            style={{
              borderStyle: 'solid',
              borderWidth: '8px 8px 0px 0px',
              borderColor: `${primaryColor} transparent transparent transparent`,
            }}
          />
        </span>
        <span
          className="block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 text-center font-bold"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          {title}
        </span>
        {content && (
          <>
            <span
              aria-hidden
              className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 text-center font-bold"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              ┈┈┈┈┈┈┈┈┈
            </span>
            {content.map((c, idx) => {
              const formattedHtml = formatText(c);

              return (
                <span
                  key={`${c.slice(0, 10)}-${idx}`}
                  className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 py-1 text-left font-sans text-sm text-[#333333]"
                  style={{ borderColor: primaryColor }}
                  dangerouslySetInnerHTML={{ __html: formattedHtml }}
                />
              );
            })}
          </>
        )}
        <span
          aria-hidden
          className="relative m-auto block w-[270px] border-2 border-t-0 bg-white pt-4"
          style={{ borderColor: primaryColor }}
        >
          <span
            className="absolute right-1 bottom-1"
            style={{
              borderStyle: 'solid',
              borderWidth: '0px 0px 8px 8px',
              borderColor: `transparent transparent ${primaryColor} transparent`,
            }}
          />
        </span>
      </CopyWrapper>
    </button>
  );
};

export default Handout;
