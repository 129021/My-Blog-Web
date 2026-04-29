"use client";

import { useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

function extractLanguage(children: ReactNode): string {
  if (!children || typeof children !== "object") return "text";
  const child = (children as { props?: { className?: string } }).props;
  if (child?.className) {
    const match = child.className.match(/language-(\w+)/);
    if (match?.[1]) return match[1];
  }
  return "text";
}

export function CodeBlock({
  children,
}: {
  children: ReactNode;
  [key: string]: unknown;
}) {
  const [copied, setCopied] = useState(false);
  const language = extractLanguage(children);

  const handleCopy = useCallback(async () => {
    const code = extractCode(children);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }, [children]);

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-[var(--color-border)]">
      {/* Header */}
      <div className="flex items-center justify-between bg-[var(--color-code-bg)] px-4 py-2 text-xs border-b border-[var(--color-border)]">
        <span className="font-mono text-[var(--color-muted)] uppercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[var(--color-muted)] transition-colors hover:text-cyan-400"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-green-400"
              >
                ✓ 已复制
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                复制
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      {/* Code content */}
      <pre className="overflow-x-auto bg-[var(--color-code-bg)] p-4 text-sm leading-relaxed">
        {children}
      </pre>
    </div>
  );
}

function extractCode(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (typeof children === "boolean" || children === null || children === undefined) return "";
  if (Array.isArray(children)) {
    return children.map((c) => extractCode(c)).join("\n");
  }
  if (typeof children === "object" && "props" in children) {
    const props = (children as { props: unknown }).props;
    if (props && typeof props === "object" && "children" in props) {
      return extractCode((props as { children: ReactNode }).children);
    }
  }
  return "";
}
