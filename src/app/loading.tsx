export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 animate-bounce rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <p className="text-sm text-[var(--color-muted)]">加载中...</p>
      </div>
    </div>
  );
}
