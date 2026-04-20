import { atom, useAtom } from "jotai";

const titleAtom = atom<string>("");
const kpcAtom = atom<string>("KPC");
const pcAtom = atom<string>("PC");
const primaryColorAtom = atom<string>("#3b4953");
const secondaryColorAtom = atom<string>("#5a7863");
const tertiaryColorAtom = atom<string>("#000000");

const scrollPercentAtom = atom<number>(0);

export const useScenarioAtoms = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [kpc, setKpc] = useAtom(kpcAtom);
  const [pc, setPc] = useAtom(pcAtom);
  const [primaryColor, setPrimaryColor] = useAtom(primaryColorAtom);
  const [secondaryColor, setSecondaryColor] = useAtom(secondaryColorAtom);
  const [tertiaryColor, setTertiaryColor] = useAtom(tertiaryColorAtom);

  const [scrollPercent, setScrollPercent] = useAtom(scrollPercentAtom);

  return {
    title,
    setTitle,
    kpc,
    setKpc,
    pc,
    setPc,

    primaryColor,
    setPrimaryColor,
    secondaryColor,
    setSecondaryColor,
    tertiaryColor,
    setTertiaryColor,

    scrollPercent,
    setScrollPercent,
  };
};
