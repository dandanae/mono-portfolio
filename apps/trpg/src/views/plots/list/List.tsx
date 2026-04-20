'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { auth } from '@/shared/lib/firebase';
import { useQuery } from '@tanstack/react-query';
import { getPlots } from '../plot.service';

// 아이콘 추가

const List = () => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });

    return () => unsubscribe();
  }, []);

  const { data: plots, isLoading } = useQuery({
    queryKey: ['plots', userId],
    queryFn: () => getPlots(userId),
    enabled: !!userId,
  });
  useEffect(() => {
    console.log(plots);
  }, [plots]);

  return (
    <div className="relative m-auto flex aspect-square w-full max-w-2xl flex-col items-center justify-center">
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
        className="bg-primary/20 absolute aspect-square w-full max-w-58 rounded-full blur-2xl md:max-w-md"
      />

      <UpContainer key={plots?.length} className="flex w-full max-w-64 flex-col gap-6">
        {plots ? (
          plots?.map(plot => (
            <motion.div variants={upItemVariants} key={plot.id}>
              <UpContainer key={plot.id}>
                <motion.h1 variants={upItemVariants} className="font-bold tracking-tight text-slate-900">
                  {plot.title}
                </motion.h1>
                <motion.h1 variants={upItemVariants} className="font-bold tracking-tight text-slate-900">
                  {plot.info}
                </motion.h1>
                <motion.h1 variants={upItemVariants} className="font-bold tracking-tight text-slate-900">
                  {plot.line}
                </motion.h1>
              </UpContainer>
            </motion.div>
          ))
        ) : (
          <motion.div variants={upItemVariants}>
            <motion.h1 variants={upItemVariants} className="font-bold tracking-tight text-slate-900">
              스토리 보드가 없어요
            </motion.h1>
          </motion.div>
        )}
      </UpContainer>
    </div>
  );
};

export default List;
