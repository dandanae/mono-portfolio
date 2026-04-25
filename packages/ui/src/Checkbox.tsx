import { InputHTMLAttributes, useId } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const checkboxStyles = tv({
  slots: {
    root: "ui:group ui:inline-flex ui:items-center ui:gap-2.5 ui:cursor-pointer ui:select-none ui:transition-opacity ui:duration-200",
    box: "ui:relative ui:flex ui:items-center ui:justify-center ui:w-5 ui:h-5 ui:rounded-md ui:border-2 ui:bg-background ui:transition-all ui:duration-200 ui:group-active:scale-90",
    icon: "material-symbols-rounded ui:text-[16px]! ui:font-bold ui:transition-transform ui:duration-200 ui:leading-none ui:text-white",
    label:
      "ui:text-sm ui:font-medium ui:transition-colors ui:duration-200 ui:select-none",
    errorText: "ui:text-xs ui:text-red-600 ui:mt-1 ui:ml-1 ui:font-medium",
  },
  variants: {
    checked: {
      true: { icon: "ui:scale-100" },
      false: { icon: "ui:scale-0" },
    },
    indeterminate: {
      true: { icon: "ui:scale-100" },
    },
    error: {
      true: { label: "ui:text-red-600" },
    },
    disabled: {
      true: {
        root: "ui:opacity-40 ui:cursor-not-allowed",
        box: "ui:bg-slate-100 ui:border-slate-200",
      },
    },
  },
  compoundVariants: [
    {
      checked: true,
      error: false,
      class: {
        box: "ui:bg-primary ui:border-primary",
        label: "ui:text-foreground",
      },
    },
    {
      checked: true,
      error: true,
      class: {
        box: "ui:bg-red-600 ui:border-red-600",
      },
    },
    {
      indeterminate: true,
      error: false,
      class: {
        box: "ui:bg-primary ui:border-primary",
      },
    },
    {
      indeterminate: true,
      error: true,
      class: {
        box: "ui:bg-red-600 ui:border-red-600",
      },
    },
    {
      checked: false,
      indeterminate: false,
      error: false,
      class: {
        box: "ui:border-foreground/20 ui:group-hover:border-foreground/30",
        label: "ui:text-foreground/40",
      },
    },
    {
      checked: false,
      indeterminate: false,
      error: true,
      class: {
        box: "ui:border-red-300 ui:bg-red-50",
      },
    },
  ],
});

type CheckboxVariantProps = VariantProps<typeof checkboxStyles>;

interface CustomProps {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}

type CheckboxProps = CustomProps &
  CheckboxVariantProps &
  Omit<
    InputHTMLAttributes<HTMLInputElement>,
    keyof CustomProps | keyof CheckboxVariantProps
  >;

const Checkbox = ({
  label,
  error,
  indeterminate,
  disabled,
  checked,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const id = props.id || generatedId;

  const {
    root,
    box,
    icon,
    label: labelStyles,
  } = checkboxStyles({
    checked: !!checked,
    indeterminate: !!indeterminate,
    error: !!error,
    disabled: !!disabled,
  });

  return (
    <div className="ui:flex ui:flex-col">
      <label htmlFor={id} className={root()}>
        <input
          {...props}
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          className="ui:sr-only"
        />

        <div className={box()}>
          <span className={icon()} aria-hidden="true">
            {indeterminate ? "remove" : "check"}
          </span>
        </div>

        {label && <span className={labelStyles()}>{label}</span>}
      </label>

      {/* {error && (
        <span className={errorText()} role="alert">
          {error}
        </span>
      )} */}
    </div>
  );
};

export default Checkbox;
