import React from 'react';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import CopyWrapper from './CopyWrapper';
import { usePlot } from '../usePlot';

interface MessageProps {
  node: any;
  editor: any;
}

const Message = ({ node, editor }: MessageProps) => {
  const isEditable = editor.isEditable;
  const { copy, isCopied } = usePlot();

  if (isEditable) {
    return (
      <NodeViewWrapper>
        <div className="relative m-auto my-6 w-fit max-w-[250px] rounded-[20px] bg-[#E5E5EA] px-[18px] py-[8px] text-left font-sans text-sm text-black">
          <span
            aria-hidden
            className="absolute bottom-0 -left-[9px] h-[14px] w-[17px] border-r-8 border-[#E5E5EA]"
            style={{ borderBottomRightRadius: '14px 7px' }}
          />
          <NodeViewContent />
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper>
      <button
        type="button"
        aria-label={`메시지 복사 ${node.textContent}`}
        onClick={() => copy(`/desc [${node.textContent}](#" class="msg")`)}
        className="focus-ring hover-ring w-full select-none active:scale-95"
      >
        <CopyWrapper
          isCopied={isCopied}
          className="relative m-auto max-w-[250px] rounded-[20px] bg-[#E5E5EA] px-[18px] py-[8px] text-left font-sans text-sm text-black"
        >
          <span
            aria-hidden
            className="absolute bottom-0 -left-[9px] h-[14px] w-[17px] border-r-8 border-[#E5E5EA]"
            style={{ borderBottomRightRadius: '14px 7px' }}
          />
          <NodeViewContent />
        </CopyWrapper>
      </button>
    </NodeViewWrapper>
  );
};

export default Message;
