import React from 'react';
import { cn } from '@repo/utils';

const CopyWrapper = ({
  isCopied,
  children,
  className,
}: {
  isCopied: boolean;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn('relative m-auto block w-fit', className)}>
      {children}

      {isCopied && (
        <span
          aria-hidden
          className="absolute top-1/2 -right-10 m-auto flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full"
        >
          <span className="material-symbols-rounded text-primary text-[14px]!">check_circle</span>
        </span>
      )}

      <span className="sr-only" aria-live="polite">
        {isCopied ? '복사되었습니다.' : ''}
      </span>
    </span>
  );
};

export default CopyWrapper;
