import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { Branch, BranchItem } from '../ui';

export const BranchItemNode = Node.create({
  name: 'branchItem',
  group: 'block',
  content: 'block+',
  addNodeView() {
    return ReactNodeViewRenderer(BranchItem);
  },
  addAttributes() {
    return {
      title: { default: 'New Tab' },
      isActive: {
        default: false,
        parseHTML: element => element.getAttribute('data-is-active') === 'true',
        renderHTML: attributes => ({ 'data-is-active': attributes.isActive }),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="branch-item"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'branch-item' }), 0];
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

// 2. 전체 탭 컨테이너 (Parent)
export const BranchNode = Node.create({
  name: 'branch',
  group: 'block',
  content: 'branchItem+',
  selectable: true,
  draggable: true,

  parseHTML() {
    return [{ tag: 'div[data-type="branch"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'branch' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(Branch);
  },
});
