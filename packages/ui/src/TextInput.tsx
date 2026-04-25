"use client";

import { cn } from "@repo/utils";
import React, { InputHTMLAttributes, useId, useState } from "react";
import IconButton from "./IconButton";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "password";
  help?: string;
  label?: string;
  error?: string;
  onClear?: () => void;
  className?: string;
  inputClassName?: string;
  required?: boolean;
}

const TextInput = ({
  type = "text",
  label,
  error,
  help,
  onClear,
  className,
  inputClassName,
  required,
  ...props
}: TextInputProps) => {
  const generatedId = useId();
  const id = props.id || generatedId;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const isPasswordField = type === "password";
  const currentInputType = isPasswordField
    ? isPasswordVisible
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const describedBy = [error ? errorId : null, help ? helpId : null]
    .filter(Boolean)
    .join(" ");

  return (
    // 전체 컨테이너
    <div
      className={cn(
        "ui:flex ui:flex-col ui:gap-1.5 ui:group ui:w-full",
        className,
      )}
    >
      {/* 라벨 영역 */}
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "ui:text-sm ui:ml-1 ui:transition-colors ui:duration-300",
            "ui:group-focus-within:text-primary",
            error && "ui:text-red-600 ui:group-focus-within:text-red-600",
          )}
        >
          {label} {required && <span className="ui:text-red-600">*</span>}
        </label>
      )}

      {/* Input Wrapper (실제 테두리가 그려지는 영역) */}
      <div
        className={cn(
          "focus-ring ui:relative ui:flex ui:items-center ui:h-12 ui:w-full ui:rounded-xl ui:pl-4 ui:pr-2 ui:gap-2",
          "ui:transition-all ui:duration-300 ui:overflow-hidden",
          "ui:border ui:border-foreground/20 ui:bg-background  ui:text-foreground",
          "ui:hover:bg-foreground/10 ui:active:bg-foreground/10 ui:focus-within:border-primary ui:focus-within:bg-primary/10 ui:focus-within:hover:bg-primary/10",
          error &&
            "ui:border-red-200 ui:bg-red-50 ui:focus-within:border-red-600 ui:focus-within:bg-red-50",
        )}
      >
        {/* 실제 Input 요소 */}
        <input
          type={currentInputType}
          id={id}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          placeholder={props.placeholder || label}
          className={cn(
            "ui:flex-1 ui:min-w-0 ui:h-full ui:bg-transparent ui:outline-none ui:text-sm",
            "ui:placeholder:text-slate-400",
            inputClassName,
          )}
          {...props}
        />

        {/* 버튼 그룹 영역 */}
        <div className="ui:flex ui:items-center ui:shrink-0">
          {/* 비밀번호 토글 버튼 */}
          {isPasswordField && (
            <IconButton
              type="button"
              icon={isPasswordVisible ? "password_2_off" : "password_2"}
              aria-label={
                isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"
              }
              onClick={togglePasswordVisibility}
              className="ui:shrink-0"
            />
          )}

          {/* 초기화 버튼 */}
          {onClear && !isPasswordField && (
            <IconButton
              type="button"
              icon="close"
              aria-label={`${label} 초기화`}
              onClick={onClear}
              className="ui:shrink-0"
            />
          )}
        </div>
      </div>

      {/* 안내 및 에러 메시지 영역 */}
      {error ? (
        <span
          id={errorId}
          role="alert"
          className="ui:text-sm ui:text-red-600 ui:font-medium ui:ml-1"
        >
          {error}
        </span>
      ) : help ? (
        <span id={helpId} className="ui:text-sm ui:text-gray-light ui:ml-1">
          {help}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
