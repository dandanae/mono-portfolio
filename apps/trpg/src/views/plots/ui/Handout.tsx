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

        // 마크(bold, italic) 처리
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

    // 2. 줄바꿈(\n) 기준으로 쪼개서 각각 스타일 적용
    const lines = contentHtml.split('\n').filter(line => line.trim() !== '');

    const middle = lines.map(line => `[${line}](" style="${injectStyle(contentCss)}")`).join('');

    const tt = `[${node.attrs.title || ''}](" style="${injectStyle(titleCss)}")`;
    const tt2 = `[┈┈┈┈┈┈┈┈┈](" style="${injectStyle(titleCss)}")`;
    const t = `[ ](" style="${injectStyle(hotCss)}" class="hot")`;
    const b = `[ ](" style="${injectStyle(hobCss)}" class="hob")`;

    return lines.length > 0 ? `/desc ${t}${tt}${tt2}${middle}${b}` : `/desc ${t}${tt}${b}`;
  };

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="mx-auto my-6 flex w-[270px] flex-col items-center">
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
              onChange={e => updateAttributes({ title: e.target.value })}
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
      <button
        type="button"
        onClick={() => copy(text())}
        aria-label={`핸드아웃 복사 ${node.textContent}`}
        className="hover-ring focus-ring my-6 w-full text-center active:scale-95"
      >
        <CopyWrapper isCopied={isCopied} className="flex w-[270px] flex-col items-center">
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
      </button>
    </NodeViewWrapper>
  );
};

export default Handout;
