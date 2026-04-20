'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useId } from 'react';
import { useToggle } from 'react-simplikit';
import { WrapperBase } from '@/components/shared';
import { Switch } from '@repo/ui';
import Dice from './Dice';

interface RollProps {
  label: string;
  success: React.ReactNode;
  failure: React.ReactNode;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0,
  }),
};

const Roll = ({ label, success, failure }: RollProps) => {
  const [isSuccess, toggle] = useToggle(true);
  const descriptionId = useId();

  return (
    <WrapperBase color={isSuccess ? 'lime' : 'red'} className="relative text-center">
      <Dice label={label} />

      <Switch
        checked={isSuccess}
        onCheckedChange={toggle}
        aria-label="결과 상태 전환"
        aria-describedby={descriptionId}
        label={`${isSuccess ? '성공' : '실패'}`}
        className="absolute top-4 right-4"
      />

      <AnimatePresence mode="wait" custom={isSuccess ? 1 : -1}>
        <motion.div
          key={isSuccess ? 'success' : 'failure'}
          custom={isSuccess ? 1 : -1}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 400, damping: 40 },
            opacity: { duration: 0.15 },
          }}
          aria-live="polite"
        >
          {isSuccess ? success : failure}
        </motion.div>
      </AnimatePresence>
    </WrapperBase>
  );
};

export default Roll;
