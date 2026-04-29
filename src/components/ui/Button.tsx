"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
  ghost:
    "bg-transparent text-[var(--color-fg)] hover:bg-[var(--color-glass-bg)]",
  outline:
    "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-cyan-400 hover:text-cyan-400",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-7 py-3 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "inline-flex items-center justify-center rounded-button font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
