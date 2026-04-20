import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import type { Project } from '../projects/types';

const ProjDetail = ({
  project,
  scrollRef,
  selectedId,
}: {
  project: Project;
  scrollRef: React.RefObject<HTMLDivElement>;
  selectedId: string | null;
}) => {
  return (
    <motion.div
      ref={scrollRef}
      key={selectedId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="no-swiper h-full w-full overflow-y-auto"
    >
      <div className="relative mx-auto max-w-2xl">
        <div className="top-0 right-0 hidden h-full w-full px-16 py-8 backdrop-blur-lg md:sticky md:block">
          <h2 className="mona10x12 text-primary-400 mb-4 text-sm tracking-widest uppercase">Project Detail</h2>
          <h3 className="mona10x12 text-3xl md:text-4xl">{project?.title}</h3>
        </div>

        <div className="space-y-16 px-8 py-4 text-lg leading-relaxed text-slate-300 md:px-16 md:py-8">
          <div className="flex flex-col">
            <h2 className="mona10x12 text-2xl font-bold">역할</h2>
            <p>{project?.role}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="mona10x12 text-2xl font-bold">주요 업무</h2>
            <div className="space-y-8">
              {project &&
                project.tasks.map(task => (
                  <div key={task.title}>
                    <h2 className="mona10x12 text-primary-400 text-xl">
                      <span className="mona12">⭐</span> {task.title}
                    </h2>
                    <ul className="ml-6 list-outside list-disc">
                      {task.lists.map((list, idx) => (
                        <li key={`${task.title}-${idx}`}>{list}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="mona10x12 text-2xl font-bold">제작 중 어려웠던 점</h2>
            <div className="space-y-8 pl-4">
              {project &&
                project.hardTasks.map(task => (
                  <div key={task.title} className="space-y-4">
                    <h2 className="mona10x12 text-primary-400 text-xl">
                      <span className="mona12">⭐</span> {task.title}
                    </h2>

                    <div>
                      <p>
                        <span className="mona12">🚫</span> <b className="mona10x12">어려웠던 점</b>
                      </p>
                      <ul className="ml-8 list-outside list-disc">
                        {task.problems.map((problem, idx) => (
                          <li key={`${task.title}-problem-${idx}`}>{problem}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p>
                        <span className="mona12">✅</span> <b className="mona10x12">문제 해결 방법</b>
                      </p>
                      <ul className="ml-8 list-outside list-disc">
                        {task.solutions.map((solution, idx) => (
                          <li key={`${task.title}-solution-${idx}`}>{solution}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p>
                        <span className="mona12">🌱</span> <b className="mona10x12">배운 점</b>
                      </p>
                      <ul className="ml-8 list-outside list-disc">
                        {task.learningPoints.map((point, idx) => (
                          <li key={`${task.title}-point-${idx}`}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {project?.content}

          {project && project.links && project.links.length > 0 && (
            <div className="mt-4 block md:hidden">
              <p className="text-sm text-slate-300">🔗 관련 페이지</p>
              <div className="mt-2 flex w-full flex-wrap gap-2">
                {project.links.map(link => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="hover:bg-primary-100 group flex w-36 flex-col rounded-xl bg-white px-4 py-2 ring ring-slate-200 transition-colors duration-300"
                  >
                    <p className="group-hover:text-primary-600 w-full truncate text-sm text-slate-600 transition-colors duration-300">
                      {link.title}
                    </p>
                    <p className="group-hover:text-primary-400 w-full truncate text-xs text-slate-400 transition-colors duration-300">
                      {link.href}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {project && project.libraries && project.libraries.length > 0 && (
            <div className="mt-4 block md:hidden">
              <p className="text-sm text-slate-300">⚒️ 사용한 라이브러리</p>
              <div className="mt-2 flex w-full flex-wrap gap-2">
                {project.libraries.map(library => (
                  <Link
                    key={library.title}
                    href={library.href}
                    className="hover:bg-primary-100 group flex w-36 flex-col rounded-xl bg-white px-4 py-2 ring ring-slate-200 transition-colors duration-300"
                  >
                    <p className="group-hover:text-primary-600 w-full truncate text-sm text-slate-600 transition-colors duration-300">
                      {library.title}
                    </p>
                    <p className="group-hover:text-primary-400 w-full truncate text-xs text-slate-400 transition-colors duration-300">
                      {library.href}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjDetail;
