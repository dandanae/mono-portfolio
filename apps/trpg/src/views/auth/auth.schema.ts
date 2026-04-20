import z from 'zod';

export const authSchema = z.object({
  id: z.string().min(2, '2자 이상 입력해 주세요').max(20, '20자 이내로 입력해 주세요'),
  password: z.string().min(6, '6자 이상 입력해 주세요').max(16, '20자 이내로 입력해 주세요'),
});

export const signUpSchema = authSchema
  .extend({
    confirmPassword: z.string().min(6, '비밀번호를 한 번 더 입력해 주세요'),
    termsOfService: z.boolean().refine(val => val === true, {
      message: '이용약관에 동의해야 해요',
    }),
    privacyPolicy: z.boolean().refine(val => val === true, {
      message: '개인정보 수집 및 이용에 동의해야 해요',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않아요',
    path: ['confirmPassword'],
  });

export type AuthFormValues = z.infer<typeof authSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
