import { atom, useAtom } from 'jotai';

const scrollPercentAtom = atom<number>(0);

export const useScrollAtoms = () => {
  const [scrollPercent, setScrollPercent] = useAtom(scrollPercentAtom);

  return {
    scrollPercent,
    setScrollPercent,
  };
};
