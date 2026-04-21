'use client';
import { motion } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextButton, TextInput } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';
import { type AuthFormValues, authSchema } from '../auth.schema';
import { signInWithId } from '../auth.service';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: async (data: AuthFormValues) => {
      return await signInWithId(data.id, data.password);
    },
  });

  const onSubmit = (data: AuthFormValues) => {
    signIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative m-auto flex h-full w-full max-w-2xl flex-col items-center justify-center"
    >
      {/* 배경 그라데이션 원 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
        className="bg-primary/20 dark:bg-primary/40 absolute aspect-square w-full max-w-58 rounded-full blur-2xl md:max-w-md"
      />

      <UpContainer className="absolute flex w-full max-w-64 flex-col gap-6">
        <motion.h2
          variants={upItemVariants}
          className="text-primary mona10x12 text-center text-2xl font-bold uppercase"
        >
          dandanae
        </motion.h2>
        <motion.div variants={upItemVariants} className="mona10x12">
          <TextInput
            id="id"
            label="아이디"
            placeholder="이름을 입력해 주세요."
            {...register('id')}
            error={errors.id?.message}
          />
        </motion.div>
        <motion.div variants={upItemVariants} className="mona10x12">
          <TextInput
            type="password"
            id="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요."
            {...register('password')}
            error={errors.password?.message}
          />
        </motion.div>
        <div className="flex flex-col gap-2">
          <motion.div variants={upItemVariants} className="mona10x12">
            <Button type="submit" display="full" size="lg" loading={isPending} disabled={isPending}>
              로그인
            </Button>
          </motion.div>
          <motion.div variants={upItemVariants} className="mona10x12">
            <TextButton as="a" href="/signup" type="submit" display="full">
              회원가입
            </TextButton>
          </motion.div>
        </div>
      </UpContainer>
    </form>
  );
};

export default SignIn;
