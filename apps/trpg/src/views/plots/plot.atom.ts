import { atom, useAtom } from 'jotai';

const scrollPercentAtom = atom<number>(0);

export const useScrollAtoms = () => {
  const [scrollPercent, setScrollPercent] = useAtom(scrollPercentAtom);

  return {
    scrollPercent,
    setScrollPercent,
  };
};

const kpcAtom = atom<string>('KPC');
const pcAtom = atom<string>('PC');
const primaryColorAtom = atom<string>('#3b4953');
const secondaryColorAtom = atom<string>('#5a7863');

export const usePlotAtoms = () => {
  const [kpc, setKpc] = useAtom(kpcAtom);
  const [pc, setPc] = useAtom(pcAtom);
  const [primaryColor, setPrimaryColor] = useAtom(primaryColorAtom);
  const [secondaryColor, setSecondaryColor] = useAtom(secondaryColorAtom);

  return {
    kpc,
    setKpc,
    pc,
    setPc,

    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
  };
};
