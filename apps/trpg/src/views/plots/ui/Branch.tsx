// TabsComponent.tsx
import { AnimatePresence, motion } from 'motion/react';
// AnimatePresence 추가
import React from 'react';
import { IconButton, TextInput } from '@repo/ui';
import { cn } from '@repo/utils';
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';

interface BranchProps {
  node: any;
  editor: any;
  updateAttributes: (attrs: any) => void;
  getPos: any;
}

const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 1,
};

export const Branch = ({ node, editor, getPos }: BranchProps) => {
  const isEditable = editor.isEditable;
  const activeBranchItemIndex = Math.max(
    0,
    node.content.content.findIndex((branchItem: any) => branchItem.attrs.isActive),
  );

  // 브랜치 아이템 선택 로직
  const selectBranchItem = (index: number) => {
    if (typeof getPos !== 'function') return;

    const { tr } = editor.state;
    const startPos = getPos();
    let currentPos = startPos + 1;

    node.content.forEach((child: any, offset: number, idx: number) => {
      tr.setNodeMarkup(currentPos, undefined, {
        ...child.attrs,
        isActive: idx === index,
      });
      currentPos += child.nodeSize;
    });

    // 중요: 에디터에 포커스를 주면서 트랜잭션을 실행해야 즉시 반영됩니다.
    editor.view.dispatch(tr);
    editor.commands.focus();
  };

  const updateBranchItemTitle = (index: number, newTitle: string) => {
    if (typeof getPos !== 'function') return;
    const { tr } = editor.state;
    const pos = getPos();
    let currentPos = pos + 1;

    node.content.forEach((child: any, idx: number) => {
      if (idx === index) {
        tr.setNodeMarkup(currentPos, undefined, {
          ...child.attrs,
          title: newTitle,
        });
      }
      currentPos += child.nodeSize;
    });

    editor.view.dispatch(tr);
  };

  const addBranchItemNode = () => {
    if (typeof getPos !== 'function') return;

    const pos = getPos();
    const nextIndex = node.content.childCount; // 0-based index

    editor
      .chain()
      .focus()
      // 1. 기존 모든 탭의 isActive를 false로 만듦 (위의 selectBranchItem 로직 활용 권장)
      // 2. 새 노드 삽입 (이때 isActive: true로 삽입)
      .insertContentAt(pos + node.nodeSize - 1, {
        type: 'branchItem',
        attrs: { title: `Branch ${nextIndex + 1}`, isActive: true },
        content: [{ type: 'paragraph', content: [{ type: 'text', text: `새로운 탭 내용입니다.` }] }],
      })
      .run();

    // 삽입 후 다시 한 번 상태 정리 (필요시)
    setTimeout(() => selectBranchItem(nextIndex), 0);
  };

  const removeBranchItem = (index: number) => {
    if (typeof getPos !== 'function') return;
    if (node.content.childCount <= 1) {
      alert('최소 하나의 탭은 유지되어야 합니다.');
      return;
    }

    const { tr } = editor.state;
    const pos = getPos();
    let currentPos = pos + 1;
    let targetPos = -1;
    let targetSize = 0;

    node.content.forEach((child: any, offset: number, idx: number) => {
      if (idx === index) {
        targetPos = currentPos;
        targetSize = child.nodeSize;
      }
      currentPos += child.nodeSize;
    });

    if (targetPos !== -1) {
      tr.delete(targetPos, targetPos + targetSize);

      // 삭제된 탭이 활성 탭이었다면, 다른 탭 활성화
      if (index === activeBranchItemIndex) {
        const nextActiveIndex = index === 0 ? 0 : index - 1;
        editor.view.dispatch(tr);
        setTimeout(() => {
          selectBranchItem(nextActiveIndex);
        }, 0);
        return;
      }

      editor.view.dispatch(tr);
    }
  };

  return (
    <NodeViewWrapper className="border-primary my-12 overflow-hidden rounded-xl border border-dashed bg-white shadow-sm">
      <motion.div
        layout
        className="bg-primary-50 border-primary relative flex flex-wrap items-center gap-1 border-b border-dashed p-1"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {node.content.content.map((branchItem: any, index: number) => {
            const isActive = index === activeBranchItemIndex;
            const itemKey = branchItem.attrs.id || `branch-${index}`;

            return (
              <motion.div
                key={itemKey}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  width: 0,
                  transition: { duration: 0.2, ease: 'easeInOut' },
                }}
                transition={springTransition as any}
                className={cn(
                  'group relative flex items-center overflow-hidden rounded-lg',
                  isActive ? 'bg-white shadow' : 'hover:bg-primary-100',
                )}
              >
                <div className="flex h-9 items-center px-1">
                  {isEditable ? (
                    <>
                      <TextInput
                        value={branchItem.attrs.title || ''}
                        onChange={e => updateBranchItemTitle(index, e.target.value)}
                        onClick={() => selectBranchItem(index)}
                        className={cn(
                          'h-7 max-w-[100px] border-none bg-transparent text-sm transition-all focus:ring-0',
                          isActive ? 'font-bold' : 'font-normal',
                        )}
                      />
                      <IconButton
                        icon="close"
                        size="sm"
                        variant="clear"
                        aria-label="탭 삭제"
                        onClick={e => {
                          e.stopPropagation();
                          removeBranchItem(index);
                        }}
                        className="ml-[-4px] opacity-0 group-hover:opacity-100"
                      />
                    </>
                  ) : (
                    <button onClick={() => selectBranchItem(index)} className="px-4 text-sm font-medium">
                      {branchItem.attrs.title}
                    </button>
                  )}
                </div>

                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="bg-primary-600 absolute right-0 bottom-0 left-0 h-[2px]"
                    transition={springTransition as any}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* 추가 버튼 */}
        {editor.isEditable && (
          <motion.div layout>
            <IconButton icon="add" size="sm" variant="clear" aria-label="탭 추가" onClick={addBranchItemNode} />
          </motion.div>
        )}
      </motion.div>

      {/* 본문 영역 */}
      <div className="relative min-h-[100px]">
        <NodeViewContent className="branch-content-area" />
      </div>
    </NodeViewWrapper>
  );
};

export const BranchItem = ({ node }: { node: any }) => {
  const isActive = node.attrs.isActive;

  return (
    <NodeViewWrapper
      className={cn(
        'branch-item-panel',
        // isActive가 아닐 때만 렌더링에서 제외하되,
        // Tiptap이 관리할 수 있도록 최소한의 공간은 유지하거나
        // 혹은 명시적인 display 속성을 사용합니다.
      )}
      style={{
        display: isActive ? 'block' : 'none',
        // 혹은 더 안전하게:
        // visibility: isActive ? 'visible' : 'hidden',
        // height: isActive ? 'auto' : 0,
        // overflow: 'hidden'
      }}
    >
      <div className="p-5">
        <NodeViewContent />
      </div>
    </NodeViewWrapper>
  );
};
