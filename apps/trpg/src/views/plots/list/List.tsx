'use client';

import { motion, useMotionValue } from 'motion/react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { UpContainer, upItemVariants } from '@/shared/animations';
import { auth } from '@/shared/lib/firebase';
import Loading from '@/shared/Loading';
import { Button, TextButton, Tooltip } from '@repo/ui';
import { useQuery } from '@tanstack/react-query';
import { getPlots } from '../plot.service';

const List = () => {
  const [userId, setUserId] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    // 페이지가 마운트되고 나서 일정 시간(템플릿 애니메이션 종료 후)이 지나면 false로 변경
    const timer = setTimeout(() => {
      setIsFirstRender(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setOrder(order);
  };

  const y = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUserId(user ? user.uid : '');
    });
    return () => unsubscribe();
  }, []);

  const {
    data: plots,
    isPending,
    isLoading, // 실제 최초 로딩 상태
  } = useQuery({
    queryKey: ['plots', userId, order],
    queryFn: () => getPlots(userId, order),
    enabled: !!userId, // userId가 있을 때만 실행
  });

  useEffect(() => {
    if (containerRef.current && dragRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      const contentHeight = dragRef.current.scrollHeight;
      setConstraints({
        top: contentHeight > containerHeight ? containerHeight - contentHeight : 0,
        bottom: 0,
      });
    }
  }, [plots]);

  const onWheel = (e: React.WheelEvent) => {
    const newY = y.get() - e.deltaY;
    const clampedY = Math.max(constraints.top, Math.min(constraints.bottom, newY));
    y.set(clampedY);
  };

  if (!userId || isLoading || isPending) return <Loading />;

  return (
    <UpContainer
      isFirst={isFirstRender}
      className="relative ml-0 flex w-full flex-col items-center justify-center md:ml-18"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        className="bg-primary/20 dark:bg-primary/40 absolute aspect-square w-full max-w-58 rounded-full blur-2xl md:max-w-md"
      />
      {plots && plots.length > 0 && (
        <div className="mona10x12 mx-auto flex w-full max-w-96 flex-wrap justify-between px-2 md:max-w-3xl">
          <TextButton
            color="primary"
            size="sm"
            icon={order === 'desc' ? 'arrow_downward' : 'arrow_upward'}
            disabled={isPending}
            onClick={() => {
              if (isPending) return;
              handleOrderChange(order === 'desc' ? 'asc' : 'desc');
            }}
          >
            {order === 'desc' ? '최신순' : '오래된순'}
          </TextButton>
          <Button as="a" href="/write" color="primary" size="sm" icon="add_notes">
            <span>새 글 추가</span>
          </Button>
        </div>
      )}

      <UpContainer key={`${userId}-${order}`} isFirst={isFirstRender} className="mona10x12 flex w-full">
        {/* 컨테이너에서 onWheel 이벤트 감지 */}
        <div ref={containerRef} onWheel={onWheel} className="relative h-[60dvh] w-full touch-none overflow-hidden">
          {plots && plots.length > 0 ? (
            <motion.div
              ref={dragRef}
              style={{ y }}
              drag="y"
              dragConstraints={constraints}
              dragElastic={0.1}
              dragMomentum={true}
              className="content-start active:cursor-grabbing"
            >
              <div className="mx-auto flex w-full max-w-96 flex-wrap md:max-w-3xl">
                {plots.map(plot => (
                  <motion.div key={plot.id} variants={upItemVariants} className="group w-full max-w-96 p-2 md:w-1/2">
                    <Link
                      href={`/article/${plot.id}`}
                      className="group-hover:bg-background/50 ring-primary/30 dark:ring-primary/50 relative z-10 flex flex-col gap-2 rounded-lg bg-transparent p-6 ring backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 active:scale-95 md:flex-row"
                    >
                      <div className="flex w-full min-w-0 flex-col md:flex-auto">
                        <div className="flex flex-col">
                          <Tooltip label={plot.title} position="left">
                            <span className="group-hover:text-primary line-clamp-1 truncate font-bold tracking-wider transition-colors duration-300">
                              {plot.title}
                            </span>
                          </Tooltip>
                          <span className="shrink-0 text-sm opacity-70">w. {plot.writer}</span>
                        </div>
                        <Tooltip label={plot.line} position="top">
                          <span className="mt-2 line-clamp-1 max-w-full min-w-0 truncate text-sm tracking-tight opacity-80">
                            {plot.line}
                          </span>
                        </Tooltip>
                      </div>
                      <span className="shrink-0 text-sm tracking-tight opacity-40">
                        {new Date(plot.createdAt ?? '').toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            !isPending && (
              <div className="flex h-full items-center justify-center">
                <Button as="a" href="/write" color="primary" size="lg" icon="add_notes">
                  <span>새 글 추가</span>
                </Button>
              </div>
            )
          )}
        </div>
      </UpContainer>
    </UpContainer>
  );
};

export default List;
