import { cn } from "@repo/utils";
import React, { ComponentPropsWithoutRef, ElementType } from "react";
import { tv, VariantProps } from "tailwind-variants";

const style = tv({
  base: "ui:flex ui:items-center ui:justify-center ui:gap-2 ui:hover:bg-slate-400/10 ui:active:bg-slate-400/20 ui:hover:text-slate-700 ui:transition-all ui:duration-300 ui:rounded-lg ui:font-medium ui:active:scale-95 ui:disabled:opacity-30 ui:disabled:pointer-events-none ui:text-slate-500 ui:active:text-slate-900",
  variants: {
    size: {
      sm: "ui:py-1 ui:px-3 ui:h-8 ui:text-sm",
      md: "ui:py-2 ui:px-4 ui:h-10 ui:text-base",
      lg: "ui:py-3 ui:px-6 ui:h-12 ui:text-lg",
    },
    display: {
      inline: "ui:inline-flex",
      block: "ui:block",
      full: "ui:flex ui:w-full",
    },
  },
  defaultVariants: {
    size: "md",
    display: "inline",
  },
});

type StyleVariants = Omit<VariantProps<typeof style>, "size"> & {
  type?: "button" | "submit" | "reset";
  icon?: string;
  size?: VariantProps<typeof style>["size"];
};

type TextButtonProps<T extends ElementType = "button"> = {
  as?: T;
  loading?: boolean;
} & StyleVariants &
  Omit<ComponentPropsWithoutRef<T>, keyof StyleVariants | "as" | "loading">;

const TextButton = <T extends ElementType = "button">({
  as,
  type = "button",
  icon,
  size,
  display,
  children,
  className,
  ...props
}: TextButtonProps<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={cn(style({ size, display }), className)}
      type={type}
      {...props}
    >
      {icon && (
        <span
          className="material-symbols-rounded ui:text-[16px]!"
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      {children}
    </Component>
  );
};

export default TextButton;
