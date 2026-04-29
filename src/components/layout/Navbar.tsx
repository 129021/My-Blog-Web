"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Navbar() {
  const scrolled = useScrollPosition();
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-black/5"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="gradient-text-cyan text-xl font-bold tracking-tight"
        >
          {SITE.title}
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-cyan-400"
                  : "text-[var(--color-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserMenu />

          {/* Mobile nav toggle */}
          <div className="flex md:hidden">
            <MobileNav pathname={pathname} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <div className="relative group">
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)]">
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div className="invisible absolute right-0 top-10 w-36 rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "block rounded-lg px-3 py-2 text-sm",
              pathname === link.href
                ? "text-cyan-400"
                : "text-[var(--color-muted)] hover:text-[var(--color-fg)]",
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
