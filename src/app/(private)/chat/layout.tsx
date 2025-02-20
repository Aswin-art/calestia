"use client";
import { SidebarDashboard } from "./_components/sidebar-dashboard";
import ChoiseModel from "./_components/choise-model";
import { useAccount } from "wagmi";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address } = useAccount();

  if (address) {
    return (
      <SidebarDashboard>
        <div className="h-full w-full overflow-x-hidden overflow-y-auto rounded-tl-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
          <div className="sticky top-0 z-50 w-full bg-neutral-900 px-2 py-1.5 md:px-10 md:py-2">
            <ChoiseModel />
          </div>

          <div className="relative mx-auto h-full w-full max-w-(--breakpoint-lg) px-2 pt-2 md:px-10 md:pt-10 md:pb-0">
            {children}
          </div>
        </div>
      </SidebarDashboard>
    );
  } else {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <h3 className="text-4xl font-bold">Please Connect Your Wallet</h3>
        <p className="text-muted-foreground mt-5 max-w-2xl text-center">
          To get started, please connect your cryptocurrency wallet. This will
          allow you to securely manage your digital assets and perform
          transactions seamlessly.
        </p>
        <Link
          href={"/"}
          className={buttonVariants({
            className:
              "animate-shimmer mt-10 inline-flex h-12 cursor-pointer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,oklch(0.623_0.214_259.815),45%,rgba(255,255,255,0.5),55%,oklch(0.623_0.214_259.815))] bg-[length:200%_100%] px-6 font-medium text-zinc-100 transition-colors hover:text-slate-50",
          })}
        >
          Back to home
        </Link>
      </div>
    );
  }
}
