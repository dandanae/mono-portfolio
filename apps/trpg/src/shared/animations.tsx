import { HTMLMotionProps, motion } from 'motion/react';
import React from 'react';

export const upContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const upItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export const UpContainer = ({ ...props }: HTMLMotionProps<'div'>) => {
  return (
    <motion.div
      variants={upContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      {...props}
    />
  );
};
