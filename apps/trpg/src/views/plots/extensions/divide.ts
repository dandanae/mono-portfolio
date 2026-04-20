import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Divide } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    divide: {
      toggleDivide: () => ReturnType;
    };
  }
}

export const DivideNode = Node.create({
  name: 'divide',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="divide"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'divide' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Divide as any);
  },

  addCommands() {
    return {
      toggleDivide:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph');
        },
    };
  },
});
