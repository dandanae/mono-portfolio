import React from 'react';
import { cn } from '@/shared/lib/tiptap-utils';
import { Checkbox } from '@repo/ui';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlotAtoms } from '../plot.atom';
import { usePlot } from '../usePlot';

interface DialogProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
}

const CORNER_SIZE = 6;
const BORDER_WIDTH = 4;
const WIDTH = 250;
const PADDING_X = 20;
const PADDING_Y = 5;

const Dialog = ({ node, updateAttributes, editor }: DialogProps) => {
  const isEditable = editor.isEditable;
  const { memo } = node.attrs;
  const { copy, isCopied, injectStyle } = usePlot();
  const { primaryColor } = usePlotAtoms();

  const line = [
    'display: block',
    `width: ${WIDTH - PADDING_X * 2}px`,
    'margin: auto',
    `padding: ${PADDING_Y}px ${PADDING_X}px`,
    'text-align: center',
    'color: #808080 !important',
    'font-weight: normal',
    'font-family: csm',
    'font-style: normal',
  ];

  const left = [
    'display: inline-block',
    `width: ${CORNER_SIZE}px`,
    `height: ${CORNER_SIZE}px;`,
    `border-top: ${BORDER_WIDTH}px solid ${primaryColor}`,
    `border-left: ${BORDER_WIDTH}px solid ${primaryColor}`,
  ];

  const right = [
    'display: inline-block',
    `width: ${CORNER_SIZE}px`,
    `height: ${CORNER_SIZE}px;`,
    `border-right: ${BORDER_WIDTH}px solid ${primaryColor}`,
    `border-bottom: ${BORDER_WIDTH}px solid ${primaryColor}`,
  ];

  const margin = ['display: inline-block', `width: ${WIDTH - CORNER_SIZE * 2}px`, `height: ${CORNER_SIZE}px`];

  const text = () => {
    let contentHtml = '';

    node.descendants((childNode: any) => {
      if (childNode.isText) {
        let chunk = childNode.text || '';

        childNode.marks?.forEach((mark: any) => {
          if (mark.type.name === 'bold') chunk = `**${chunk}**`;
          if (mark.type.name === 'italic') chunk = `*${chunk}*`;
        });

        contentHtml += chunk;
      } else if (childNode.type.name === 'hardBreak' || childNode.type.name === 'paragraph') {
        if (contentHtml.length > 0 && !contentHtml.endsWith('\n')) {
          contentHtml += '\n';
        }
      }
    });

    const lines = contentHtml.split('\n').filter(line => line.trim() !== '');

    if (memo) {
      const str = `/desc ${lines.map(l => `[${l}](#" class="font-hand")`).join('')}`;
      return str;
    }

    const middle = lines.map(l => `[${l}](#" style="${line}")`).join('');
    const lt = `[ ](#" style="${injectStyle(left)}")[ ](#" style="${margin}")`;
    const rb = `[ ](#" style="${injectStyle(margin)}")[ ](#" style="${injectStyle(right)}")`;

    const str = `/desc ${lt}${middle}${rb}`;
    return str;
  };

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="my-12 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-2 py-4">
          <div className="mona10x12">
            <Checkbox label="메모" checked={memo} onChange={e => updateAttributes({ memo: e.target.checked })} />
          </div>
          <div className="relative min-w-0 flex-1">
            {!memo && (
              <span
                aria-hidden
                className="absolute top-0 left-0 h-2.5 w-2.5"
                style={{
                  borderTop: `4px solid ${primaryColor}`,
                  borderLeft: `4px solid ${primaryColor}`,
                }}
              />
            )}

            <NodeViewContent
              className={cn(
                'w-full max-w-[350px] min-w-[350px]',
                memo
                  ? 'font-hand block bg-white px-8 py-1 text-[18px] leading-relaxed text-black'
                  : 'font-csm relative m-auto block px-8 py-1 text-[#808080]',
              )}
            />

            {!memo && (
              <span
                aria-hidden
                className="absolute right-0 bottom-0 h-2.5 w-2.5"
                style={{
                  borderRight: `4px solid ${primaryColor}`,
                  borderBottom: `4px solid ${primaryColor}`,
                }}
              />
            )}
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-12">
      <CopyWrapper isCopied={isCopied} onClick={() => copy(text())}>
        <div className="relative min-w-0 flex-1">
          {!memo && (
            <span
              aria-hidden
              className="absolute top-0 left-0 h-2.5 w-2.5"
              style={{
                borderTop: `4px solid ${primaryColor}`,
                borderLeft: `4px solid ${primaryColor}`,
              }}
            />
          )}

          <NodeViewContent
            className={
              memo
                ? 'font-hand block bg-white px-8 py-1 text-[18px] leading-relaxed text-black'
                : 'font-csm relative m-auto block w-[350px] px-8 py-1 text-[#808080]'
            }
          />

          {!memo && (
            <span
              aria-hidden
              className="absolute right-0 bottom-0 h-2.5 w-2.5"
              style={{
                borderRight: `4px solid ${primaryColor}`,
                borderBottom: `4px solid ${primaryColor}`,
              }}
            />
          )}
        </div>
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Dialog;
