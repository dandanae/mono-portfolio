'use client';
import React from 'react';
import { tv } from 'tailwind-variants';
import { Checkbox } from '@repo/ui';
import { cn } from '@repo/utils';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlot } from '../usePlot';

const deco = tv({
  base: 'transition-colors duration-300',
  variants: {
    gray: {
      true: 'text-[#808080]',
    },
    red: {
      true: 'text-[#ff0000]',
    },
    background: {
      true: 'm-auto w-fit bg-black px-2 py-0.5 font-bold text-[#ff0000]',
    },
  },
});

interface DescProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
}

const Desc = ({ node, updateAttributes, editor }: DescProps) => {
  const isEditable = editor.isEditable;
  const { gray, red, background, shadow, kp } = node.attrs;
  const { injectStyle } = usePlot();

  const css = [
    gray ? `color: #808080;` : '',
    red ? `color: #ff0000;` : '',
    shadow
      ? `color: ${red ? '#ff000d' : '#808080'}; text-shadow: 0 0 3px ${red ? '#ff00004d' : '#8080804d'}; font-weight: normal;`
      : '',
    background ? 'background-color: #000000; padding: 2px 8px; font-weight: bold; color: #ff0000;' : '',
  ].filter(Boolean);

  const kpCss = [
    'opacity: 0.5',
    'font-weight: normal',
    'font-size: 12px;',
    'color: #808080;',
    'font-family: SUIT Variable;',
  ];

  const getLines = () => {
    const lines: any[] = [];
    let currentLine: any[] = [];

    node.content.forEach((child: any) => {
      if (child.type.name === 'hardBreak') {
        lines.push(currentLine);
        currentLine = [];
      } else {
        currentLine.push(child);
      }
    });
    if (currentLine.length > 0) lines.push(currentLine);
    return lines;
  };

  const formatMarkdown = (lineContent: any[]) => {
    let text = '';
    lineContent.forEach(child => {
      let chunk = child.text || '';
      child.marks?.forEach((mark: any) => {
        if (mark.type.name === 'bold') chunk = `**${chunk}**`;
        if (mark.type.name === 'italic') chunk = `*${chunk}*`;
      });
      text += chunk;
    });

    if (gray || background || shadow) return `/desc [${text}](#" style="${injectStyle(css)}")`;
    if (kp) return `/desc [${text}](" style="${injectStyle(kpCss)}")`;
    return `/desc ${text}`;
  };

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="my-12 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 px-2 py-4">
          <div className="mona10x12 flex flex-wrap gap-4">
            <Checkbox
              label="키퍼"
              checked={kp}
              onChange={e => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  updateAttributes({
                    kp: true,
                    gray: false,
                    background: false,
                    shadow: false,
                    red: false,
                  });
                } else {
                  updateAttributes({ kp: false });
                }
              }}
            />
            <Checkbox
              label="그림자"
              checked={shadow}
              onChange={e => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  if (gray || red) {
                    updateAttributes({
                      shadow: true,
                      kp: false,
                      background: false,
                    });
                  } else {
                    updateAttributes({
                      shadow: true,
                      gray: true,
                      kp: false,
                      background: false,
                    });
                  }
                } else {
                  updateAttributes({ shadow: false });
                }
              }}
            />
            <Checkbox
              label="배경+빨강"
              checked={background}
              onChange={e => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  updateAttributes({ background: true, kp: false, shadow: false, gray: false, red: false });
                } else {
                  updateAttributes({ background: false });
                }
              }}
            />
            <Checkbox
              label="글씨 회색"
              checked={gray}
              onChange={e => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  updateAttributes({ gray: true, kp: false, background: false, red: false });
                } else {
                  updateAttributes({ gray: false });
                }
              }}
            />
            <Checkbox
              label="글씨 빨강"
              checked={red}
              onChange={e => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  updateAttributes({ red: true, kp: false, background: false, gray: false });
                } else {
                  updateAttributes({ red: false });
                }
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <NodeViewContent
              className={cn('leading-loose', deco({ gray, red, background }), kp && 'font-sans text-xs opacity-50')}
              style={{
                textShadow: shadow ? `0 0 5px ${red ? '#ff000080' : '#80808080'}` : undefined,
              }}
            />
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  const lines = getLines();

  return (
    <NodeViewWrapper className="flex flex-col">
      {lines.map((line, index) => (
        <DescLine key={`${line}-${index}`} line={line} markdown={formatMarkdown(line)} node={node} />
      ))}
    </NodeViewWrapper>
  );
};

export default Desc;

const DescLine = ({ line, markdown, node }: { line: any[]; markdown: string; node: any }) => {
  const { copy, isCopied } = usePlot();
  const { gray, background, shadow, kp, red } = node.attrs;

  return (
    <CopyWrapper isCopied={isCopied} onClick={() => copy(markdown)}>
      <div
        className={cn(
          'text-center leading-loose',
          deco({ gray, background, red }),
          kp && 'font-sans text-xs opacity-50',
        )}
        style={{ textShadow: shadow ? `0 0 5px #80808080` : undefined }}
      >
        {line.map((n: any, i: number) => (
          <span
            key={`${n.text}-${i}`}
            className={cn(
              n.marks?.some((m: any) => m.type.name === 'bold') ? 'font-bold' : '',
              n.marks?.some((m: any) => m.type.name === 'italic') ? 'italic' : '',
            )}
          >
            {n.text}
          </span>
        ))}
      </div>
    </CopyWrapper>
  );
};
