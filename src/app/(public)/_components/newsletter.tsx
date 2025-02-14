"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function NewsLetter() {
  return (
    <section className={cn("overflow-hidden pt-0 md:pt-0")}>
      <div className="relative mx-auto mt-40 mb-10 flex flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        <Badge
          variant="outline"
          className="animate-fade-in-up opacity-0 delay-100"
        >
          <span className="text-muted-foreground">Newsletter</span>
        </Badge>

        <h2 className="animate-fade-in-up max-w-[60%] text-3xl font-semibold opacity-0 delay-200 sm:text-5xl">
          Join our mailing list for exclusive news and offers!
        </h2>

        <p className="text-muted-foreground animate-fade-in-up opacity-0 delay-300">
          Stay in the loop with everything you need to know.
        </p>

        <div className="z-10 flex gap-4">
          <Input
            placeholder="Enter your email..."
            className="w-[350px] border-white bg-transparent"
          />
          <Button className="animate-fade-in-up font-bold opacity-0 delay-500">
            Subscribe
          </Button>
        </div>

        <div className="fade-top-lg shadow-glow animate-scale-in pointer-events-none absolute inset-0 rounded-2xl opacity-0 delay-700" />
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }

        .shadow-glow {
          box-shadow:
            0 -16px 128px 0 rgba(10, 60, 130, 0.5) inset,
            0 -16px 32px 0 rgba(7, 40, 100, 0.5) inset;
        }

        .fade-top-lg {
          background: linear-gradient(
            to top,
            rgba(10, 60, 130, 0.7),
            rgba(7, 40, 100, 0)
          );
        }
      `}</style>
    </section>
  );
}
