"use client";
import React, { useId } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@repo/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  required?: boolean;
}

const Switch = ({
  checked,
  onCheckedChange,
  label,
  disabled,
  className,
  name,
  required,
}: SwitchProps) => {
  const id = useId();

  return (
    <div className={cn("ui:flex ui:items-center ui:gap-3", className)}>
      <label
        htmlFor={id}
        className="ui:cursor-pointer ui:select-none ui:text-sm ui:font-medium ui:leading-none ui:peer-disabled:cursor-not-allowed ui:peer-disabled:opacity-70"
      >
        {label}
      </label>

      <SwitchPrimitive.Root
        id={id}
        name={name}
        required={required}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(
          "ui:peer ui:relative ui:inline-flex ui:h-6 ui:w-11 ui:shrink-0 ui:cursor-pointer ui:items-center ui:rounded-full ui:border-2 ui:border-transparent ui:transition-colors",
          "ui:focus-visible:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-slate-400 ui:focus-visible:ring-offset-2",
          "ui:disabled:cursor-not-allowed ui:disabled:opacity-50",
          checked ? "ui:bg-blue-600" : "ui:bg-slate-200",
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "ui:pointer-events-none ui:block ui:rounded-full ui:bg-white ui:shadow-lg ui:ring-0 ui:transition-transform",
            "ui:h-5 ui:w-5",
            checked ? "ui:translate-x-5" : "ui:translate-x-0",
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
};

export default Switch;
