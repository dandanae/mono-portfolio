import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Desc } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    desc: {
      toggleDesc: () => ReturnType;
    };
  }
}

export const DescNode = Node.create({
  name: 'desc',
  group: 'block',
  content: 'inline*',
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      gray: { default: false },
      red: { default: false },
      background: { default: false },
      shadow: { default: false },
      kp: { default: false },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="desc"]',
        getAttrs: dom => {
          const d = dom as HTMLElement;
          return {
            gray: d.getAttribute('gray') === 'true',
            background: d.getAttribute('background') === 'true',
            shadow: d.getAttribute('shadow') === 'true',
            kp: d.getAttribute('kp') === 'true',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'desc' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Desc as any);
  },

  addCommands() {
    return {
      toggleDesc:
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
