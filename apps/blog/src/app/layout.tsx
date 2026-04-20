import type { FC, PropsWithChildren } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/grid';
import 'swiper/css/mousewheel';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@repo/ui/styles.css';
import './globals.css';

const RootLayout: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default RootLayout;
