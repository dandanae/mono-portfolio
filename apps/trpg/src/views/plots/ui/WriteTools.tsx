'use client';
import { motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Tooltip } from '@repo/ui';
import { type Editor } from '@tiptap/react';

const WriteTools = ({ editor }: { editor: Editor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState<{ left: number; right: number }>({ left: 0, right: 0 });

  useEffect(() => {
    if (containerRef.current && dragRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = dragRef.current.scrollWidth;

      setConstraints({
        left: containerWidth - contentWidth - 16,
        right: 0,
      });
    }
  }, []);

  const onWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div ref={containerRef} onWheel={onWheel} className="relative h-12 w-full overflow-hidden">
      <motion.div
        ref={dragRef}
        drag="x"
        dragConstraints={constraints}
        dragElastic={0.1}
        className="flex w-max items-center gap-2 px-1 py-1 whitespace-nowrap active:cursor-grabbing"
      >
        {/* 굵게 / 기울임 */}
        <IconButton
          icon="format_bold"
          size="lg"
          color="light"
          aria-label="굵게"
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <IconButton
          icon="format_italic"
          size="lg"
          color="light"
          aria-label="기울임"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />

        <div className="mx-1 h-6 w-px min-w-px bg-slate-500 dark:bg-slate-600" />

        {/* 이미지 / 노래 */}
        <Tooltip label="이미지" className="mona10x12">
          <IconButton
            icon="image"
            size="lg"
            color="light"
            aria-label="이미지"
            onClick={() => editor.chain().focus().insertImage().run()}
          />
        </Tooltip>
        <Tooltip label="BGM" className="mona10x12">
          <IconButton
            icon="music_note"
            size="lg"
            color="light"
            aria-label="BGM"
            onClick={() => editor.chain().focus().insertMusic().run()}
          />
        </Tooltip>

        <div className="mx-1 h-6 w-px min-w-px bg-slate-500 dark:bg-slate-600" />

        {/* TRPG 툴 */}
        <Tooltip label="본문 — /desc" className="mona10x12">
          <IconButton
            icon="inbox_text"
            size="lg"
            color="light"
            aria-label="본문"
            onClick={() => editor.chain().focus().toggleDesc().run()}
          />
        </Tooltip>
        <Tooltip label="구분선, 소제목" className="mona10x12">
          <IconButton
            icon="horizontal_rule"
            size="lg"
            color="light"
            aria-label="구분선 또는 소제목"
            onClick={() => editor.chain().focus().toggleDivide().run()}
          />
        </Tooltip>
        <Tooltip label="주사위" className="mona10x12">
          <IconButton
            icon="casino"
            size="lg"
            color="light"
            aria-label="구분선 또는 소제목"
            onClick={() => editor.chain().focus().toggleDice().run()}
          />
        </Tooltip>
        <Tooltip label="핸드아웃 — 대사" className="mona10x12">
          <IconButton
            icon="format_quote"
            size="lg"
            color="light"
            aria-label="핸드아웃 대사"
            onClick={() => editor.chain().focus().toggleHandout().run()}
          />
        </Tooltip>
        <Tooltip label="핸드아웃 — 정보" className="mona10x12">
          <IconButton
            icon="article"
            size="lg"
            color="light"
            aria-label="핸드아웃 정보"
            onClick={() => editor.chain().focus().toggleHandout().run()}
          />
        </Tooltip>
        <Tooltip label="메시지" className="mona10x12">
          <IconButton
            icon="chat"
            size="lg"
            color="light"
            aria-label="메시지"
            onClick={() => editor.chain().focus().toggleMessage().run()}
          />
        </Tooltip>
        <Tooltip label="탭" className="mona10x12">
          <IconButton
            icon="tab"
            size="lg"
            color="light"
            aria-label="탭"
            onClick={() => editor.chain().focus().insertBranch().run()}
          />
        </Tooltip>

        <div className="mx-1 h-6 w-px min-w-px bg-slate-500 dark:bg-slate-600" />

        {/* 치환자 / 말줄임표 / 하이픈 */}
        <Tooltip label="KPC 치환자 추가" className="mona10x12">
          <Button
            size="sm"
            color="light"
            aria-label="KPC 삽입"
            onClick={() => editor.chain().focus().insertContent('{{kpc}}').run()}
            className="mona10x12 shrink-0 px-3 font-bold"
          >
            {'{{KPC}}'}
          </Button>
        </Tooltip>
        <Tooltip label="PC 치환자 추가" className="mona10x12">
          <Button
            size="sm"
            color="light"
            aria-label="PC 삽입"
            onClick={() => editor.chain().focus().insertContent('{{pc}}').run()}
            className="mona10x12 shrink-0 px-3 font-bold"
          >
            {'{{PC}}'}
          </Button>
        </Tooltip>
        <Tooltip label="말줄임표 추가" className="mona10x12">
          <Button
            size="sm"
            color="light"
            aria-label="말줄임표"
            onClick={() => editor.chain().focus().insertContent('……').run()}
            className="mona10x12 shrink-0 px-3 font-bold"
          >
            ……
          </Button>
        </Tooltip>
        <Tooltip label="하이픈 추가" className="mona10x12">
          <Button
            size="sm"
            color="light"
            aria-label="하이픈"
            onClick={() => editor.chain().focus().insertContent('—').run()}
            className="mona10x12 shrink-0 px-3 font-bold"
          >
            —
          </Button>
        </Tooltip>
      </motion.div>

      <div className="from-background pointer-events-none absolute top-0 right-0 bottom-0 z-30 h-full w-24 bg-linear-to-l to-transparent" />
    </div>
  );
};

export default WriteTools;
