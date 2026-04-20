'use client';
import React from 'react';
import { CopyWrapper } from '@/components/shared';
import { usePlot } from '@/hooks';

const Message = ({ messages }: { messages: string[] }) => {
  return (
    <div className="my-6 flex flex-col gap-2">
      {messages.map((message, idx) => (
        <MessageItem key={`${message.slice(0, 10)}-${idx}`} message={message} />
      ))}
    </div>
  );
};

export default Message;

const MessageItem = ({ message }: { message: string }) => {
  const { copy, isCopied } = usePlot();

  return (
    <button
      type="button"
      aria-label={`메시지 복사 ${message}`}
      onClick={() => copy(`/desc [${message}](#" class="msg")`)}
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
        {message}
      </CopyWrapper>
    </button>
  );
};
