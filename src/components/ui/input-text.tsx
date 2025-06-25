import { cn } from "@/utils/tw-merge";
import React, { InputHTMLAttributes, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessages?: string;
  label?: string;
  isPassword?: boolean;
  placeholder?: string;
  helperText?: string;
}

export default function InputText({
  placeholder,
  className,
  errorMessages,
  label,
  onChange,
  isPassword = false,
  name,
  helperText,
  ...props
}: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <p className="text-sm text-black">{label}</p>}

      <div className="flex flex-col gap-1">
        <div className="relative">
          <input
            id={label}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            type={isPassword ? (showPassword ? "text" : "password") : "text"}
            className={cn(
              "w-fit bg-[#F2F4F8] px-4 py-3 placeholder-[#697077] focus:outline-hidden",
              isPassword && "pr-12", // Add right padding for the toggle button
              errorMessages
                ? "border-2 border-red-600"
                : "border-b border-[#C1C7CD]",
              className,
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-[#697077] hover:text-gray-700 focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={20} className="" />
              ) : (
                <Eye size={20} />
              )}
            </button>
          )}
        </div>

        {helperText && !errorMessages && (
          <p className="text-gray-60 text-xs">{helperText}</p>
        )}

        {errorMessages && (
          <p className="text-xs font-medium text-red-600">{errorMessages}</p>
        )}
      </div>
    </div>
  );
}
