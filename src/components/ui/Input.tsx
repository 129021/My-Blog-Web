"use client";

import { clsx } from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-input border border-[var(--color-border)] bg-[var(--color-card-bg)] px-4 py-2.5 text-[var(--color-fg)] outline-none transition-shadow placeholder:text-[var(--color-muted)] focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
