"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorFallbackProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  const router = useRouter();

  const handleReset = () => {
    reset();
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="space-y-3">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500/80" />
        <h2 className="text-2xl font-semibold tracking-tight">
          Oops! Something went wrong
        </h2>
        <p className="text-muted-foreground max-w-prose text-sm">
          {error.message ||
            "Please try again or contact support if the problem persists."}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="default"
          size="sm"
          onClick={handleReset}
          className="gap-2"
        >
          Retry
        </Button>
        <Button variant="outline" size="sm" onClick={() => router.push("/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
