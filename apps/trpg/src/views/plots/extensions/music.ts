import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Music } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    music: {
      insertMusic: () => ReturnType;
    };
  }
}

export const MusicNode = Node.create({
  name: 'music',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      title: { default: '' },
      url: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="music"]',
        getAttrs: dom => ({
          title: dom.getAttribute('title') ?? '',
          url: dom.getAttribute('url') ?? '',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'music' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Music as any);
  },

  addCommands() {
    return {
      insertMusic:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});
