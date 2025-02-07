"use client";
import { Navigation } from "@/components/layouts/navbars/nav";
import ReactLenis from "lenis/react";
import { Fragment, useEffect } from "react";
import { useAccount } from "wagmi";
import { check } from "../../../actions/users";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { address, isConnected } = useAccount();

  const handleCheck = async () => {
    if (address) {
      await check(address);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      handleCheck();
    }
  }, [address, isConnected]);
  return (
    <Fragment>
      <ReactLenis
        root
        options={{
          lerp: 0.05,
        }}
      >
        <Navigation />
        {children}
      </ReactLenis>
    </Fragment>
  );
}
