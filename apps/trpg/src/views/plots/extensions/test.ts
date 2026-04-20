import { mergeAttributes, Node } from '@tiptap/core';

// 1. 커맨드 타입 정의 (이 부분이 있어야 에러가 사라집니다)
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    alert: {
      toggleAlert: () => ReturnType;
    };
  }
}

export const AlertNode = Node.create({
  name: 'alert',
  group: 'block',
  content: 'inline*',

  addAttributes() {
    return {
      type: {
        default: 'info',
        parseHTML: element => element.getAttribute('data-type'),
        renderHTML: attributes => ({ 'data-type': attributes.type }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-alert]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-alert': '',
        class: 'py-2 px-4 bg-red-100 rounded-md my-2',
      }),
      0,
    ];
  },

  // 2. addCommands 작성 방식 수정
  addCommands() {
    return {
      toggleAlert:
        () =>
        ({ commands }) => {
          // block+ 구조에서는 toggleNode보다 toggleWrap이 더 안정적입니다.
          return commands.toggleWrap(this.name);
        },
    };
  },
});
