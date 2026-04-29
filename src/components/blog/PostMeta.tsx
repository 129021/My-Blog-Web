import type { Post } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface PostMetaProps {
  post: Post;
  views: number;
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export function PostMeta({ post, views }: PostMetaProps) {
  const { frontmatter, readingTime } = post;

  return (
    <div className="space-y-4">
      <Badge variant="cyan" href={`/categories/${frontmatter.category}`}>
        {frontmatter.category}
      </Badge>

      <h1 className="text-h1 font-extrabold leading-tight text-[var(--color-fg)]">
        {frontmatter.title}
      </h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
        <span>{frontmatter.date}</span>
        <span>·</span>
        <span>{readingTime} 分钟阅读</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <EyeIcon />
          {views} 次阅读
        </span>
        {frontmatter.author && (
          <>
            <span>·</span>
            <span>{frontmatter.author}</span>
          </>
        )}
      </div>

      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Badge key={tag} href={`/tags/${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
