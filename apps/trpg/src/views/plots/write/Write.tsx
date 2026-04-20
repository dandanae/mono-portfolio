'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth } from '@/shared/lib/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, IconButton, Tooltip } from '@repo/ui';
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
import { type ScenarioFormValues, scenarioSchema } from '../plot.schema';
import { createPlot, getPlot, updatePlot } from '../plot.service';

const Write = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const user = auth.currentUser;

  const { data: plot } = useQuery({
    queryKey: ['plot', id],
    queryFn: () => getPlot(id as string),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<ScenarioFormValues>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: plot
      ? {
          title: plot.title,
          info: plot.info,
          writer: plot.writer,
          line: plot.line,
          authorId: plot.authorId,
          content: plot.content,
          shared: plot.shared ?? false,
        }
      : {
          title: '',
          info: '',
          writer: '',
          line: '',
          authorId: '',
          content: {},
          shared: false,
        },
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
    content: plot?.content ?? '<div data-type="desc">시나리오를 작성해 보세요!</div>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm md:prose-base focus:outline-none h-full mx-auto text-center',
      },
    },
    onUpdate: ({ editor }) => {
      setValue('content', editor.getJSON(), { shouldValidate: true });
    },
  });

  const { mutate: createPlotMutation, isPending: isCreatePending } = useMutation({
    mutationFn: async (data: ScenarioFormValues) => {
      return await createPlot(data);
    },
    onSuccess: id => {
      toast.success('시나리오를 저장했어요');
      router.push(`/article/${id}`);
      queryClient.invalidateQueries({ queryKey: ['plot', id] });
    },
    onError: () => {
      toast.error('시나리오 저장에 실패했어요');
    },
  });

  const { mutate: updatePlotMutation, isPending: isUpdatePending } = useMutation({
    mutationFn: async (data: ScenarioFormValues) => {
      return await updatePlot(id as string, data);
    },
    onSuccess: () => {
      toast.success('시나리오를 수정했어요');
      router.push(`/article/${id}`);
      queryClient.invalidateQueries({ queryKey: ['plot', id] });
    },
    onError: () => {
      toast.error('수정에 실패했어요');
    },
  });

  const onSubmit = (data: ScenarioFormValues) => {
    if (!data.authorId) {
      toast.error('로그인 후 작성할 수 있어요');
      return;
    }
    if (!editor || isCreatePending || isUpdatePending) return;
    if (id) {
      updatePlotMutation({ ...data });
    } else {
      createPlotMutation({ ...data });
    }
  };

  useEffect(() => {
    if (id && plot?.content && editor) {
      setValue('title', plot.title);
      setValue('info', plot.info);
      setValue('writer', plot.writer);
      setValue('line', plot.line);
      setValue('shared', plot.shared ?? false);

      const timer = setTimeout(() => {
        editor.commands.setContent(plot.content);
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [id, plot, editor, setValue]);

  useEffect(() => {
    if (user) {
      setValue('authorId', user.uid);
    }
  }, [user, setValue]);

  if (!editor) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reative no-scroll flex h-screen flex-col overflow-y-auto px-6">
      <div className="bg-background/60 fixed top-0 right-0 left-0 z-50 h-24 px-4 py-2 shadow shadow-slate-200 backdrop-blur-sm dark:shadow-slate-700">
        <div className="flex h-10 items-center justify-between">
          <IconButton icon="arrow_back" size="lg" color="light" aria-label="뒤로가기" onClick={() => router.back()} />
          <div className="flex gap-2">
            <Button color="light" fill="weak" onClick={() => router.back()}>
              사용법
            </Button>
            <Button
              color="primary"
              fill="weak"
              type="submit"
              disabled={isCreatePending || isUpdatePending}
              loading={isCreatePending || isUpdatePending}
            >
              {id ? '수정' : '저장'}
            </Button>
          </div>
        </div>
        <div className="flex h-12 flex-wrap items-center gap-2">
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

          <div className="h-6 w-px bg-slate-500 dark:bg-slate-600" />

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

          <div className="h-6 w-px bg-slate-500 dark:bg-slate-600" />

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
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertContent({
                    type: 'branch',
                    content: [
                      {
                        type: 'branchItem',
                        attrs: { title: '선택지 1' },
                        content: [{ type: 'paragraph', content: [{ type: 'text', text: '결과 내용' }] }],
                      },
                      {
                        type: 'branchItem',
                        attrs: { title: '선택지 2' },
                        content: [{ type: 'paragraph', content: [{ type: 'text', text: '결과 내용' }] }],
                      },
                    ],
                  })
                  .run()
              }
            />
          </Tooltip>

          <div className="h-6 w-px bg-slate-500 dark:bg-slate-600" />
          <Tooltip label="KPC 치환자 추가" className="mona10x12">
            <Button
              size="sm"
              color="light"
              aria-label="KPC 삽입"
              onClick={() => editor.chain().focus().insertContent('{{kpc}}').run()}
              className="mona10x12 px-2 font-bold"
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
              className="mona10x12 px-2 font-bold"
            >
              {'{{PC}}'}
            </Button>
          </Tooltip>
          <Tooltip label="말줄임표 추가" className="mona10x12">
            <Button
              size="sm"
              color="light"
              aria-label="PC 삽입"
              onClick={() => editor.chain().focus().insertContent('……').run()}
              className="mona10x12 px-2 font-bold"
            >
              ……
            </Button>
          </Tooltip>
          <Tooltip label="하이픈 추가" className="mona10x12">
            <Button
              size="sm"
              color="light"
              aria-label="PC 삽입"
              onClick={() => editor.chain().focus().insertContent('—').run()}
              className="mona10x12 px-2 font-bold"
            >
              —
            </Button>
          </Tooltip>
        </div>
      </div>
      <main className="mona10x12 relative container mt-30 mb-12 flex flex-1 flex-col gap-2 px-4 md:px-6">
        <input
          type="text"
          placeholder="제목"
          {...register('title')}
          className="focus:border-primary w-full border-b border-transparent p-4 text-2xl font-bold transition-all duration-300 outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <input
          type="text"
          placeholder="시나리오 라이터"
          {...register('writer')}
          className="focus:border-primary w-full border-b border-transparent px-4 py-2 transition-all duration-300 outline-none"
        />
        {errors.writer && <p className="text-red-500">{errors.writer.message}</p>}
        <input
          type="text"
          placeholder="한 줄 소개 글"
          {...register('line')}
          className="focus:border-primary w-full border-b border-transparent px-4 py-2 transition-all duration-300 outline-none"
        />
        {errors.line && <p className="text-red-500">{errors.line.message}</p>}
        <textarea
          placeholder="시나리오 소개"
          rows={1}
          {...register('info')}
          className="focus:border-primary w-full resize-none overflow-hidden rounded-xl border-b border-transparent px-4 py-2 font-medium transition-all duration-300 outline-none"
          onInput={e => {
            (e.target as HTMLTextAreaElement).style.height = 'auto';
            (e.target as HTMLTextAreaElement).style.height = (e.target as HTMLTextAreaElement).scrollHeight + 'px';
          }}
        />
        {errors.info && <p className="text-red-500">{errors.info.message}</p>}

        <EditorContent editor={editor} className="font-paperlogy h-full [&_.tiptap]:h-full" />
      </main>
    </form>
  );
};

export default Write;
