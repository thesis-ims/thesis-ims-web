import { cn } from "@/lib/tw-merge";
import React, { InputHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessages: string[] | null;
  label: string;
  isPassword?: boolean;
  placeholder?: string;
}

export default function InputText({
  placeholder,
  className,
  errorMessages,
  label,
  onChange,
  isPassword = false,
  name,
  ...props
}: InputTextProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-sm text-black">{label}</p>

      <input
        id={label}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={isPassword ? "password" : "text"}
        className={cn(
          "w-fit border-b border-[#C1C7CD] bg-[#F2F4F8] px-4 py-3 placeholder-[#697077] focus:outline-none",
          className,
        )}
        {...props}
      />

      {errorMessages && (
        <div className="flex items-center gap-1 text-red-600">
          {errorMessages?.map((error) => {
            return <p>{error}</p>;
          })}
        </div>
      )}
    </div>
  );
}
