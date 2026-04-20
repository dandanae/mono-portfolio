import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { useScenarioAtoms } from '@/stores';

const Divide = ({ title }: { title: string }) => {
  const { copy, isCopied, injectStyle } = usePlot();
  const { primaryColor } = useScenarioAtoms();

  const borderCss = [
    'display: inline-block',
    'margin-top: 12px',
    'margin-bottom: 12px',
    `color: ${primaryColor} !important`,

    'font-style: normal',
  ];

  const titleCss = [
    'margin-top: 12px',
    'margin-bottom: 12px',
    'padding: 0 6px',
    'font-weight: bold',
    `color: ${primaryColor} !important`,

    'font-style: normal',
  ];

  const onClick = async () => {
    const l = `[┈┈┈｡ﾟ•┈୨** ](#" style="${injectStyle(borderCss)}")`;
    const r = `[ **୧┈•ﾟ｡┈┈┈](#" style="${injectStyle(borderCss)}")`;
    const t = `[**${title}**](#" style="${injectStyle(titleCss)}")`;
    const str = `/desc ${l}${t}${r}`;

    copy(str);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`구분선 복사 ${title}`}
      className="focus-ring hover-ring my-6 w-full select-none active:scale-95"
      style={{ color: primaryColor }}
    >
      <CopyWrapper isCopied={isCopied} className="flex items-center justify-center">
        <span aria-hidden>┈┈┈｡ﾟ•┈୨ </span>
        <span className="mx-1.5 font-bold">{title}</span>
        <span aria-hidden> ୧┈•ﾟ｡┈┈┈</span>
      </CopyWrapper>
    </button>
  );
};

export default Divide;
