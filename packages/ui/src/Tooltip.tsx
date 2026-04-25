"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "tailwind-variants";
import { motion, AnimatePresence } from "motion/react";

type Position = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  position?: Position;
  className?: string;
  delayDuration?: number;
}

const Tooltip = ({
  children,
  label,
  position = "top",
  className,
  delayDuration = 300,
}: TooltipProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root open={open} onOpenChange={setOpen}>
        <TooltipPrimitive.Trigger asChild>
          <span className="ui:inline-block ui:cursor-default">{children}</span>
        </TooltipPrimitive.Trigger>

        <AnimatePresence key={open ? "open" : "close"}>
          {open && (
            <TooltipPrimitive.Portal forceMount>
              <TooltipPrimitive.Content side={position} sideOffset={8} asChild>
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    y: position === "top" ? 10 : -10,
                  }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    type: "spring",
                    damping: 12, // 약간 더 탱글하게 조정
                    stiffness: 200,
                    bounce: 0.6,
                  }}
                  className={cn(
                    "ui:relative ui:z-50 ui:rounded-md ui:bg-slate-900 ui:px-3 ui:py-1.5 ui:text-xs ui:font-medium ui:text-white ui:shadow-xl",
                    className
                  )}
                >
                  {/* 글자도 배경이 커짐과 동시에 서서히 나타남 */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    {label}
                  </motion.span>

                  {/* Arrow를 motion.div 내부에 두어 부모와 함께 애니메이션 적용 */}
                  <TooltipPrimitive.Arrow
                    className="ui:fill-slate-900"
                    width={10}
                    height={5}
                  />
                </motion.div>
              </TooltipPrimitive.Content>
            </TooltipPrimitive.Portal>
          )}
        </AnimatePresence>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
