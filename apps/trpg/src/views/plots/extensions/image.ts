import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Image } from '../ui';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      insertImage: () => ReturnType;
    };
  }
}

export const ImageNode = Node.create({
  name: 'image',
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
        tag: 'div[data-type="image"]',
        getAttrs: dom => ({
          title: dom.getAttribute('title') ?? '',
          url: dom.getAttribute('url') ?? '',
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'image' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Image as any);
  },

  addCommands() {
    return {
      insertImage:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});
