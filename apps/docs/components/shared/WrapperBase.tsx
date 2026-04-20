import React from 'react';
import { tv } from 'tailwind-variants';
import { cn } from '@repo/utils';

type ColorVariant = 'red' | 'amber' | 'lime' | 'blue' | 'slate';

const wrapper = tv({
  slots: {
    base: 'mx-auto my-6 flex max-w-2xl flex-col rounded-2xl border p-4',
    header: 'mb-2 text-lg font-bold',
    content: 'p-6',
  },
  variants: {
    color: {
      red: {
        base: 'border-red-300 bg-red-50/50',
        header: 'text-red-600',
      },
      amber: {
        base: 'border-amber-300 bg-amber-50/50',
        header: 'text-amber-600',
      },
      lime: {
        base: 'border-lime-300 bg-lime-50/50',
        header: 'text-lime-600',
      },
      blue: {
        base: 'border-blue-300 bg-blue-50/50',
        header: 'text-blue-600',
      },
      slate: {
        base: 'border-slate-300 bg-slate-50/50',
        header: 'text-slate-600',
      },
    },
  },
  defaultVariants: {
    color: 'slate',
  },
});

const WrapperBase = ({
  color,
  title,
  children,
  className,
}: {
  color: ColorVariant;
  children: React.ReactNode;
  title?: string;
  className?: string;
}) => {
  const { base, header, content } = wrapper({ color });
  return (
    <div className={cn(base(), className)}>
      {title && <span className={header()}>{title}</span>}
      {children}
    </div>
  );
};

export default WrapperBase;
