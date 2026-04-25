import React from 'react';
import { TextInput } from '@repo/ui';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlotAtoms } from '../plot.atom';
import { usePlot } from '../usePlot';

interface HandoutProps {
  node: any;
  updateAttributes: (attrs: any) => void;
  editor: any;
}

const WIDTH = 250;
const PADDING_Y = 4;
const PADDING_X = 30;

const Handout = ({ node, updateAttributes, editor }: HandoutProps) => {
  const isEditable = editor.isEditable;
  const { copy, isCopied, injectStyle } = usePlot();
  const { primaryColor } = usePlotAtoms();

  const common = [
    'display: block',
    'margin: auto',
    `width: ${WIDTH - PADDING_X * 2}px`,
    `border: 2px solid ${primaryColor}`,
    'background-color: #ffffff',
    'font-style: normal',
  ];

  const hotCss = [...common, 'border-bottom: none', `padding: 16px ${PADDING_X}px 0px ${PADDING_X}px`];
  const hobCss = [...common, 'border-top: none', `padding: 0 ${PADDING_X}px 16px ${PADDING_X}px`];

  const titleCss = [
    ...common,
    'border-top: none',
    'border-bottom: none',
    `padding: 0 ${PADDING_X}px`,
    'text-align: center',
    'font-weight: bold',
    `color: ${primaryColor} !important`,
  ];

  const contentCss = [
    ...common,
    'border-top: none',
    'border-bottom: none',
    `padding: ${PADDING_Y}px ${PADDING_X}px`,
    'font-family: SUIT Variable',
    'font-size: 13px',
    'color: #333333',
    'text-align: left',
  ];

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
      } else if (childNode.type.name === 'hardBreak') {
        contentHtml += ' \n';
      } else if (childNode.type.name === 'paragraph') {
        if (contentHtml.length > 0 && !contentHtml.endsWith('\n')) {
          contentHtml += '\n';
        }
      }
    });

    const lines = contentHtml.split('\n');

    if (lines.length > 1 && lines[lines.length - 1] === '') {
      lines.pop();
    }

    const middle = lines
      .map(line => {
        const displayLine = line === '' ? ' ' : line;
        return `[${displayLine}](" style="${injectStyle(contentCss)}")`;
      })
      .join('');

    const tt = `[${node.attrs.title.replace('[', '').replace(']', '') || ' '}](" style="${injectStyle(titleCss)}")`;
    const tt2 = `[┈┈┈┈┈┈┈┈┈](" style="${injectStyle(titleCss)}")`;
    const t = `[ ](" style="${injectStyle(hotCss)}" class="hot")`;
    const b = `[ ](" style="${injectStyle(hobCss)}" class="hob")`;

    return `/desc ${t}${tt}${tt2}${middle}${b}`;
  };

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="mx-auto my-12 flex w-[270px] flex-col items-center">
          <div
            aria-hidden
            className="relative m-auto block w-[270px] border-2 border-b-0 bg-white pt-4"
            style={{ borderColor: primaryColor }}
          >
            <span
              className="absolute top-1 left-1"
              style={{
                borderStyle: 'solid',
                borderWidth: '8px 8px 0px 0px',
                borderColor: `${primaryColor} transparent transparent transparent`,
              }}
            />
          </div>

          <div
            className="block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8"
            style={{ borderColor: primaryColor }}
          >
            <TextInput
              label=""
              value={node.attrs.title}
              onChange={e => {
                const filteredValue = e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9\s]/g, '');

                updateAttributes({ title: filteredValue });
              }}
              className="font-bold"
              placeholder="핸드아웃 제목"
              style={{ color: primaryColor }}
            />
          </div>

          <span
            aria-hidden
            className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 text-center font-bold"
            style={{ borderColor: primaryColor, color: primaryColor }}
          >
            ┈┈┈┈┈┈┈┈┈
          </span>

          <NodeViewContent
            className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 py-1 text-left font-sans text-sm text-[#333333]"
            style={{ borderColor: primaryColor }}
          />

          <div
            aria-hidden
            className="relative m-auto block w-[270px] border-2 border-t-0 bg-white pt-4"
            style={{ borderColor: primaryColor }}
          >
            <span
              className="absolute right-1 bottom-1"
              style={{
                borderStyle: 'solid',
                borderWidth: '0px 0px 8px 8px',
                borderColor: `transparent transparent ${primaryColor} transparent`,
              }}
            />
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <CopyWrapper isCopied={isCopied} onClick={() => copy(text())} className="flex w-[270px] flex-col items-center">
        <span
          aria-hidden
          className="relative m-auto block w-[270px] border-2 border-b-0 bg-white pt-4"
          style={{ borderColor: primaryColor }}
        >
          <span
            className="absolute top-1 left-1"
            style={{
              borderStyle: 'solid',
              borderWidth: '8px 8px 0px 0px',
              borderColor: `${primaryColor} transparent transparent transparent`,
            }}
          />
        </span>
        <span
          className="block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 text-center font-bold"
          style={{ borderColor: primaryColor, color: primaryColor }}
        >
          {node.attrs.title}
        </span>
        {node.textContent.length > 0 && (
          <>
            <span
              aria-hidden
              className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 text-center font-bold"
              style={{ borderColor: primaryColor, color: primaryColor }}
            >
              ┈┈┈┈┈┈┈┈┈
            </span>

            <NodeViewContent
              className="m-auto block w-[270px] border-2 border-t-0 border-b-0 bg-white px-8 py-1 text-left font-sans text-sm text-[#333333]"
              style={{ borderColor: primaryColor }}
            />
          </>
        )}
        <span
          aria-hidden
          className="relative m-auto block w-[270px] border-2 border-t-0 bg-white pt-4"
          style={{ borderColor: primaryColor }}
        >
          <span
            className="absolute right-1 bottom-1"
            style={{
              borderStyle: 'solid',
              borderWidth: '0px 0px 8px 8px',
              borderColor: `transparent transparent ${primaryColor} transparent`,
            }}
          />
        </span>
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Handout;
