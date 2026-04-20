"use client";

import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "tailwind-variants";

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
  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild className="ui:z-99">
          <span className="ui:inline-block">{children}</span>
        </TooltipPrimitive.Trigger>

        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={position}
            sideOffset={8}
            className={cn(
              "ui:z-50 ui:overflow-hidden ui:rounded-md ui:bg-slate-900 ui:px-3 ui:py-1.5 ui:text-xs ui:font-medium ui:text-white ui:animate-in ui:fade-in ui:zoom-in-95",
              className
            )}
          >
            {label}
            <TooltipPrimitive.Arrow
              className="ui:fill-slate-900"
              width={10}
              height={5}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
