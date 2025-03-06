"use client";
import { SidebarDashboard } from "./_components/sidebar-dashboard";
import ChoiseModel from "./_components/choise-model";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { cookiesManagement } from "../../../../actions/cookie-store";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      console.log("Wallet connected:", address);
      cookiesManagement(true, address);
    } else {
      console.log("Wallet not connected or logged out");
      cookiesManagement(false);
    }
  }, [isConnected, address]);

  if (address) {
    return (
      <SidebarDashboard>
        <div className="h-full w-full overflow-x-hidden overflow-y-auto bg-white dark:bg-neutral-900 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
          <div className="sticky top-5 z-50 hidden w-full px-2 py-1.5 md:px-10 md:py-2 lg:block">
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
        <div className="mt-8 text-center">
          <ConnectButton />
        </div>
      </div>
    );
  }
}
