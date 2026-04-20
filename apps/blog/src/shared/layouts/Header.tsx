'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ThemeSwicher } from '../components';

const Header = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 right-0 left-0 z-50 text-white transition-all duration-300 ${
        scrolled ? 'bg-background/80 border-border border-b backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={e => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="font-moirai! text-gradient hover:text-primary-400 text-3xl font-bold transition-colors duration-300"
        >
          DANAE
        </Link>

        <ThemeSwicher />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">blog</nav>

        {/* Mobile toggle */}
        <button className="flex flex-col gap-1.5 p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="bg-foreground block h-0.5 w-5"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="bg-foreground block h-0.5 w-5"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="bg-foreground block h-0.5 w-5"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-background/95 border-border overflow-hidden border-b backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
