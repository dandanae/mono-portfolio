'use client';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider as JotaiProvider } from 'jotai';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
import { auth } from '@/shared/lib/firebase';
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient() as QueryClient;
    return browserQueryClient;
  }
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      // 로그인이 필요한 없는 페이지 리스트
      const isPublicPage = pathname.includes('/signin') || pathname.includes('/signup');

      if (!user && !isPublicPage) {
        router.push('/signin');
      }

      if (user && isPublicPage) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </JotaiProvider>
      </QueryClientProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastClassName={context =>
          `${context?.defaultClassName} px-4! py-1! rounded-full! min-h-12! overflow-hidden! cursor-pointer! shadow-sm!`
        }
      />
    </ThemeProvider>
  );
};

export default Provider;
