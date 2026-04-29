import { clsx } from "clsx";
import Link from "next/link";

interface BadgeProps {
  children: React.ReactNode;
  href?: string;
  variant?: "default" | "cyan" | "purple";
}

const variants = {
  default:
    "bg-[var(--color-glass-bg)] text-[var(--color-fg)] border-[var(--color-border)]",
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function Badge({
  children,
  href,
  variant = "default",
}: BadgeProps) {
  const classes = clsx(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:brightness-110",
    variants[variant],
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
