"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block">
      <span className="relative z-10 gradient-text-cyan">{text}</span>
      <span
        className="absolute left-0 top-0 z-0 text-red-500 opacity-70"
        style={{
          clipPath: "inset(40% 0 30% 0)",
          animation: "glitch-skew 0.5s infinite linear alternate-reverse",
        }}
        aria-hidden
      >
        {text}
      </span>
      <span
        className="absolute -left-1 top-0 z-0 text-blue-500 opacity-70"
        style={{
          clipPath: "inset(80% 0 0 0)",
          animation: "glitch-skew 0.4s infinite linear alternate-reverse",
        }}
        aria-hidden
      >
        {text}
      </span>
    </div>
  );
}

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: `${mousePos.x * 0.02}px ${mousePos.y * 0.02}px`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-[clamp(6rem,15vw,12rem)] font-extrabold leading-none tracking-tighter">
          <GlitchText text="404" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-4 text-lg text-[var(--color-muted)]"
        >
          信号丢失 · 页面未找到
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-button bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/25 transition-shadow hover:shadow-cyan-500/40"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
              />
            </svg>
            返回首页
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
