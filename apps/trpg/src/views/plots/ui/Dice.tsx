import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlotAtoms } from '../plot.atom';
import { usePlot } from '../usePlot';

interface DiceProps {
  node: any;
  editor: any;
}

const Dice = ({ node, editor }: DiceProps) => {
  const isEditable = editor.isEditable;
  const { primaryColor, secondaryColor } = usePlotAtoms();
  const { copy, isCopied, injectStyle } = usePlot();

  const css = [
    'display: inline-block',
    'border-radius: 9999px',
    'padding: 5px 20px',
    'font-weight: 700',
    'color: #ffffff',
    'font-family: SUIT Variable',
    `background-image: linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
  ];

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div
          className="mx-auto my-12 flex w-fit items-center justify-center rounded-full px-4 py-1 font-sans text-sm text-white"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          <span className="select-none">✦</span>
          <NodeViewContent className="mx-2 inline" />
          <span className="select-none">✦</span>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-6">
      <CopyWrapper
        isCopied={isCopied}
        onClick={() => copy(`/desc [✦ ${node.textContent} ✦](#" style="${injectStyle(css)}`)}
      >
        <span
          className="rounded-full px-4 py-1 font-sans text-sm text-white"
          style={{
            background: `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`,
          }}
        >
          ✦ {node.textContent} ✦
        </span>
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Dice;
