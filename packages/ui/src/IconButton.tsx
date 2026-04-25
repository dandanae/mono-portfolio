"use client";

import React, { ElementType, ComponentPropsWithoutRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@repo/utils";

const iconButtonStyles = tv({
  base: [
    "ui:inline-flex ui:items-center ui:justify-center ui:rounded-lg ui:transition-all ui:duration-300 ui:shrink-0 ui:active:scale-90 ui:disabled:opacity-50",
    "ui:disabled:pointer-events-none",
  ],
  variants: {
    variant: {
      clear: [
        "ui:text-foreground ui:hover:text-primary ui:hover:bg-primary/10 ui:active:bg-primary/20",
      ],
      fill: [
        // TODO: 다크 모드 처리 방법 변경
        "ui:bg-slate-50 ui:text-slate-600 ui:hover:bg-primary-100 ui:hover:text-primary-600",
        "ui:dark:bg-slate-800 ui:dark:text-slate-400 ui:dark:hover:bg-primary-800 ui:dark:hover:text-primary-400",
      ],
    },
    size: {
      xs: "ui:h-6 ui:w-6 ui:text-[14px]!",
      sm: "ui:h-8 ui:w-8 ui:text-[18px]!",
      md: "ui:h-10 ui:w-10 ui:text-[22px]!",
      lg: "ui:h-12 ui:w-12 ui:text-[26px]!",
    },
  },
  defaultVariants: {
    variant: "clear",
    size: "md",
  },
});

type IconButtonVariantProps = VariantProps<typeof iconButtonStyles>;

interface CustomProps<T extends ElementType> {
  "as"?: T;
  "type"?: "button" | "submit" | "reset";
  "icon": string;
  "loading"?: boolean;
  "aria-label": string;
}

type IconButtonProps<T extends ElementType> = CustomProps<T> &
  IconButtonVariantProps &
  Omit<
    ComponentPropsWithoutRef<T>,
    keyof CustomProps<T> | keyof IconButtonVariantProps
  >;

export const IconButton = <T extends ElementType = "button">({
  as,
  type = "button",
  icon,
  variant,
  size,
  loading = false,
  disabled,
  className,
  ...props
}: IconButtonProps<T>) => {
  const Component = as || "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      className={cn(iconButtonStyles({ variant, size }), className)}
      {...(Component === "button" ? { disabled: isDisabled, type } : {})}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...(props as any)}
    >
      {loading ? (
        <span
          className="material-symbols-rounded ui:animate-spin"
          style={{ fontSize: "inherit" }}
        >
          progress_activity
        </span>
      ) : (
        <span
          className="material-symbols-rounded ui:select-none"
          style={{ fontSize: "inherit" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
    </Component>
  );
};

export default IconButton;
