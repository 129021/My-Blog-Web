import { MDXRemote } from "next-mdx-remote/rsc";
import { MDX_OPTIONS } from "@/lib/mdx";
import { CodeBlock } from "./CodeBlock";

const components = {
  pre: CodeBlock,
};

interface MDXRendererProps {
  source: string;
}

export function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-cyan-400 prose-pre:border prose-pre:border-[var(--color-border)] prose-img:rounded-lg">
      <MDXRemote source={source} components={components} options={MDX_OPTIONS} />
    </div>
  );
}
