import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Dice } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dice: {
      toggleDice: () => ReturnType;
    };
  }
}

export const DiceNode = Node.create({
  name: 'dice',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="dice"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'dice' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Dice as any);
  },

  addCommands() {
    return {
      toggleDice:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph');
        },
    };
  },
});
