import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

export const upContainerVariants = ({ isFirst }: { isFirst: boolean }) => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isFirst ? 1.5 : 0.1,
        staggerChildren: 0.2,
      },
    },
  };
};

export const upItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export const tanglingTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 10,
  mass: 0.8,
};

export const UpContainer = ({ isFirst = false, ...props }: HTMLMotionProps<'div'> & { isFirst?: boolean }) => {
  return (
    <motion.div
      variants={upContainerVariants({ isFirst })}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      {...props}
    />
  );
};
