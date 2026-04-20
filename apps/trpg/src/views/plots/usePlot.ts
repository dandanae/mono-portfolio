'use client';
import { useState } from 'react';

export const usePlot = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  const formatText = (text: string) => {
    const formattedText = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return formattedText
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/``([^`]+)``/g, '<code class="bg-slate-100 px-1 rounded">$1</code>');
  };

  const injectStyle = (styles: string[]) => {
    const css = ['text-decoration: none', 'cursor: text', 'font-style: normal', ...styles];
    return css.join('; ');
  };

  return { copy, isCopied, formatText, injectStyle };
};
