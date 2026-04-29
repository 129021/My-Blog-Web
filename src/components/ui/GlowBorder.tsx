import { clsx } from "clsx";

interface GlowBorderProps {
  className?: string;
  children: React.ReactNode;
}

export function GlowBorder({ className, children }: GlowBorderProps) {
  return (
    <div
      className={clsx(
        "relative rounded-card p-[1px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_200%] animate-shimmer",
        className,
      )}
    >
      <div className="h-full w-full rounded-card bg-[var(--color-bg)]">
        {children}
      </div>
    </div>
  );
}
