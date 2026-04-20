'use client';
import { josa } from 'es-hangul';
import { useParams, useRouter } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
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

const Article = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { scrollPercent } = useScrollAtoms();
  const { kpc, setKpc, pc, setPc, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = usePlotAtoms();

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

  const replaceJosa = (text: string, kpc: string, pc: string): string => {
    const applyReplacement = (content: string, targetTag: string, name: string): string => {
      const withJosaRegex = new RegExp(`{{${targetTag}}}([가-힣]+)`, 'gi');

      const processed = content.replace(withJosaRegex, (match, p1) => {
        const targetJosa = josaSelectorMap[p1];
        if (targetJosa) {
          return josa(name, targetJosa as any);
        }
        return name + p1;
      });

      const standaloneRegex = new RegExp(`{{${targetTag}}}`, 'g');
      return processed.replace(standaloneRegex, name);
    };

    const step1 = applyReplacement(text, 'kpc', kpc);
    const step2 = applyReplacement(step1, 'pc', pc);

    return step2;
  };

  const replaceJson = useCallback((node: any, kpc: string, pc: string): any => {
    if (!node) return node;
    if (node.type === 'text' && node.text) {
      return {
        ...node,
        text: replaceJosa(node.text, kpc, pc),
      };
    }

    if (node.content && Array.isArray(node.content)) {
      return {
        ...node,
        content: node.content.map((child: any) => replaceJson(child, kpc, pc)),
      };
    }

    return node;
  }, []);

  useEffect(() => {
    if (plot?.content && editor) {
      const processedContent =
        typeof plot.content === 'string' ? replaceJosa(plot.content, kpc, pc) : replaceJson(plot.content, kpc, pc);

      if (editor.getHTML() !== processedContent) {
        editor.commands.setContent(processedContent);
      }
    }
  }, [plot?.content, editor, kpc, pc, replaceJson]);

  return (
    <div className="relative px-8 md:px-6 md:pl-20">
      <div className="bg-background/60 fixed top-0 right-0 left-0 z-50 h-24 px-4 py-2 shadow shadow-slate-200 backdrop-blur md:px-6 md:pl-24 dark:shadow-slate-700">
        <div className="flex h-10 items-center justify-between">
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
              <Button color="danger" fill="weak">
                <span className="mona10x12 hidden! md:block!">삭제</span>
                <span className="material-symbols-rounded block! text-lg! md:hidden!">delete</span>
              </Button>
            </AlertDialog>

            <Button as="a" href={`/write/${id}`} color="primary" fill="weak">
              <span className="mona10x12 hidden! md:block!">수정</span>
              <span className="material-symbols-rounded block! text-lg! md:hidden!">edit</span>
            </Button>
            <Button
              color="light"
              fill="weak"
              icon={plot?.shared ? 'lock_open_right' : 'lock'}
              loading={isUpdatePending}
              onClick={handleShared}
            >
              <span className="mona10x12 hidden! md:block!">
                {plot?.shared ? '비공개 포스트로 변경' : '공개 포스트로 변경'}
              </span>
            </Button>
          </div>
        </div>

        <p>진행도</p>
      </div>
      <main className="relative container flex h-[calc(100vh-6rem)] flex-col gap-2">
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
          <h3 className="text-lg font-medium whitespace-pre-wrap opacity-70">{plot?.line}</h3>
          <Title title={plot?.title ?? ''} writer={plot?.writer ?? ''} line={plot?.line ?? ''} />

          <EditorContent editor={editor} className="font-paperlogy min-h-full" />
        </ScrollWrapper>
      </main>
    </div>
  );
};

export default Article;

const josaSelectorMap: Record<string, string> = {
  이: '이/가',
  가: '이/가',
  을: '을/를',
  를: '을/를',
  은: '은/는',
  는: '은/는',
  으로: '으로/로',
  로: '으로/로',
  와: '와/과',
  과: '와/과',
  이나: '이나/나',
  나: '이나/나',
  이란: '이란/란',
  란: '이란/란',
  아: '아/야',
  야: '아/야',
  이랑: '이랑/랑',
  랑: '이랑/랑',
  이에요: '이에요/예요',
  이예요: '이에요/예요',
  예요: '이에요/예요',
  에요: '이에요/예요',
  으로서: '으로서/로서',
  로서: '으로서/로서',
  으로써: '으로써/로써',
  로써: '으로써/로써',
  으로부터: '으로부터/로부터',
  로부터: '으로부터/로부터',
  이라: '이라/라',
  라: '이라/라',
};
