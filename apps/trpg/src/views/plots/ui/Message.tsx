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
        <div className="relative m-auto my-12 w-fit max-w-[250px] rounded-[20px] bg-[#E5E5EA] px-[18px] py-[8px] text-left font-sans text-sm text-black">
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
      <CopyWrapper
        isCopied={isCopied}
        onClick={() => copy(`/desc [${node.textContent}](#" class="msg")`)}
        className="relative m-auto my-12 w-fit max-w-[250px] rounded-[20px] bg-[#E5E5EA] px-[18px] py-[8px] text-left font-sans text-sm text-black"
      >
        <span
          aria-hidden
          className="absolute bottom-[-8px] -left-[28px] h-[14px] w-[17px] border-r-8 border-[#E5E5EA]"
          style={{ borderBottomRightRadius: '14px 7px' }}
        />
        <NodeViewContent />
      </CopyWrapper>
    </NodeViewWrapper>
  );
};

export default Message;
