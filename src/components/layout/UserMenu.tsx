"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export function UserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!session) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn()}
      >
        登录
      </Button>
    );
  }

  return (
    <div ref={ref} className="relative">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border)]"
      >
        {session.user?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={session.user.image}
            alt={session.user.name || ""}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-sm">
            {(session.user?.name || "U")[0]}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-44 rounded-card border border-[var(--color-border)] bg-[var(--color-card-bg)] p-2 shadow-xl"
          >
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm hover:bg-[var(--color-glass-bg)]"
            >
              个人中心
            </Link>
            {(session.user?.email && SITE.ownerEmails.includes(session.user.email)) && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-cyan-400 hover:bg-[var(--color-glass-bg)]"
              >
                管理后台
              </Link>
            )}
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-[var(--color-glass-bg)]"
            >
              退出登录
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
