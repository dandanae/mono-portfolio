import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlotAtoms } from '../plot.atom';
import { usePlot } from '../usePlot';

interface DivideProps {
  node: any;
  editor: any;
}

const Divide = ({ node, editor }: DivideProps) => {
  const { copy, isCopied } = usePlot();
  const isEditable = editor.isEditable;
  const { primaryColor } = usePlotAtoms();

  const borderCss = [
    'display: inline-block',
    'margin-top: 12px',
    'margin-bottom: 12px',
    `color: ${primaryColor} !important`,
    'font-style: normal',
  ].join('; ');

  const titleCss = [
    'margin-top: 12px',
    'margin-bottom: 12px',
    'padding: 0 6px',
    'font-weight: bold',
    `color: ${primaryColor} !important`,

    'font-style: normal',
  ].join('; ');

  const text = () => {
    const l = `[┈┈┈｡ﾟ•┈୨** ](#" style="${borderCss}")`;
    const r = `[ **୧┈•ﾟ｡┈┈┈](#" style="${borderCss}")`;
    const t = `[**${node.textContent}**](#" style="${titleCss}")`;
    return `/desc ${l}${t}${r}`;
  };

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="my-6 flex items-center justify-center">
          <span aria-hidden className="select-none">
            ┈┈┈｡ﾟ•┈୨
          </span>
          <NodeViewContent className="mx-2 inline font-bold" />
          <span aria-hidden className="select-none">
            ୧┈•ﾟ｡┈┈┈
          </span>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <CopyWrapper isCopied={isCopied} onClick={() => copy(text())} className="my-6 flex items-center justify-center">
        <span aria-hidden>┈┈┈｡ﾟ•┈୨ </span>
        <span className="mx-1.5 font-bold">{node.textContent}</span>
        <span aria-hidden> ୧┈•ﾟ｡┈┈┈</span>
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Divide;
