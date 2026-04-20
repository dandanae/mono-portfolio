'use client';
import React, { useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Mousewheel, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IntroSection, MainSection, ProjectSection } from './sections';

const LandingPage = () => {
  const mainSwiperRef = useRef<SwiperType | null>(null); // ← 추가

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      const labels = ['🏠', '🪪', '📄'];
      const label = labels[index] || '';

      return '<span class="' + className + '">' + label + '</span>';
    },
  };
  return (
    <div className="min-h-screen bg-black">
      <Swiper
        onSwiper={swiper => {
          mainSwiperRef.current = swiper;
        }}
        onSlideChange={() => {
          mainSwiperRef.current?.mousewheel?.enable();
        }}
        modules={[Pagination, Scrollbar, Mousewheel]}
        direction="vertical"
        loop={false}
        slidesPerView={1}
        noSwiping={true}
        noSwipingClass="no-swiper"
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        pagination={pagination}
        scrollbar={{ draggable: true }}
        className="h-screen w-full border border-gray-300"
      >
        <SwiperSlide>
          <MainSection />
        </SwiperSlide>
        <SwiperSlide>
          <IntroSection />
        </SwiperSlide>
        <SwiperSlide>
          <ProjectSection mainSwiper={mainSwiperRef} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default LandingPage;
