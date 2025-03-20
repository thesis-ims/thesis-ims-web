import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClassname> {}

const buttonClassname = cva();

export default function Button({ children, className }: ButtonProps) {
  return <button className={className}>{children}</button>;
}
