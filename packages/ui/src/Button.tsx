"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn, tv, type VariantProps } from "tailwind-variants";

const buttonStyles = tv({
  base: "ui:relative ui:inline-flex ui:items-center ui:justify-center ui:gap-2 ui:rounded-lg ui:font-medium ui:transition-all ui:duration-300 ui:active:scale-95 ui:disabled:opacity-30 ui:disabled:pointer-events-none",
  variants: {
    color: {
      primary: "",
      danger: "",
    },
    fill: {
      fill: "",
      weak: "",
      clear: "",
    },
    size: {
      sm: "ui:h-8 ui:px-3 ui:py-1 ui:text-sm",
      md: "ui:h-10 ui:px-4 ui:py-2 ui:text-base",
      lg: "ui:h-12 ui:px-6 ui:py-3 ui:text-lg",
    },
    display: {
      inline: "ui:inline-flex",
      block: "ui:block",
      full: "ui:flex ui:w-full",
    },
  },
  compoundVariants: [
    // Fill
    {
      color: "primary",
      fill: "fill",
      class: [
        "ui:bg-primary ui:text-white ui:hover:bg-primary-600 ui:active:bg-primary-700",
      ],
    },
    {
      color: "danger",
      fill: "fill",
      class:
        "ui:bg-red-600 ui:text-white ui:hover:bg-red-700 ui:active:bg-red-800",
    },

    // Weak
    {
      color: "primary",
      fill: "weak",
      class: [
        "ui:bg-primary/20  ui:text-primary ui:hover:bg-primary/30 ui:active:bg-primary/40",
      ],
    },
    {
      color: "danger",
      fill: "weak",
      class:
        "ui:bg-red-600/20 ui:text-red-600 ui:hover:bg-red-600/30 ui:active:bg-red-600/40",
    },

    // Clear
    {
      color: "primary",
      fill: "clear",
      class: [
        "  ui:text-primary ui:hover:bg-primary/20 ui:active:bg-primary/40",
      ],
    },
    {
      color: "danger",
      fill: "clear",
      class: "ui:text-red-600 ui:hover:bg-red-600/20 ui:active:bg-red-600/40",
    },
  ],
  defaultVariants: {
    color: "primary",
    fill: "fill",
    size: "md",
    display: "inline",
  },
});

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

interface CustomProps<T extends ElementType> {
  type?: "button" | "submit" | "reset";
  as?: T;
  icon?: string;
  loading?: boolean;
  children?: ReactNode;
}

type ButtonProps<T extends ElementType> = CustomProps<T> &
  ButtonVariantProps &
  Omit<
    ComponentPropsWithoutRef<T>,
    keyof CustomProps<T> | keyof ButtonVariantProps
  >;

export const Button = <T extends ElementType = "button">({
  type = "button",
  as,
  icon,
  color,
  fill,
  size,
  display,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps<T>) => {
  const Component = as || "button";
  const isDisabled = disabled || loading;

  return (
    <Component
      className={cn(buttonStyles({ color, fill, size, display }), className)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      type={type}
      {...props}
    >
      {icon && (
        <span
          className="material-symbols-rounded ui:text-[18px]!"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span className={cn(loading && "ui:opacity-0")}>{children}</span>
      <span
        className={cn(
          "ui:absolute material-symbols-rounded ui:animate-spin ui:text-[16px]! ui:opacity-0",
          loading && "ui:opacity-100",
        )}
        aria-hidden="true"
      >
        progress_activity
      </span>
    </Component>
  );
};

export default Button;
