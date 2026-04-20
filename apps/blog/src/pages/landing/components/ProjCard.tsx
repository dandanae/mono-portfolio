import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { upItemVariants } from '@/shared/animations';
import { IconButton } from '@repo/ui';
import type { Project } from '../projects/types';

const ProjCard = ({
  type,
  project,
  selectedId,
  setSelectedId,
}: {
  type: 'summary' | 'detail';
  project: Project;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) => {
  if (type === 'summary') {
    return (
      <motion.div
        key={project.id}
        layoutId={`card-${project.id}`}
        variants={upItemVariants}
        onClick={() => setSelectedId(project.id)}
        className="group hover:bg-primary-100 relative flex h-40 w-full origin-bottom cursor-pointer flex-col rounded-2xl bg-white p-4 text-black shadow-lg transition-colors duration-300"
      >
        <span className="mona12 absolute top-3 right-3 text-2xl group-hover:animate-bounce">💜</span>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            className="absolute bottom-0 left-0 h-1/2 w-auto object-bottom-left p-4 opacity-50 group-hover:opacity-100"
          />
        )}

        {/* 제목 */}
        <h3 className="mona10x12 w-5/6 truncate text-xl">{project.title}</h3>

        {/* 도전, 기간 */}
        <div className="flex-1">
          <p className="mona10x12 flex items-center gap-1 opacity-70">
            <span className="mona10x12 text-xs">도전💪</span>
            {project.challenge}
          </p>

          <p className="mona10x12 flex items-center gap-1 opacity-70">
            <span className="mona10x12 text-xs">기간📅</span>
            {project.date}
          </p>
        </div>

        {/* 태그 */}
        <div className="ml-auto flex gap-1">
          {project.tags.map((tag, index) => {
            if (index > 1) return null;
            return (
              <span
                key={tag}
                className="mona10x12 group-hover:bg-primary-400 rounded-full bg-slate-200 px-3 py-1 text-sm text-black transition-colors duration-300"
              >
                {tag}
              </span>
            );
          })}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      layoutId={`card-${selectedId}`}
      className="absolute inset-0 z-10 flex flex-1 shrink-0 flex-col bg-white p-8 text-black md:p-12"
    >
      <div className="relative w-full flex-1">
        {/* 닫기 버튼 */}
        <IconButton
          variant="fill"
          size="lg"
          aria-label="Close"
          icon="close"
          onClick={() => setSelectedId(null)}
          className="absolute -top-4 -right-4"
        />

        {/* 제목 */}
        <motion.h2 className="mona10x12 text-3xl font-bold md:text-4xl">{project.title}</motion.h2>

        {/* 도전, 기간 */}
        <div className="flex gap-4">
          <p className="mona10x12 flex items-center gap-1 opacity-70">
            <span className="text-xs">도전💪</span>
            {project.challenge}
          </p>

          <p className="mona10x12 flex items-center gap-1 opacity-70">
            <span className="text-xs">기간📅</span>
            {project.date}
          </p>
        </div>

        {/* 서브타이틀 */}
        <motion.p className="mona10x12 mt-1 flex-1 text-base text-slate-600 md:mt-4 md:text-lg">
          {project.subtitle}
        </motion.p>

        {/* 관련 페이지 */}
        {project.links && project.links.length > 0 && (
          <div className="mt-4 hidden md:block">
            <p className="mona10x12 text-sm text-slate-600">
              <span className="mona12">🔗</span> 관련 페이지
            </p>
            <div className="mt-2 flex w-full flex-wrap gap-2">
              {project.links.map(link => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="hover:bg-primary-100 group flex w-48 flex-col rounded-xl bg-white px-4 py-2 ring ring-slate-200 transition-colors duration-300"
                >
                  <p className="mona10x12 group-hover:text-primary-600 w-full truncate text-sm text-slate-600 transition-colors duration-300">
                    {link.title}
                  </p>
                  <p className="mona10x12 group-hover:text-primary-400 w-full truncate text-xs text-slate-400 transition-colors duration-300">
                    {link.href}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 사용한 라이브러리 */}
        {project.libraries && project.libraries.length > 0 && (
          <div className="mt-4 hidden md:block">
            <p className="mona10x12 text-sm text-slate-600">
              <span className="mona12">⚒️</span> 사용한 라이브러리
            </p>
            <div className="mt-2 flex w-full flex-wrap gap-2">
              {project.libraries.map(library => (
                <Link
                  key={library.title}
                  href={library.href}
                  className="hover:bg-primary-100 group flex w-48 flex-col rounded-xl bg-white px-4 py-2 ring ring-slate-200 transition-colors duration-300"
                >
                  <p className="mona10x12 group-hover:text-primary-600 w-full truncate text-sm text-slate-600 transition-colors duration-300">
                    {library.title}
                  </p>
                  <p className="mona10x12 group-hover:text-primary-400 w-full truncate text-xs text-slate-400 transition-colors duration-300">
                    {library.href}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 태그 */}
        <div className="mt-2 flex w-full flex-wrap justify-end gap-2 md:mt-8">
          {project.tags.map(tag => (
            <span key={tag} className="mona10x12 rounded-full bg-black px-3 py-1 text-sm text-white">
              # {tag}
            </span>
          ))}
        </div>

        {/* 이미지 */}
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={100}
            height={100}
            className="absolute bottom-0 left-0 hidden max-h-18 w-auto object-bottom-left group-hover:opacity-100 md:block md:max-h-40"
          />
        )}
      </div>
    </motion.div>
  );
};

export default ProjCard;
