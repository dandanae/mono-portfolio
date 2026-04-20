import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';
import { IconButton } from '@repo/ui';

const Music = ({ title, src }: { title: string; src: string }) => {
  const { copy, isCopied } = usePlot();

  return (
    <CopyWrapper isCopied={isCopied} className="my-6 flex items-center justify-center gap-2">
      <IconButton icon="music_note" variant="border" aria-label="노래 제목 복사" onClick={() => copy(title)} />
      <span aria-hidden className="text-sm font-bold">
        ˗ˏˋ ꒰
      </span>
      <span className="text-sm font-bold">{title}</span>
      <span aria-hidden className="text-sm font-bold">
        ꒱ ˎˊ˗
      </span>

      <IconButton icon="link" variant="border" aria-label="노래 링크 복사" onClick={() => copy(src)} />
    </CopyWrapper>
  );
};

export default Music;
