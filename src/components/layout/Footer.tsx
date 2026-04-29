import { SITE, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card-bg)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-[var(--color-muted)]">
          &copy; {SITE.since} - {new Date().getFullYear()} {SITE.author}. All
          rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-cyan-400"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-cyan-400"
          >
            Twitter
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-cyan-400"
          >
            Email
          </a>
          <a
            href={SOCIAL_LINKS.rss}
            className="text-sm text-[var(--color-muted)] transition-colors hover:text-cyan-400"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  );
}
