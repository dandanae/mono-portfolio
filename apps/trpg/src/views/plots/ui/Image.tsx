'use client';
import { AnimatePresence, motion } from 'motion/react';
import NextImage from 'next/image';
import React from 'react';
import { TextInput, Tooltip } from '@repo/ui';
import { NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlot } from '../usePlot';

interface ImageProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
}

const Image = ({ node, updateAttributes, editor }: ImageProps) => {
  const isEditable = editor.isEditable;
  const { title, url } = node.attrs;

  const { copy, isCopied } = usePlot();

  if (isEditable) {
    return (
      <NodeViewWrapper
        className="border-primary bg-primary-50/20 mona10x12 my-12 rounded-xl border border-dashed px-8 py-4"
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <h2 className="text-primary-800 text-lg font-bold">이미지 정보</h2>
        <div className="mt-8 flex flex-col gap-8 text-left">
          <TextInput label="이미지 설명" value={title} onChange={e => updateAttributes({ title: e.target.value })} />
          <TextInput label="이미지 링크" value={url} onChange={e => updateAttributes({ url: e.target.value })} />

          <AnimatePresence key={url} mode="wait">
            {url && (
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-2 text-sm font-medium text-slate-400">미리보기</p>
                <div className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-slate-300 bg-white p-4">
                  <NextImage src={url} alt="미리보기" className="object-contain" width={500} height={500} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <Tooltip label={title} className="mona10x12">
        <button
          type="button"
          aria-label={`이미지 복사 ${title}`}
          onClick={() => copy(`/desc [${title}](${url})`)}
          className="focus-ring hover-ring relative my-12 w-full select-none"
        >
          <CopyWrapper isCopied={isCopied}>
            <NextImage src={url} alt={title} className="m-auto" width={500} height={500} />
          </CopyWrapper>
        </button>
      </Tooltip>
    </NodeViewWrapper>
  );
};

export default Image;
