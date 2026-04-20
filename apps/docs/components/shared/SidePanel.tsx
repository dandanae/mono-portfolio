'use client';

import Link from 'next/link';
import React from 'react';
import { useToggle } from 'react-simplikit';
import { useScenarioAtoms } from '@/stores';
import { Card, IconButton, TextInput, Tooltip } from '@repo/ui';
import { cn } from '@repo/utils';

const SidePanel = ({ title, children }: { title: string; children?: React.ReactNode }) => {
  const { kpc, setKpc, pc, setPc } = useScenarioAtoms();
  const [open, toggle] = useToggle(false);

  const Content = (
    <Card className="relative z-50 flex h-full flex-col gap-8 rounded-l-none rounded-r-2xl lg:h-auto lg:rounded-3xl">
      <span className="text-lg font-bold uppercase">{title}</span>

      <div className="flex flex-col gap-4">
        <TextInput
          id="kpc"
          label="KPC 이름"
          value={kpc}
          onChange={e => setKpc(e.target.value)}
          onClear={() => setKpc('')}
        />
        <TextInput id="pc" label="PC 이름" value={pc} onChange={e => setPc(e.target.value)} onClear={() => setPc('')} />
      </div>

      {children && children}

      <Tooltip label="홈으로 이동" className="w-full">
        <Link
          href="/"
          onClick={toggle}
          className="focus-ring group hover:bg-primary-100 hover:text-primary focus-visible:text-primary flex w-full items-center justify-center rounded-lg px-4 py-2 transition-all duration-300"
          aria-label="홈으로 이동"
        >
          <span className="material-symbols-rounded text-[18px]!">home</span>
        </Link>
      </Tooltip>
    </Card>
  );

  return (
    <>
      {/* 햄버거 버튼 (모바일) */}
      <IconButton
        icon={open ? 'close' : 'menu'}
        variant="fill"
        onClick={toggle}
        className="bg-primary-100 hover:bg-primary-200 text-primary! fixed top-4 right-4 z-50 lg:hidden"
      />

      {/* Backdrop (모바일) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={toggle}
          aria-hidden="true"
        />
      )}

      {/* 사이드 패널 본체 */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out',
          'lg:sticky lg:top-0 lg:z-auto lg:w-full lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="h-full">{Content}</div>
      </aside>
    </>
  );
};

export default SidePanel;
