'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { Separated } from 'react-simplikit';
import { UpContainer, upItemVariants } from '@/shared/animations';

const IntroSection = () => {
  const mainSkills = ['React', 'Next.js', 'Typescript', 'TailwindCSS', 'Framer motion'];
  const challengeSkills = ['Flutter', 'AWS', 'Firebase', 'Docker', 'Vercel'];

  return (
    <section
      id="intro"
      className="bg-background relative flex h-screen min-h-screen flex-col overflow-hidden md:flex-row"
    >
      <UpContainer
        onWheel={(e: React.WheelEvent<HTMLDivElement>) => e.stopPropagation()}
        className="relative flex w-full flex-col items-center justify-center bg-white/10 p-5 md:w-1/2 md:px-8 md:py-24"
      >
        <motion.span variants={upItemVariants} className="mona12 animate-bounce text-3xl">
          💬
        </motion.span>
        <motion.p
          variants={upItemVariants}
          className="mona10x12 mb-2 text-center text-lg leading-tight tracking-tight md:text-xl"
        >
          &quot;해 보지 않고서는 당신이 무엇을 <br /> 해낼 수 있는지 알 수 없다.&quot;
        </motion.p>
        <motion.p variants={upItemVariants} className="mona10x12 text-xs text-white/70 italic opacity-40">
          - 프랭클린 아담
        </motion.p>

        <motion.p variants={upItemVariants} className="mona10x12 text-sm tracking-tighter text-white/70">
          저는 새로운 기술에 도전하는 것을 <br className="md:hidden" /> 두려워하지 않는{' '}
          <span className="mona10x12 text-primary-400 animate-pulse">Danae</span>입니다!{' '}
          <span className="mona12">✨</span>
        </motion.p>
      </UpContainer>

      <UpContainer className="relative flex w-full flex-col items-center justify-center p-5 md:w-1/2 md:px-8 md:py-24">
        <motion.h1 variants={upItemVariants} className="mona10x12 text-3xl font-bold">
          저는 이런 걸 할 수 있어요!
        </motion.h1>

        {[
          { label: 'langs', value: ['Typescript', 'Flutter'] },
          { label: 'front', value: ['React', 'Next.js'] },
          { label: 'data', value: ['MySQL'] },
          { label: 'deploy', value: ['Vercel', 'AWS'] },
        ].map(item => (
          <>
            <motion.div key={item.label} variants={upItemVariants} className="flex w-full justify-center gap-4 px-2">
              <p className="mona10x12 text-primary dark:text-primary-400 min-w-20 text-sm uppercase">{item.label}</p>
              <div className="flex flex-1 flex-wrap gap-2 font-medium">
                {item.value.map(value => (
                  <span key={value} className="mona10x12 text-foreground">
                    {value}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={upItemVariants} className="mt-2 mb-4 h-px w-full bg-white/10" />
          </>
        ))}
      </UpContainer>
      {/*

      <UpContainer className="flex flex-col items-center gap-8 text-center">


        <div className="flex flex-wrap justify-center gap-3">
          {[
            { href: 'https://github.com/danae-dev', text: '🖥️ GitHub' },
            { href: '#', text: '📋 Resume' },
            { href: 'mailto:lleeve@naver.com', text: '📨 Email' },
          ].map(item => (
            <motion.div key={item.text} variants={upItemVariants}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group hover:bg-primary-400 relative flex items-center justify-center overflow-hidden rounded-full bg-white px-6 py-2 text-sm font-bold text-black transition-all duration-300 hover:pr-9"
              >
                <span className="mona10x12 relative z-10 tracking-tighter uppercase">{item.text}</span>
                <span className="mona10x12 absolute right-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </UpContainer>

      <div className="z-10 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <UpContainer className="group hover:border-primary-400/30 relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors">
          <h3 className="mona10x12 text-primary-400 mb-6">🚀 정복하고 있어요!</h3>
          <div className="flex flex-wrap gap-2">
            {mainSkills.map(skill => (
              <motion.span
                key={skill}
                variants={upItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="mona10x12 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/10 transition-shadow ring-inset"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </UpContainer>

        <UpContainer className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors hover:border-blue-400/30">
          <h3 className="mona10x12 mb-6 text-amber-400 uppercase">🔥도전하고 있어요!</h3>
          <div className="flex flex-wrap gap-2">
            {challengeSkills.map(skill => (
              <motion.span
                key={skill}
                variants={upItemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="mona10x12 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/10 transition-shadow ring-inset"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </UpContainer>
      </div> */}

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm font-light text-white/50"
      >
        <span className="mona10x12 text-xs tracking-[5px] uppercase">Scroll to see my projects</span>
        <div className="material-symbols-rounded select-none">keyboard_arrow_down</div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
