"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));
import { Loader } from "lucide-react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Loader className="size-24 animate-spin" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
