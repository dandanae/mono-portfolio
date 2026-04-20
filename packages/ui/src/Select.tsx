import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';

interface SelectProps {
  options: { label: string; value: string }[];
  label?: string;
  placeholder?: string;
}

const Select = ({ options, label, placeholder = '선택' }: SelectProps) => {
  return (
    <SelectPrimitive.Root defaultValue={options[0]?.value ?? ''}>
      <SelectPrimitive.Trigger className="ui:inline-flex ui:min-w-[160px] ui:cursor-pointer ui:items-center ui:justify-between ui:rounded-lg ui:bg-white ui:px-4 ui:py-1.5 ui:text-sm ui:font-medium ui:text-slate-700 ui:shadow-sm ui:ring-1 ui:ring-slate-200 ui:transition-all ui:hover:bg-slate-50 ui:hover:ring-slate-300 ui:focus:ring-2 ui:focus:ring-primary/20 ui:focus:outline-none">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="ui:text-slate-400 ui:flex ui:items-center">
          <span className="material-symbols-rounded">keyboard_arrow_down</span>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="ui:z-50 ui:min-w-[160px] ui:overflow-hidden ui:rounded-xl ui:border ui:border-slate-200 ui:bg-white ui:shadow-xl"
          position="popper"
          sideOffset={5}
        >
          <SelectPrimitive.ScrollUpButton className="ui:flex ui:h-6 ui:cursor-default ui:items-center ui:justify-center ui:bg-white ui:text-slate-700">
            <span className="material-symbols-rounded">arrow_drop_up</span>
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="ui:p-1.5">
            <SelectPrimitive.Group>
              {label && (
                <SelectPrimitive.Label className="ui:px-3 ui:py-2 ui:text-xs ui:font-semibold ui:tracking-wider ui:text-slate-400 ui:uppercase">
                  {label}
                </SelectPrimitive.Label>
              )}
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="ui:flex ui:h-6 ui:cursor-default ui:items-center ui:justify-center ui:bg-white ui:text-slate-700">
            <span className="material-symbols-rounded">arrow_drop_down</span>
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectPrimitive.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className="ui:relative ui:flex ui:w-full ui:cursor-default ui:items-center ui:rounded-md ui:py-2 ui:pr-3 ui:pl-9 ui:text-sm ui:font-medium ui:text-slate-700 ui:transition-colors ui:outline-none ui:select-none ui:focus:bg-primary-50 ui:focus:text-primary ui:data-[disabled]:pointer-events-none ui:data-[disabled]:opacity-40"
        {...props}
        ref={forwardedRef}
      >
        <span className="ui:absolute ui:left-3 ui:flex ui:h-3.5 ui:w-3.5 ui:items-center ui:justify-center">
          <SelectPrimitive.ItemIndicator>
            <span className="material-symbols-rounded">check</span>
          </SelectPrimitive.ItemIndicator>
        </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    );
  },
);
SelectItem.displayName = 'SelectItem';

export default Select;
