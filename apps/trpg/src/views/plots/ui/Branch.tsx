// TabsComponent.tsx
import { motion } from 'framer-motion';
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
    const pos = getPos();
    let currentPos = pos + 1;

    node.content.forEach((child: any, offset: number, idx: number) => {
      tr.setNodeMarkup(currentPos, undefined, {
        ...child.attrs,
        isActive: idx === index,
      });
      currentPos += child.nodeSize;
    });

    editor.view.dispatch(tr);
  };

  // 브랜치 아이템 제목 수정 로직 추가
  const updateBranchItemTitle = (index: number, newTitle: string) => {
    if (typeof getPos !== 'function') return;
    const { tr } = editor.state;
    const pos = getPos();
    let currentPos = pos + 1;

    node.content.forEach((child: any, offset: number, idx: number) => {
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
    editor
      .chain()
      .focus()
      .insertContentAt(getPos() + node.nodeSize - 1, {
        type: 'branchItem',
        attrs: { title: `Branch ${node.content.childCount + 1}`, isActive: false },
        content: [{ type: 'paragraph', content: [{ type: 'text', text: '새로운 탭 내용입니다.' }] }],
      })
      .run();
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

    // 삭제할 노드의 절대 위치 계산
    node.content.forEach((child: any, offset: number, idx: number) => {
      if (idx === index) {
        targetPos = currentPos;
        targetSize = child.nodeSize;
      }
      currentPos += child.nodeSize;
    });

    if (targetPos !== -1) {
      tr.delete(targetPos, targetPos + targetSize);

      // 삭제 후, 만약 삭제된 브랜치 아이템이 활성화 상태였다면 첫 번째 브랜치 아이템을 활성화
      if (index === activeBranchItemIndex) {
        const nextActiveIndex = index === 0 ? 0 : index - 1;
        // 삭제 트랜잭션 이후 위치가 바뀌므로, 다시 순회하거나
        // 간단하게 첫 번째 브랜치 아이템을 활성화하는 등의 처리가 필요할 수 있습니다.
        // 여기서는 안전하게 첫 번째 브랜치 아이템을 활성화하도록 처리합니다.
        // (실제 정교한 로직은 삭제 후 남은 노드들 중 하나에 isActive: true를 주어야 함)
      }

      editor.view.dispatch(tr);
    }
  };

  return (
    <NodeViewWrapper className="border-primary my-6 overflow-hidden rounded-xl border border-dashed bg-white">
      {/* 브랜치 아이템 헤더 */}
      <div className="bg-primary-50 border-primary relative flex flex-wrap items-center border-b border-dashed">
        {node.content.content.map((branchItem: any, index: number) => {
          const isActive = index === activeBranchItemIndex;

          return (
            <div key={index} className={cn('group mona10x12 relative flex items-center px-2 py-1 transition-colors')}>
              {isEditable ? (
                <>
                  <TextInput
                    value={branchItem.attrs.title || ''}
                    onChange={e => updateBranchItemTitle(index, e.target.value)}
                    onClick={() => selectBranchItem(index)}
                    placeholder="브랜치 이름"
                    className={cn(
                      'max-w-24 border-none bg-transparent focus:ring-0',
                      isActive ? 'font-bold' : 'font-normal',
                    )}
                  />
                  <IconButton
                    icon="close"
                    size="sm"
                    variant="clear"
                    aria-label="브랜치 아이템 삭제"
                    onClick={() => removeBranchItem(index)}
                  />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => selectBranchItem(index)}
                  className={cn(
                    'px-4 py-2 text-sm font-medium',
                    isActive ? 'text-primary' : 'text-slate-500 hover:bg-slate-100',
                  )}
                >
                  {branchItem.attrs.title || `Branch ${index + 1}`}
                </button>
              )}

              {/* 2. Framer Motion 언더라인 추가 */}
              {isActive && (
                <motion.div
                  layoutId="activeBranchItemUnderline"
                  className="absolute right-0 bottom-0 left-0 h-[2px] bg-blue-600"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>
          );
        })}

        {editor.isEditable && (
          <IconButton
            icon="add"
            size="sm"
            variant="clear"
            aria-label="브랜치 아이템 추가"
            onClick={addBranchItemNode}
          />
        )}
      </div>

      {/* 브랜치 아이템 본문 영역 */}
      <div className="p-4">
        <NodeViewContent className="branch-content-area" />
      </div>
    </NodeViewWrapper>
  );
};

export const BranchItem = ({ node }: { node: any }) => {
  return (
    <NodeViewWrapper className={`branch-item-panel ${node.attrs.isActive ? 'block' : 'hidden'}`}>
      <NodeViewContent />
    </NodeViewWrapper>
  );
};
