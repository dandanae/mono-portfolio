'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { auth } from '@/shared/lib/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, IconButton } from '@repo/ui';
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
import { WriteTools } from '../ui';

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
    reset,
    formState: { errors },
  } = useForm<ScenarioFormValues>({
    resolver: zodResolver(scenarioSchema),
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
    content: plot?.content ?? ``,
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
    if (!user) {
      toast.error('로그인 후 작성할 수 있어요');
      return;
    }

    const finalData = {
      ...data,
      authorId: user.uid,
    };

    if (id) {
      updatePlotMutation(finalData);
    } else {
      createPlotMutation(finalData);
    }
  };
  useEffect(() => {
    if (plot) {
      reset({ ...plot, content: plot.content });
      if (editor && plot.content) {
        editor.commands.setContent(plot.content);
      }
    }
  }, [plot, editor, reset]);

  useEffect(() => {
    if (user) {
      setValue('authorId', user.uid);
    }
  }, [user, setValue]);

  if (!editor) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="reative no-scroll flex h-screen w-full flex-col overflow-y-auto px-6"
    >
      <div className="bg-background/60 shadow-foreground/10 absolute top-0 right-0 left-0 z-50 flex h-24 flex-col items-center px-4 py-2 shadow backdrop-blur">
        <div className="flex h-10 w-full items-center justify-between">
          <IconButton icon="arrow_back" size="lg" color="light" aria-label="뒤로가기" onClick={() => router.back()} />
          <div className="flex gap-2">
            <Button color="primary" fill="clear" onClick={() => router.push('/howtouse')}>
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
        <WriteTools editor={editor} />
      </div>
      <main className="mona10x12 relative container mx-auto mt-30 mb-12 flex max-w-3xl flex-1 flex-col px-4 md:px-6">
        <input
          type="text"
          placeholder="제목"
          {...register('title')}
          className="w-full px-4 text-2xl font-bold outline-none"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="시나리오 라이터"
            {...register('writer')}
            className="w-full pr-4 pl-8 outline-none"
          />
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-sm uppercase">w.</span>
        </div>
        {errors.writer && <p className="text-red-500">{errors.writer.message}</p>}
        <input type="text" placeholder="한 줄 소개 글" {...register('line')} className="w-full px-4 outline-none" />
        {errors.line && <p className="text-red-500">{errors.line.message}</p>}

        <div className="my-4 h-px w-full bg-slate-200 dark:bg-slate-700" />

        <textarea
          placeholder="시나리오 소개"
          rows={3}
          {...register('info')}
          className="w-full resize-none overflow-hidden rounded-xl px-4 outline-none"
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
