export function ChatLoadingSkeleton() {
  return (
    <div className="flex h-full w-full animate-pulse flex-col space-y-6 p-4">
      <div className="flex flex-row-reverse items-start gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-800"></div>
        <div className="flex w-full max-w-3xl flex-col items-end gap-2">
          <div className="h-6 w-1/2 rounded-lg bg-neutral-800"></div>
          <div className="h-4 w-3/4 rounded-lg bg-neutral-800"></div>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-800"></div>
        <div className="flex w-full max-w-3xl flex-col gap-2">
          <div className="h-6 w-2/3 rounded-lg bg-neutral-800"></div>
          <div className="h-4 w-full rounded-lg bg-neutral-800"></div>
          <div className="h-4 w-4/5 rounded-lg bg-neutral-800"></div>
        </div>
      </div>

      <div className="flex flex-row-reverse items-start gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full bg-neutral-800"></div>
        <div className="flex w-full max-w-3xl flex-col items-end gap-2">
          <div className="h-6 w-1/3 rounded-lg bg-neutral-800"></div>
          <div className="h-4 w-2/5 rounded-lg bg-neutral-800"></div>
        </div>
      </div>
    </div>
  );
}
