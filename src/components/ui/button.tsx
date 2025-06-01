import React, { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { cn } from "@/utils/tw-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClassname> {
  asChild?: boolean;
}

const buttonClassname = cva(
  "cursor-pointer flex gap-2 items-center justify-center",
  {
    variants: {
      intent: {
        primary: "text-white bg-primary-color-60",
        secondary:
          "bg-white border-2 border-primary-color-60 text-primary-color-60 font-medium ",
      },
      size: {
        default: "py-3 px-4 text-base min-w-[150px]",
        small: "py-2 px-3 text-sm min-w-[100px]",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonClassname({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonClassname };
