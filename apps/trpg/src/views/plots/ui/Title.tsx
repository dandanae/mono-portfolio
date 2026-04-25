'use client';
import React from 'react';
import CopyWrapper from './CopyWrapper';
import { usePlotAtoms } from '../plot.atom';
import { usePlot } from '../usePlot';

const BASE = 'text-decoration: none; font-style: normal; cursor: text;';

export const getTitleStyle = ({ primaryColor }: { primaryColor: string }) => {
  const tt = [
    'display: block',
    'margin: auto',
    'width: 200px',
    'padding-top: 70px',
    'font-weight: bold',
    'font-size: 28px',
    'text-align: left',
    'color: #fff',
    '-webkit-getr-select: none',
    'getr-select: none',
    `background-image: linear-gradient(to bottom, ${primaryColor} 99%, #ffffff 1%`,
  ];
  const tb = `display: block; margin: auto; width: 140px; text-align: left; padding-right: 30px; padding-left: 30px; background-color:#ffffff; -webkit-getr-select: none; getr-select: none; ${BASE}`;
  const tb1 = `padding-top: 24px; font-weight: bold; font-size: 18px; color: #000; ${BASE}`;
  const tb2 = `padding-bottom: 24px; font-size: 12px; color: ${primaryColor}; ${BASE}`;
  const tb3 = `font-size: 14px; color: #000; ${BASE}`;
  const tb4 = `padding-top: 24px; padding-bottom: 24px; font-size: 11px; color: #99a1af; ${BASE}`;

  return { tt, tb, tb1, tb2, tb3, tb4 };
};

const Title = ({ title, writer, line }: { title: string; writer: string; line: string }) => {
  const { copy, isCopied, injectStyle } = usePlot();
  const { kpc, pc, primaryColor } = usePlotAtoms();
  const { tt, tb, tb1, tb2, tb3, tb4 } = getTitleStyle({ primaryColor });

  const str = `/desc [${title}](#" style="${injectStyle(tt)}")[${title}](#" style="${tb} ${tb1}")[w. ${writer}](#" style="${tb} ${tb2}")[**KPC**](#" style="${tb} ${tb3}")[${kpc}](#" style="${tb} ${tb3}")[**PC**](#" style="${tb} ${tb3}")[${pc}](#" style="${tb} ${tb3}")[${line}](#" style="${tb} ${tb4}")`;

  return (
    <CopyWrapper
      isCopied={isCopied}
      onClick={() => copy(str)}
      className="flex w-[200px] flex-col items-stretch border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
    >
      <span
        aria-hidden
        className="flex items-end pt-[60px] text-[28px] font-bold text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${primaryColor} 88%, #ffffff 12%)`,
        }}
      >
        {title}
      </span>

      <span className="flex items-end bg-white px-[30px] pt-[24px] text-[18px] font-bold text-black">{title}</span>

      <span className="flex bg-white px-[30px] pb-[24px] text-left! text-[12px]" style={{ color: primaryColor }}>
        w. {writer}
      </span>

      <span className="flex bg-white px-[30px] text-[14px] font-bold text-black">
        <b>KPC</b>
      </span>
      <span className="flex h-[20px] bg-white px-[30px] text-[14px] text-black">{kpc}</span>
      <span className="flex h-[20px] bg-white px-[30px] text-[14px] font-bold text-black">
        <b>PC</b>
      </span>
      <span className="flex h-[20px] bg-white px-[30px] text-[14px] text-black">{pc}</span>

      <div className="flex bg-white px-[30px] py-[24px] text-left text-[11px] text-gray-400">{line}</div>
    </CopyWrapper>
  );
};

export default Title;
