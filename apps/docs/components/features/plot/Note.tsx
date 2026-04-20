import React from 'react';
import { WrapperBase } from '@/components/shared';

const Note = ({ notes }: { notes: React.ReactNode[] }) => {
  return (
    <WrapperBase color="amber" className="flex w-full flex-row gap-2">
      <span className="material-symbols-rounded mt-0.5 text-[16px]! text-amber-600">info</span>
      <div className="flex w-full flex-col gap-1 font-sans">
        {notes &&
          notes.map((note, index) => {
            return (
              <div key={`${note?.toString().slice(0, 10)}-${index}`} className="text-sm">
                {note}
              </div>
            );
          })}
      </div>
    </WrapperBase>
  );
};

export default Note;
