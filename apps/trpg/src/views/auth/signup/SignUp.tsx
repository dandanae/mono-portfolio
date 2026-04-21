'use client';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { overlay } from 'overlay-kit';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Modal, TextButton, TextInput } from '@repo/ui';
import { useMutation } from '@tanstack/react-query';
import { type SignUpFormValues, signUpSchema } from '../auth.schema';
import { signUpWithId } from '../auth.service';

const SignUp = () => {
  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: {
      id: '',
      password: '',
      confirmPassword: '',
      termsOfService: false,
      privacyPolicy: false,
    },
  });

  const termsOfService = watch('termsOfService');
  const privacyPolicy = watch('privacyPolicy');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpFormValues) => signUpWithId(data),
    onSuccess: () => {
      toast.success('회원가입 성공');
      router.push('/');
    },
    onError: error => {
      toast.error(`회원가입 실패-${error.message}`);
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative m-auto flex aspect-square w-full max-w-2xl flex-col items-center justify-center"
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
          회원가입
        </motion.h2>
        <motion.div variants={upItemVariants} className="mona10x12">
          <TextInput
            id="id"
            label="아이디"
            help="2-10자 이내로 입력해 주세요 (한글 가능)"
            error={errors.id?.message}
            {...register('id')}
            required
          />
        </motion.div>
        <motion.div variants={upItemVariants} className="mona10x12">
          <TextInput
            type="password"
            id="password"
            label="비밀번호"
            help="6-16자 이내로 입력해 주세요"
            error={errors.password?.message}
            {...register('password')}
            required
          />
        </motion.div>
        <motion.div variants={upItemVariants} className="mona10x12">
          <TextInput
            type="password"
            id="confirmPassword"
            label="비밀번호 확인"
            help="비밀번호를 한 번 더 입력해 주세요"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            required
          />
        </motion.div>

        <div className="mona10x12 flex flex-col gap-2">
          <motion.div variants={upItemVariants} className="flex items-center justify-between gap-2">
            <Checkbox label="이용약관 동의 (필수)" checked={termsOfService} {...register('termsOfService')} />
            <TextButton
              display="inline"
              size="sm"
              className="shrink-0"
              onClick={() => {
                overlay.open(({ isOpen, close, unmount }) => (
                  <Modal title="이용약관" open={isOpen} close={close} unmount={unmount} confirmText="확인">
                    <div className="space-y-8">
                      {Agreement1.map(item => (
                        <div key={item.title} className="space-y-2">
                          <h2 className="text-lg font-medium">{item.title}</h2>
                          <p>{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </Modal>
                ));
              }}
            >
              [약관보기]
            </TextButton>
          </motion.div>
          <motion.div variants={upItemVariants} className="flex items-center justify-between gap-2">
            <Checkbox
              label="개인정보 수집 및 이용 동의 (필수)"
              checked={privacyPolicy}
              {...register('privacyPolicy')}
            />
            <TextButton
              display="inline"
              size="sm"
              className="shrink-0"
              onClick={() => {
                overlay.open(({ isOpen, close, unmount }) => (
                  <Modal title="개인정보 수집 및 이용" open={isOpen} close={close} unmount={unmount} confirmText="확인">
                    <div className="space-y-8">
                      {Agreement2.map(item => (
                        <div key={item.title} className="space-y-2">
                          <h2 className="text-lg font-medium">{item.title}</h2>
                          <p>{item.content}</p>
                        </div>
                      ))}
                    </div>
                  </Modal>
                ));
              }}
            >
              [약관보기]
            </TextButton>
          </motion.div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.p variants={upItemVariants} className="mona10x12 text-sm">
            <span className="mona12 mr-2">⚠️</span>개인 정보를 저장하지 않아,{' '}
            <span className="font-bold text-red-600">비밀번호 분실 시 찾기가 불가능</span>해요.
          </motion.p>
          <motion.p variants={upItemVariants} className="mona10x12 text-sm">
            아이디와 비밀번호를 반드시 안전한 곳에 기록해 두세요!
          </motion.p>
          <motion.div variants={upItemVariants} className="mona10x12">
            <Button type="submit" display="full" size="lg" disabled={!isValid || isPending} loading={isPending}>
              회원가입
            </Button>
          </motion.div>

          <motion.div variants={upItemVariants} className="mona10x12">
            <TextButton as="a" href="/" type="submit" display="full">
              메인으로
            </TextButton>
          </motion.div>
        </div>
      </UpContainer>
    </form>
  );
};

export default SignUp;

const Agreement1: { title: string; content: string }[] = [
  { title: '목적', content: '본 약관은 [사이트명]이 제공하는 소성 작성 및 게시 서비스 이용 조건을 규정합니다.' },
  {
    title: '저작권',
    content:
      '회원이 작성한 게시물의 저작권은 회원 본인에게 있으며, 회사는 서비스 내 노출 및 운영을 위한 이용권만을 갖습니다.',
  },
  {
    title: '게시물 제한',
    content: '타인의 저작권 침해, 명예훼손, 음란물 등 불법 콘텐츠 게시 시 예고 없이 삭제될 수 있습니다.',
  },
  {
    title: '면책',
    content: '회사는 회원이 비밀번호를 분실하여 발생한 계정 분실 및 데이터 손실에 대해 책임을 지지 않습니다.',
  },
];

const Agreement2: { title: string; content: string }[] = [
  { title: '수집 항목', content: '아이디, 비밀번호' },
  { title: '수집 및 이용 목적', content: '회원 식별, 서비스 이용에 따른 본인 확인, 게시물 관리' },
  { title: '보유 및 이용 기간', content: '회원 탈퇴 시까지 (탈퇴 시 즉시 파기)' },
  {
    title: '동의 거부 권리',
    content: '귀하는 동의를 거부할 권리가 있으나, 거부 시 회원가입 및 서비스 이용이 제한됩니다.',
  },
];
