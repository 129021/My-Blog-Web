import type { Post } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface PostMetaProps {
  post: Post;
}

export function PostMeta({ post }: PostMetaProps) {
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
