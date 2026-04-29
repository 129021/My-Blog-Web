import { clsx } from "clsx";

interface GradientTextProps {
  as?: "h1" | "h2" | "h3" | "span" | "p";
  variant?: "cyan" | "purple";
  className?: string;
  children: React.ReactNode;
}

const variants = {
  cyan: "gradient-text-cyan",
  purple: "gradient-text-purple",
};

export function GradientText({
  as: Tag = "span",
  variant = "cyan",
  className,
  children,
}: GradientTextProps) {
  return (
    <Tag className={clsx(variants[variant], className)}>{children}</Tag>
  );
}
