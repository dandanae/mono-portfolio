import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Message } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    message: {
      toggleMessage: () => ReturnType;
    };
  }
}

export const MessageNode = Node.create({
  name: 'message',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="message"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'message' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Message as any);
  },

  addCommands() {
    return {
      toggleMessage:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph');
        },
    };
  },
});
