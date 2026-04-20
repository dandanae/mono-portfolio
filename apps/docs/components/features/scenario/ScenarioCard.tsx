import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PlotPost } from '@/plots/types';

const ScenarioCard = ({ scenario }: { scenario: PlotPost }) => {
  return (
    <Link
      href={`/scenario/${scenario.slug}`}
      className="group focus-ring border-primary-100 relative block aspect-square w-full overflow-hidden rounded-2xl border"
      aria-labelledby={`시나리오 제목 ${scenario.title}`}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-300 will-change-transform group-hover:blur-sm group-focus-visible:blur-sm">
        {scenario.image.src ? (
          <Image
            src={scenario.image.src}
            alt={scenario.image.alt}
            width={scenario.image.width}
            height={scenario.image.height}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="material-symbols-rounded text-primary-200 text-3xl!">hide_image</div>
        )}
      </div>

      {/* 오버레이 */}
      <div className="group-hover:bg-gray-dark/50 group-focus-visible:bg-gray-dark/50 absolute inset-0 flex flex-col justify-end p-6 text-white">
        <div className="z-10 transition-all group-hover:-translate-y-2 group-focus-visible:-translate-y-2">
          {/* Grid 애니메이션 */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="invisible opacity-0 transition-[opacity,visibility] duration-300 group-hover:visible group-hover:opacity-100 group-focus-visible:visible group-focus-visible:opacity-100">
                <h3 id={`title-${scenario.slug}`} className="text-xl font-bold tracking-tight">
                  {scenario.title}
                </h3>
                <span className="text-sm font-medium text-gray-300">{scenario.writer}</span>
                <span className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-200 md:line-clamp-7">
                  {scenario.summary}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 아이콘 */}
      <div
        className="absolute top-4 right-4 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
        aria-hidden
      >
        <span className="material-symbols-rounded text-3xl! text-white">arrow_circle_right</span>
      </div>
    </Link>
  );
};

export default ScenarioCard;
