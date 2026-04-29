"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import type { Theme } from "@/types";

const ICONS: Record<Theme, string> = {
  system: "\u{1F4BB}",
  light: "\u{2600}\u{FE0F}",
  dark: "\u{1F319}",
};

const NEXT: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setTheme(NEXT[theme])}
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] text-sm"
      aria-label="Toggle theme"
    >
      {mounted ? (
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {ICONS[theme]}
          </motion.span>
        </AnimatePresence>
      ) : (
        <span>{ICONS.system}</span>
      )}
    </motion.button>
  );
}
