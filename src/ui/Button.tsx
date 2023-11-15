import type { ComponentPropsWithoutRef, ForwardedRef, ReactNode } from "react";

import { cn, forwardRef } from "~/shared";

export const buttonVariants = [
  "primary",
  "outline",
  "outline-white",
  "secondary",
  "tertiary-link",
] as const;
export type ButtonVariant = (typeof buttonVariants)[number];

export const buttonSizes = ["sm", "md", "lg"] as const;
export type ButtonSize = (typeof buttonSizes)[number];

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  left?: ReactNode;
  right?: ReactNode;
}

export const Button = forwardRef(
  (
    {
      type = "button",
      className,
      variant = "primary",
      size = "md",
      left,
      right,
      disabled = false,
      children,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "flex items-center gap-2 rounded-md border border-transparent font-medium focus:outline-none focus:ring-2 focus:ring-offset-0",

        !disabled && [
          variant === "primary" &&
            "bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-600 focus:ring-indigo-100",
          variant === "outline" &&
            "border-indigo-600 text-indigo-600 hover:border-indigo-700 hover:text-indigo-700 focus:ring-indigo-100",
          variant === "outline-white" &&
            "border-white text-white hover:bg-gray-700 focus:bg-gray-600 focus:ring-0 focus:ring-gray-100",
          variant === "secondary" &&
            "text-indigo bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-600 focus:bg-indigo-50 focus:text-indigo-600 focus:ring-blue-100",
          variant === "tertiary-link" &&
            "text-indigo hover:text-indigo-700 focus:text-indigo-700 focus:ring-1 focus:ring-indigo-700",
        ],

        disabled && [
          variant === "primary" && "bg-gray-300 text-gray-400",
          variant === "outline" && "border-gray-400 text-gray-400",
          variant === "outline-white" && "border-gray-400 text-gray-400",
          variant === "secondary" && "bg-gray-300 text-gray-400",
          variant === "tertiary-link" && "text-gray-400",
        ],

        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-[18px] py-3 text-base leading-5",
        size === "lg" && "px-7 py-4 text-lg leading-[22px]",

        !children && [
          size === "sm" && "p-2",
          size === "md" && "p-3",
          size === "lg" && "p-4",
        ],

        className,
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  ),
);
