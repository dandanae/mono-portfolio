'use client';

import React from 'react';
import { tv, VariantProps } from 'tailwind-variants';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { cn } from '@repo/utils';

const COLOR_MAP = {
  red: '#ff0000',
  gray: '#808080',
} as const;

const deco = tv({
  base: 'transition-colors',
  variants: {
    color: {
      red: 'text-[#ff0000]',
      gray: 'text-[#808080]',
    },
    background: {
      true: 'm-auto w-fit bg-black px-2 py-0.5 font-bold',
    },
  },
});

type DecoVariants = VariantProps<typeof deco>;
interface DecoDescProps extends DecoVariants {
  descs: string[];
  shadow?: boolean;
  kp?: boolean;
}

const Desc = ({ descs, ...props }: DecoDescProps) => {
  return (
    <>
      {descs.map((desc, idx) => (
        <DescItem
          key={`${desc.slice(0, 10)}-${idx}`}
          desc={desc}
          color={props.color}
          shadow={props.shadow}
          background={props.background}
          kp={props.kp}
        />
      ))}
    </>
  );
};

export default Desc;

const DescItem = ({ desc, ...props }: Omit<DecoDescProps, 'descs'> & { desc: string }) => {
  const { copy, isCopied, formatText, injectStyle } = usePlot();
  const css = [
    `color: ${COLOR_MAP[props.color ?? 'gray']}`,
    props.shadow ? `text-shadow: 0 0 3px ${COLOR_MAP[props.color ?? 'gray']}4d; font-weight: normal;` : '',
    props.background ? 'background-color: #000000; padding: 2px 8px; font-weight: bold;' : '',
  ];

  const kpCss = props.kp
    ? ['opacity: 0.5', 'font-weight: normal', 'font-size: 12px;', 'color: #808080;', 'font-family: SUIT Variable;']
    : [];

  const text = () => {
    const hasCustomStyle = !!props.color || !!props.background || !!props.shadow;

    if (hasCustomStyle) {
      return `/desc [${desc}](#" style="${injectStyle(css)}")`;
    }

    if (props.kp) {
      return `/desc [${desc}](" style="${injectStyle(kpCss)}")`;
    }

    return `/desc ${desc}`;
  };

  return (
    <button
      type="button"
      aria-label={`본문 복사 ${desc}`}
      onClick={() => copy(text())}
      className="hover-ring focus-ring group relative block w-full active:scale-95"
    >
      <CopyWrapper isCopied={isCopied}>
        <span
          dangerouslySetInnerHTML={{ __html: formatText(desc) }}
          className={cn('py-1 leading-loose', deco(props), props.kp && 'font-sans text-xs opacity-50')}
          style={{
            textShadow: props.shadow ? `0 0 5px ${COLOR_MAP[props.color ?? 'gray']}80` : undefined,
          }}
        />
      </CopyWrapper>
    </button>
  );
};
