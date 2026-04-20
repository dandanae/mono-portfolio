import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Dialog } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    dialog: {
      toggleDialog: () => ReturnType;
    };
  }
}

export const DialogNode = Node.create({
  name: 'dialog',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      memo: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="dialog"]',
        getAttrs: dom => ({
          memo: dom.getAttribute('memo') === 'true',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'dialog' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Dialog as any);
  },

  addCommands() {
    return {
      toggleDialog:
        () =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph');
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (this.editor.isActive(this.name)) {
          return this.editor.commands.setHardBreak();
        }
        return false;
      },
    };
  },
});
