import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { UpContainer } from '@/shared/animations';
import { ProjCard, ProjDetail } from '../components';
import { allProjects } from '../projects';

interface Props {
  mainSwiper: React.RefObject<SwiperType | null>; // ← 부모 Swiper 인스턴스
}

const ProjectSection = ({ mainSwiper }: Props) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = allProjects.find(p => p.id === selectedId);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const rowCount = Math.ceil(allProjects.length / 2);

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollEl = scrollRef.current;

      if (!scrollEl || scrollEl.scrollHeight <= scrollEl.clientHeight) {
        mainSwiper.current?.mousewheel?.enable();
        return;
      }

      const atTop = scrollEl.scrollTop <= 0;
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1;

      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        mainSwiper.current?.mousewheel?.enable();
      } else {
        mainSwiper.current?.mousewheel?.disable();
      }
    };

    el.addEventListener('wheel', handleWheel);
    return () => el.removeEventListener('wheel', handleWheel);
  }, [mainSwiper]);
  useEffect(() => {
    return () => {
      mainSwiper.current?.mousewheel?.enable();
    };
  }, [mainSwiper]);

  return (
    <section id="project" className="bg-background flex h-screen min-h-screen flex-col overflow-hidden md:flex-row">
      {/* 왼쪽: 카드 그리드 영역 */}
      <UpContainer
        onWheel={(e: React.WheelEvent<HTMLDivElement>) => e.stopPropagation()}
        className="relative w-full bg-white/10 p-5 md:w-1/2 md:px-8 md:py-24"
      >
        <Swiper
          modules={[Grid, FreeMode]}
          spaceBetween={20}
          slidesPerView={2.5}
          freeMode={true}
          breakpoints={{
            768: {
              slidesPerView: 2,
              grid: {
                rows: rowCount,
                fill: 'row',
              },
              freeMode: false,
            },
          }}
          className="w-full"
        >
          {allProjects.map(project => (
            <SwiperSlide key={project.id}>
              <ProjCard type="summary" project={project} selectedId={selectedId} setSelectedId={setSelectedId} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 선택 시 확장되는 오버레이 카드 */}
        <AnimatePresence>
          {selectedId && selectedProject && (
            <ProjCard type="detail" project={selectedProject} selectedId={selectedId} setSelectedId={setSelectedId} />
          )}
        </AnimatePresence>
      </UpContainer>

      {/* 오른쪽: 상세 내용 영역 */}
      <div
        ref={rightRef}
        className="relative flex h-full min-h-0 w-full flex-col border-l border-white/20 bg-white/5 md:w-1/2"
      >
        <AnimatePresence mode="wait">
          {selectedProject && selectedId ? (
            <ProjDetail
              project={selectedProject}
              scrollRef={scrollRef as React.RefObject<HTMLDivElement>}
              selectedId={selectedId}
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full items-center justify-center p-12 text-center"
            >
              <p className="mona10x12 text-2xl font-light text-white">왼쪽에서 프로젝트를 선택해 보세요!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectSection;
