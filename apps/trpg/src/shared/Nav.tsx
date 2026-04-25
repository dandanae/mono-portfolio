'use client';
import { signOut } from 'firebase/auth';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { auth } from '@/shared/lib/firebase';
import { cn } from '@repo/utils';

const Nav = () => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  const logout = () => {
    signOut(auth);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (href: string) => pathname === href;

  if (pathname.includes('/signin') || pathname.includes('/signup') || pathname.includes('/write')) return null;

  const headerItems = [
    {
      href: '/',
      icon: 'home',
      label: '홈',
    },
    {
      href: '/howtouse',
      icon: 'help',
      label: '사용법',
    },
    {
      href: '/separate',
      icon: 'content_cut',
      label: '문장 정리',
    },
    // {
    //   href: '/settings',
    //   icon: 'settings',
    //   label: '설정',
    // },
  ];

  return (
    <motion.nav
      initial={{
        opacity: 0,
        x: typeof window !== 'undefined' && window.innerWidth >= 768 ? -20 : 0,
        y: typeof window !== 'undefined' && window.innerWidth >= 768 ? 0 : 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 15,
        bounce: 0.8,
        duration: 0.8,
        delay: 2.2,
      }}
      className={cn(
        'bg-background text-foreground fixed z-99 transition-colors duration-300',
        // 모바일
        'right-0 bottom-0 left-0 h-16 border-t border-slate-200 dark:border-slate-800',
        // 데스크탑
        'md:top-0 md:bottom-0 md:left-0 md:h-full md:w-18 md:border-t-0 md:border-r',
      )}
    >
      <ul className="flex h-full flex-row items-center justify-between px-4 md:flex-col md:px-0 md:py-8">
        <div className="flex flex-1 flex-row items-center justify-around md:w-full md:flex-col md:justify-start md:gap-4">
          {headerItems.map(item => (
            <li key={item.href} className="flex-1 md:w-full md:flex-none md:px-2">
              <Link
                href={item.href}
                className="hover:text-primary active:text-primary flex flex-col items-center justify-center gap-1 rounded-xl py-1 transition-all duration-300 hover:bg-slate-200 active:scale-90 active:bg-slate-300 md:aspect-square md:gap-0 dark:hover:bg-slate-700 dark:active:bg-slate-600"
              >
                <span
                  className={cn(
                    'material-symbols-rounded text-2xl transition-colors duration-300 md:text-3xl!',
                    isActive(item.href) && 'text-primary',
                  )}
                >
                  {item.icon}
                </span>
                <span
                  className={cn(
                    'mona10x12 text-[10px] transition-colors duration-300 md:text-sm',
                    isActive(item.href) && 'text-primary',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </div>

        {/* 테마 스위치 영역 */}
        <div className="flex flex-row items-center justify-center pl-4 md:w-full md:flex-col md:px-2 md:pl-0">
          <button
            type="button"
            onClick={logout}
            className="flex aspect-square h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors duration-300 hover:bg-slate-100 active:scale-90 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            <span className="material-symbols-rounded text-2xl md:text-3xl!">logout</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex aspect-square h-12 w-12 flex-col items-center justify-center rounded-xl transition-colors duration-300 hover:bg-slate-100 active:scale-90 active:bg-slate-200 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          >
            <span className="material-symbols-rounded text-2xl md:text-3xl!">
              {mounted ? (theme === 'dark' ? 'dark_mode' : 'light_mode') : 'light_mode'}
            </span>
          </button>
        </div>
      </ul>
    </motion.nav>
  );
};

export default Nav;
