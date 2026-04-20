import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Handout } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    handout: {
      toggleHandout: () => ReturnType;
    };
  }
}

export const HandoutNode = Node.create({
  name: 'handout',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      title: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="handout"]',
        getAttrs: dom => ({
          title: dom.getAttribute('title') ?? '',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'handout' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Handout as any);
  },

  addCommands() {
    return {
      toggleHandout:
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
