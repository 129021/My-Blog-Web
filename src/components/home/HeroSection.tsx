"use client";

import { ParticleBackground } from "@/components/effects/ParticleBackground";
import { GradientText } from "@/components/ui/GradientText";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {mounted && <ParticleBackground />}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400"
        >
          Welcome to my digital garden
        </motion.p>

        <h1 className="text-hero font-extrabold leading-none tracking-tight">
          <span className="block text-[var(--color-fg)]">
            {SITE.author}
          </span>
          <GradientText variant="cyan" className="mt-2 block">
            {SITE.role}
          </GradientText>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto mt-6 max-w-lg text-lg text-[var(--color-muted)]"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/categories">
            <Button variant="primary" size="lg">
              探索文章
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" size="lg">
              关于我
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
