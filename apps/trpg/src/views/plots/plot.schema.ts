import { z } from 'zod';

export const scenarioSchema = z.object({
  title: z.string().min(1, '제목을 입력해 주세요').max(50, '제목은 50 자 이내로 작성해 주세요'),
  info: z.string().max(200, '시나리오 소개는 200자 이내로 작성해 주세요').optional(),
  writer: z.string().min(1, '작성자를 입력해 주세요').max(50, '작성자는 50 자 이내로 작성해 주세요'),
  line: z.string().min(1, '한 줄 소개 글을 입력해 주세요').max(20, '한 줄 소개 글은 20 자 이내로 작성해 주세요'),
  authorId: z.string(),
  content: z.record(z.any(), z.any()).refine(json => Object.keys(json).length > 0, {
    message: '시나리오 내용을 입력해 주세요',
  }),
  updatedAt: z.iso.datetime().optional(),
  shared: z.boolean().optional(),
});

export type ScenarioFormValues = z.infer<typeof scenarioSchema>;
