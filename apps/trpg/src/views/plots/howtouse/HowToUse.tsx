'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useJoyride } from 'react-joyride';
import { Button, TextInput } from '@repo/ui';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  BranchItemNode,
  BranchNode,
  DescNode,
  DialogNode,
  DiceNode,
  DivideNode,
  HandoutNode,
  ImageNode,
  MessageNode,
  MusicNode,
} from '../extensions';
import { ScrollWrapper, Title, WriteTools } from '../ui';
import { replaceJosa, replaceJson } from '../useJosa';

const steps = [
  { content: '도구를 사용할 수 있어요.', target: '.tools-step' },
  { content: '시나리오 정보를 작성해요.', target: '.info-step' },
  { content: '도구를 이용해 시나리오를 작성할 수 있어요.', target: '.content-step' },
  {
    content: '작성된 내용은 곧바로 확인할 수 있어요.\n클릭하면 복사가 가능해요\nROLL20에 바로 붙여넣어 보세요!',
    target: '.result-step',
  },
  { content: '사용법이 익숙해졌으면 바로 시작해 보세요!', target: '.start-step' },
];

const HowToUse = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>('시나리오 제목');
  const [content, setContent] = useState<any>(null);
  const [writer, setWriter] = useState<string>('시나리오 라이터');
  const [line, setLine] = useState<string>('한 줄 소개 글');
  const [info, setInfo] = useState<string>('시나리오 소개');

  const [kpc, setKpc] = useState<string>('KPC 이름');
  const [pc, setPc] = useState<string>('PC 이름');
  const [primaryColor, setPrimaryColor] = useState<string>('#3b4953');
  const [secondaryColor, setSecondaryColor] = useState<string>('#5a7863');

  const { controls, on, Tour } = useJoyride({
    continuous: true,
    steps,
    run: true,
    scrollToFirstStep: true,
  });

  useEffect(() => {
    controls.open();
  }, [controls]);

  useEffect(() => {
    return on('tour:end', () => {
      console.log('Tour finished!');
    });
  }, [on]);

  const tryEditor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      MusicNode,
      DescNode,
      ImageNode,
      DialogNode,
      DiceNode,
      DivideNode,
      HandoutNode,
      MessageNode,
      BranchNode,
      BranchItemNode,
    ],
    content: ``,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base focus:outline-none h-full mx-auto text-center',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    },
  });

  const resultEditor = useEditor({
    extensions: [
      StarterKit,
      Subscript,
      Superscript,
      MusicNode,
      DescNode,
      ImageNode,
      DialogNode,
      DiceNode,
      DivideNode,
      HandoutNode,
      MessageNode,
      BranchNode,
      BranchItemNode,
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base focus:outline-none h-full mx-auto text-center',
      },
    },
    editable: false,
  });

  useEffect(() => {
    if (content && resultEditor) {
      const processedContent =
        typeof content === 'string' ? replaceJosa(content, kpc, pc) : replaceJson(content, kpc, pc);

      if (resultEditor.getHTML() !== processedContent) {
        window.requestAnimationFrame(() => {
          resultEditor.commands.setContent(processedContent);
        });
      }
    }
  }, [content, resultEditor, kpc, pc]);

  return (
    <div className="container mx-auto flex w-full max-w-5xl gap-4">
      {Tour}

      <Button onClick={() => router.push('/write')} className="start-step fixed right-4 bottom-4 z-99">
        시나리오 작성하러 가기
      </Button>
      <div className="no-scroll relative flex h-screen w-1/2 flex-col overflow-y-auto px-6">
        <div className="bg-background/60 tools-step sticky top-0 right-0 left-0 z-50 h-16 px-4 py-2 shadow shadow-slate-200 backdrop-blur-sm dark:shadow-slate-700">
          {tryEditor && <WriteTools editor={tryEditor} />}
        </div>

        <div className="mona10x12 relative container mx-auto my-6 flex max-w-4xl flex-1 flex-col px-4 md:px-6">
          <div className="info-step flex flex-col">
            <input
              type="text"
              placeholder="제목"
              className="w-full px-4 text-2xl font-bold outline-none"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div className="relative w-full">
              <input
                type="text"
                placeholder="시나리오 라이터"
                value={writer}
                onChange={e => setWriter(e.target.value)}
                className="w-full pr-4 pl-8 outline-none"
              />
              <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm uppercase">w.</span>
            </div>
            <input
              type="text"
              placeholder="한 줄 소개 글"
              value={line}
              onChange={e => setLine(e.target.value)}
              className="w-full px-4 outline-none"
            />
            <div className="my-4 h-px w-full bg-slate-200 dark:bg-slate-700" />
            <textarea
              placeholder="시나리오 소개"
              rows={3}
              value={info}
              onChange={e => setInfo(e.target.value)}
              className="w-full resize-none overflow-hidden rounded-xl px-4 outline-none"
              onInput={e => {
                (e.target as HTMLTextAreaElement).style.height = 'auto';
                (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight + 'px';
              }}
            />
          </div>
          <EditorContent editor={tryEditor} className="font-paperlogy content-step h-full [&_.tiptap]:h-full" />
        </div>
      </div>
      <div className="no-scroll relative flex h-screen w-1/2 flex-col overflow-y-auto px-6">
        <main className="relative container flex h-[calc(100vh-6rem)] flex-col gap-2">
          <div className="result-step absolute top-0 right-0 left-0 h-1/2" />
          <ScrollWrapper className="no-scroll flex-1 overflow-y-auto px-4">
            <div className="mona10x12 my-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
              <TextInput label="KPC 이름" value={kpc} onChange={e => setKpc(e.target.value)} />
              <TextInput label="PC 이름" value={pc} onChange={e => setPc(e.target.value)} />
              <div className="relative">
                <TextInput label="기본색" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
                <div className="absolute top-0 right-1 h-5 w-5 rounded-md" style={{ backgroundColor: primaryColor }} />
              </div>
              <div className="relative">
                <TextInput label="보조색" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} />
                <div
                  className="absolute top-0 right-1 h-5 w-5 rounded-md"
                  style={{ backgroundColor: secondaryColor }}
                />
              </div>
            </div>
            <h3 className="mona10x12 font-medium whitespace-pre-wrap">{info}</h3>
            <Title title={title} writer={writer} line={line} />

            <EditorContent editor={resultEditor} className="font-paperlogy min-h-full" />
          </ScrollWrapper>
        </main>
      </div>
    </div>
  );
};

export default HowToUse;
