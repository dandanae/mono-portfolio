'use client';
import { IconButton, TextInput, Tooltip } from '@repo/ui';
import { NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlot } from '../usePlot';

interface MusicProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
}

const Music = ({ node, updateAttributes, editor }: MusicProps) => {
  const isEditable = editor.isEditable;
  const { title, url } = node.attrs;

  const { copy, isCopied } = usePlot();

  if (isEditable) {
    return (
      <NodeViewWrapper
        className="border-primary bg-primary-50/20 mona10x12 my-6 rounded-xl border border-dashed px-8 py-4"
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <h2 className="text-primary-800 text-lg font-bold">노래 정보</h2>
        <div className="mt-8 flex flex-col gap-8 text-left">
          <TextInput label="곡 제목" value={title} onChange={e => updateAttributes({ title: e.target.value })} />
          <TextInput label="음원 링크" value={url} onChange={e => updateAttributes({ url: e.target.value })} />
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <CopyWrapper isCopied={isCopied} className="mona10x12 my-6 flex items-center justify-center gap-2">
        <Tooltip label="노래 제목 복사" className="mona10x12">
          <IconButton icon="music_note" variant="clear" aria-label="노래 제목 복사" onClick={() => copy(title)} />
        </Tooltip>
        <span aria-hidden className="text-sm font-bold">
          ˗ˏˋ ꒰
        </span>
        <span className="font-bold hover:text-current">{title}</span>
        <span aria-hidden className="text-sm font-bold">
          ꒱ ˎˊ˗
        </span>
        <Tooltip label="노래 링크 복사" className="mona10x12">
          <IconButton icon="link" variant="clear" aria-label="노래 링크 복사" onClick={() => copy(url)} />
        </Tooltip>
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Music;
