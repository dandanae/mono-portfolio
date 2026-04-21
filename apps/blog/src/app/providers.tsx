'use client';
import { AnimatePresence } from 'framer-motion';
import { IntlayerClientProvider } from 'next-intlayer';
import { ThemeProvider } from 'next-themes';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <IntlayerClientProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </ThemeProvider>
    </IntlayerClientProvider>
  );
};
