"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";

interface CardProps extends HTMLMotionProps<"div"> {
  glass?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export function Card({
  glass = false,
  glow = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        "rounded-card border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-lg transition-shadow hover:shadow-xl",
        glass && "glass",
        glow && "glow-border",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
