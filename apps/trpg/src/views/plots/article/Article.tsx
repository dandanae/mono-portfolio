'use client';

import { motion } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { AlertDialog, Button, IconButton, TextInput } from '@repo/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { usePlotAtoms, useScrollAtoms } from '../plot.atom';
import { ScenarioFormValues } from '../plot.schema';
import { deletePlot, getPlot, updatePlot } from '../plot.service';
import { ScrollWrapper, Title } from '../ui';
import { replaceJosa, replaceJson } from '../useJosa';

const Article = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { scrollPercent } = useScrollAtoms();
  const { kpc, setKpc, pc, setPc, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = usePlotAtoms();
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const { data: plot } = useQuery({
    queryKey: ['plot', id],
    queryFn: () => getPlot(id as string),
    enabled: !!id,
  });

  const editor = useEditor({
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
    content: plot?.content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base focus:outline-none h-full mx-auto text-center',
      },
    },
    editable: false,
  });

  const { mutate: updatePlotMutation, isPending: isUpdatePending } = useMutation({
    mutationFn: async (data: ScenarioFormValues) => {
      return await updatePlot(id as string, data);
    },
    onSuccess: () => {
      toast.success('시나리오를 공개했어요');
      queryClient.invalidateQueries({ queryKey: ['plot', id] });
    },
    onError: () => {
      toast.error('시나리오 공개 상태 변경에 실패했어요');
    },
  });

  const { mutate: deletePlotMutation, isPending: isDeletePending } = useMutation({
    mutationFn: async () => {
      return await deletePlot(id as string);
    },
  });

  const handleShared = () => {
    if (!plot) {
      toast.error('시나리오를 찾을 수 없어요');
      return;
    }

    updatePlotMutation({
      ...plot,
      title: plot.title,
      writer: plot.writer,
      line: plot.line,
      authorId: plot.authorId,
      content: plot.content,
      shared: !plot.shared,
    });
  };

  const handleDelete = () => {
    if (!plot) {
      toast.error('시나리오를 찾을 수 없어요');
      return;
    }

    deletePlotMutation();
    router.push('/');
  };

  useEffect(() => {
    if (plot?.content && editor) {
      const processedContent =
        typeof plot.content === 'string' ? replaceJosa(plot.content, kpc, pc) : replaceJson(plot.content, kpc, pc);

      if (editor.getHTML() !== processedContent) {
        queueMicrotask(() => {
          editor.commands.setContent(processedContent);
        });
      }
    }
  }, [plot?.content, editor, kpc, pc]);

  return (
    <UpContainer isFirst={isFirstRender} className="relative ml-0 w-full md:ml-18">
      <div className="bg-background/60 absolute top-0 right-0 left-0 z-50 flex h-24 items-center px-4 py-2 shadow shadow-slate-200 backdrop-blur dark:shadow-slate-700">
        <motion.div variants={upItemVariants} className="mx-auto flex h-10 w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <IconButton icon="arrow_back" size="lg" color="light" aria-label="뒤로가기" onClick={() => router.back()} />
            <h2 className="mona10x12 w-full max-w-24 truncate text-2xl font-bold md:max-w-64">{plot?.title}</h2>
            <p>{scrollPercent}%</p>
          </div>
          <div className="flex gap-2">
            <AlertDialog
              title="시나리오 삭제"
              description="정말로 시나리오를 삭제하시겠어요? 이 작업은 되돌릴 수 없어요."
              actionLabel="시나리오 삭제"
              actionLoading={isDeletePending}
              onAction={handleDelete}
            >
              <Button color="danger" fill="clear">
                <span className="mona10x12 hidden! md:block!">삭제</span>
                <span className="material-symbols-rounded block! text-lg! md:hidden!">delete</span>
              </Button>
            </AlertDialog>

            <Button as="a" href={`/write/${id}`} color="primary" fill="clear">
              <span className="mona10x12 hidden! md:block!">수정</span>
              <span className="material-symbols-rounded block! text-lg! md:hidden!">edit</span>
            </Button>
            <Button
              color="primary"
              fill="clear"
              icon={plot?.shared ? 'lock_open_right' : 'lock'}
              loading={isUpdatePending}
              onClick={handleShared}
            >
              <span className="mona10x12 hidden! md:block!">
                {plot?.shared ? '비공개 포스트로 변경' : '공개 포스트로 변경'}
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
      <motion.main
        variants={upItemVariants}
        className="relative container mx-auto flex h-[calc(100vh-6rem)] max-w-2xl flex-col gap-2"
      >
        <ScrollWrapper className="no-scroll flex-1 overflow-y-auto px-4 py-28">
          <div className="mona10x12 my-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-2">
            <TextInput label="KPC 이름" value={kpc} onChange={e => setKpc(e.target.value)} />
            <TextInput label="PC 이름" value={pc} onChange={e => setPc(e.target.value)} />
            <div className="relative">
              <TextInput label="기본색" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
              <div className="absolute top-0 right-1 h-5 w-5 rounded-md" style={{ backgroundColor: primaryColor }} />
            </div>
            <div className="relative">
              <TextInput label="보조색" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} />
              <div className="absolute top-0 right-1 h-5 w-5 rounded-md" style={{ backgroundColor: secondaryColor }} />
            </div>
          </div>
          <h3 className="mona10x12 font-medium whitespace-pre-wrap">{plot?.info}</h3>
          <Title title={plot?.title ?? ''} writer={plot?.writer ?? ''} line={plot?.line ?? ''} />

          <EditorContent editor={editor} className="font-paperlogy min-h-full" />
        </ScrollWrapper>
      </motion.main>
    </UpContainer>
  );
};

export default Article;
