"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import type { TOCItem } from "@/types";

interface TOCProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TOCProps) {
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px" },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop TOC */}
      <aside className="hidden lg:block">
        <nav className="sticky top-24 w-56 space-y-1">
          <p className="mb-3 text-sm font-semibold text-[var(--color-fg)]">
            目录
          </p>
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={clsx(
                "block truncate rounded-md py-1 text-sm transition-all",
                item.level === 2 ? "pl-0" : "pl-4",
                activeId === item.id
                  ? "text-cyan-400 font-medium"
                  : "text-[var(--color-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile TOC toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-20 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
          aria-label="Toggle table of contents"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed inset-x-4 bottom-32 z-40 rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-xl"
            >
              <nav className="space-y-1">
                {items.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({
                        behavior: "smooth",
                      });
                      setIsOpen(false);
                    }}
                    className={clsx(
                      "block rounded-md py-1.5 text-sm",
                      item.level === 2 ? "pl-0" : "pl-4",
                      activeId === item.id
                        ? "text-cyan-400 font-medium"
                        : "text-[var(--color-muted)]",
                    )}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
