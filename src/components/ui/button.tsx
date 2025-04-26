import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClassname> {}

const buttonClassname = cva(
  "cursor-pointer flex gap-2 items-center justify-center",
  {
    variants: {
      intent: {
        primary: "text-white bg-primary-color-60",
        secondary:
          "bg-white border border-primary-color-60 text-primary-color-60",
      },
      size: {
        default: "px-4 py-4 text-base",
        small: "px-2 py-1",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
  },
);

export default function Button({
  children,
  className,
  intent,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(buttonClassname({ className, intent }))}
    >
      {children}
    </button>
  );
}
