import React, { HtmlHTMLAttributes } from "react";
import { cn } from "@repo/utils";

const Card = ({
  children,
  className,
  ...props
}: HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("ui:bg-white ui:rounded-3xl ui:p-6 ui:shadow", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
